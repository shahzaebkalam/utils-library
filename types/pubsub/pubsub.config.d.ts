declare type Subscriber = {
    topic: string;
    cb: CallableFunction;
    onErrorCallback: CallableFunction;
};
declare type PubSubConfig = {
    subs: Subscriber[];
    privateKey: string;
    serviceAccount: string;
    projectId: string;
};
export declare const setupPubSub: (config: PubSubConfig) => void;
export declare class PubSubSingleton {
    private static instance;
    private client;
    private dataLogger;
    private privateKey;
    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor();
    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    static getInstance(): PubSubSingleton;
    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    publishMessage(data: object, topic: string): Promise<string | undefined>;
    private subscribeMessage;
    private getCredentials;
    private message;
}
export {};
