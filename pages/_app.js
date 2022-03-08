import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/layout/layout";
import Notification from "../components/ui/notification";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='NextJS Events' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Component {...pageProps} />
      <Notification
        title='Test'
        message='this is a test message'
        status='pending'
      />
    </Layout>
  );
}

export default MyApp;
