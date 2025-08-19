import amqplib from "amqplib";

const QUEUE = "reportQueue";

export async function enqueueReport(data: any) {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE, { durable: true });
  channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(data)), { persistent: true });
  console.log("Report queued:", data);
  await channel.close();
  await connection.close();
}

export async function startWorker() {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE, { durable: true });
  channel.prefetch(1); // process 1 job at a time
  channel.consume(
    QUEUE,
    async (msg) => {
      if (msg) {
        const data = JSON.parse(msg.content.toString());
        console.log("Processing report:", data);
        // process report here
        channel.ack(msg);
      }
    },
    { noAck: false }
  );
}
