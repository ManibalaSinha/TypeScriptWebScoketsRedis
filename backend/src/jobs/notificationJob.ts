// src/jobs/notificationJob.ts
import amqp from 'amqplib';

const QUEUE_NAME = 'notifications';

export const sendNotification = async (message: any) => {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), { persistent: true });
  console.log('Job sent:', message);
  await channel.close();
  await conn.close();
};

// Worker (worker.ts)
import amqp from 'amqplib';

const QUEUE_NAME = 'notifications';

const startWorker = async () => {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  channel.consume(QUEUE_NAME, (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log('Processing job:', data);
      // retry mechanism
      channel.ack(msg);
    }
  });
};
startWorker();
