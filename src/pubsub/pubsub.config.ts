import { PubSub } from "@google-cloud/pubsub";
import { MessageOptions } from "@google-cloud/pubsub/build/src/topic";
import { dataLogger, DataLoggerInterface } from "../logger/datalogger";

type Subscriber = {
  topic: string;
  cb: CallableFunction;
  onErrorCallback: CallableFunction;
};

type PubSubConfig = {
  subs: Subscriber[];
  privateKey: string;
  serviceAccount: string;
  projectId: string;
};

let subscribers: Subscriber[] = [];
let privateKey = "";
let serviceAccount = "";
let projectId = "";

export const setupPubSub = (config: PubSubConfig) => {
  subscribers = config.subs;
  privateKey = config.privateKey;
  serviceAccount = config.serviceAccount;
  projectId = config.projectId;
};

export class PubSubSingleton {
  private static instance: PubSubSingleton;
  private client;
  private dataLogger: DataLoggerInterface;
  private privateKey = privateKey;
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.dataLogger = dataLogger({
      serviceName: process.env.SERVICE_NAME!,
      type: "PUB/SUB CLIENT",
    });
    this.client = new PubSub({
      projectId,
      credentials: this.getCredentials(),
    });

    subscribers.forEach((sub) => {
      this.subscribeMessage(sub.topic, sub.cb, sub.onErrorCallback);
    });
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): PubSubSingleton {
    if (!PubSubSingleton.instance) {
      PubSubSingleton.instance = new PubSubSingleton();
    }
    return PubSubSingleton.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public async publishMessage(data: object, topic: string) {
    let messageId = "";
    try {
      messageId = await this.client
        .topic(topic)
        .publishMessage(this.message(data));
      this.dataLogger.info({
        message: "",
        payload: data,
        pubSubName: topic,
        id: messageId,
      });
      return messageId;
    } catch (error: any) {
      this.dataLogger.error({
        message: "Received error while publishing",
        payload: error,
        pubSubName: topic,
        id: messageId,
      });
    }
  }

  private async subscribeMessage(
    topic: string,
    cb: CallableFunction,
    onErrorCallback: CallableFunction
  ) {
    try {
      // References an existing subscription
      const subscription = this.client.subscription(topic, {
        flowControl: { maxExtensionMinutes: 0 },
      });
      // Create an event handler to handle messages
      const messageHandler = (message: any) => {
        const logId = this.dataLogger.info({
          message: "subscription",
          payload: message,
          pubSubName: topic,
          id: message.id,
        });
        // console.log(`\tAttributes: ${JSON.stringify(message.attributes)}`);
        cb(JSON.parse(message.data))
          .then(() => {
            // "Ack" (acknowledge receipt of) the message
            message.ack();
          })
          .catch((error: any) => {
            this.dataLogger.error({
              message: "subscritpion callback error",
              payload: error,
              id: logId,
              pubSubName: topic,
            });
            onErrorCallback(message);
          });
      };

      subscription.on("message", messageHandler);
      console.info("Subscriberd to:", topic);
    } catch (error: any) {
      this.dataLogger.error({
        pubSubName: topic,
        message: "Received error while subscribing",
        payload: error,
      });
    }
  }

  private getCredentials() {
    return {
      client_email: serviceAccount,
      private_key: this.privateKey.replace(/\\n/g, "\n"),
    };
  }

  private message = (data: object): MessageOptions => ({ json: data });
}
