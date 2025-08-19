// src/jobs/notificationJob.ts
import amqp from "amqplib";

export const sendNotification = async (message: string) => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL!);
  const channel = await conn.createChannel();
  const queue = "notifications";

  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

  console.log("Notification sent:", message);
  setTimeout(() => {
    channel.close();
    conn.close();
  }, 500);
};
