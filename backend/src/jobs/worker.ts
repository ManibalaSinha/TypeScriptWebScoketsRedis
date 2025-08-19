import amqp from "amqplib";

const queue = "notifications";

export const startWorker = async () => {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log("Processing job:", data);
      // simulate job
      channel.ack(msg);
    }
  });
};
