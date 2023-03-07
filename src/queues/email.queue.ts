import Bull from "bull";
import emailProcess from "../processes/email.process";

const emailQueue = new Bull("email", {
  redis: "redis:6379",
});

const sendNewEmail = (data: any) => {
  emailQueue.add(data, {
    attempts: 5,
  });
};

emailQueue.process(emailProcess);
emailQueue.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed with result ${result}`);
});

export { sendNewEmail, emailQueue };
