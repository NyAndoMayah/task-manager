import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (server: Date, client: Date) => {
  console.log(server, client);
  console.log(server.getHours(), client.getHours());
  return Math.abs(server?.getHours() - client.getHours());
};

export default function Home() {
  const router = useRouter();
  const moveToTaskManager = () => {
    router.push('/tasks');
  };
  const [clientTime, setClientTime] = useState<Date>(new Date());
  const [serverTime, setServerTime] = useState<Date>(
    new Date(clientTime.getTime() + clientTime.getTimezoneOffset() * 60 * 1000)
  );
  const [diffTime, setDiffTime] = useState<number | null>(null);
  useEffect(() => {
    setDiffTime(calculateTimeDifference(serverTime, clientTime));
  }, [clientTime, serverTime]);
  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{' '}
            <span className="serverTime">
              {serverTime?.toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{' '}
            <span className="serverTime">{`${diffTime?.toString()} Hours`}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
