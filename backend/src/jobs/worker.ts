import amqp from "amqplib";

const runWorker = async () => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL!);
  const channel = await conn.createChannel();
  await channel.assertQueue("notifications", { durable: true });

  channel.consume("notifications", (msg) => {
    if (msg) {
      console.log("Processing:", msg.content.toString());
      channel.ack(msg);
    }
  });
};

runWorker();
