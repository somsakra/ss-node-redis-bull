import bodyParser from "body-parser";
import express from "express";
import { sendNewEmail, emailQueue } from "./queues/email.queue";
import { createBullBoard } from "bull-board";
import { BullAdapter } from "bull-board/bullAdapter";

const app = express();

const { router } = createBullBoard([new BullAdapter(emailQueue)]);

app.use(bodyParser.json());

app.use("/admin/queues", router);

app.post("/send-email", function (req, res) {
  const { message } = req.body;
  sendNewEmail({ ...req.body, html: `<H1>${message}</H1>` });
  res.send({ status: "ok" });
});

app.listen(3000, () => console.log("App is running on port 3000"));
