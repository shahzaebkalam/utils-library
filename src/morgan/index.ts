import morgan from "morgan";

export const initLogging = (app: any) => {
  app.use(morgan("combined"));
};
