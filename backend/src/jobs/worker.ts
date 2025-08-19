// src/jobs/worker.ts
import amqp from 'amqplib';

async function startWorker() {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  const queue = 'notifications';
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, (msg) => {
    if (msg) {
      const data = JSON.parse(msg.content.toString());
      console.log('Processing job:', data);
      // Retry mechanism: wrap in try/catch
      try {
        // sendEmail(data) or any async operation
        channel.ack(msg);
      } catch (err) {
        console.error('Job failed, will retry', err);
        channel.nack(msg, false, true); // retry
      }
    }
  });
}

startWorker();
