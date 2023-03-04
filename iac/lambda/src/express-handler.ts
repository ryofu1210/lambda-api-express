import "lodash";
import serverlessExpress from "@vendia/serverless-express";
import express from "express";
import { Handler } from "aws-lambda";

const app = express();
app.use(express.json());

app.get("/kyo-no-gohan/1", (_, res) => {
  res.status(200).send({
    message: "カレー",
  });
});

app.get("/kyo-no-gohan/2", (_, res) => {
  res.status(200).send({
    message: "天丼",
  });
});

export const handler: Handler = serverlessExpress({ app });
