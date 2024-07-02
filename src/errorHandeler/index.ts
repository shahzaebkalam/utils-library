import { v4 as uuidv4 } from "uuid";
import { dataLogger } from "../logger/datalogger";

const logger = dataLogger({
  serviceName: process.env.SERVICE_NAME!,
  type: "INTERNAL_SERVER_ERROR",
});
export const formatGraphQLError = (error: any) => {
  const id = uuidv4();
  logger.error({ message: error.message, payload: error, id });
  const errorResponse = {
    id,
    message: error.message,
    code: error.extensions.code,
  };
  return errorResponse;
};
