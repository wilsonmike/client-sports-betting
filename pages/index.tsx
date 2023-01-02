import Head from "next/head";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }: { data: any }) {
  return (
    <>
      <Head>
        <title>Underdog Data</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto bg-slate-600 px-4">hello</div>
    </>
  );
}

// export async function getServerSideProps() {
//   const url = process.env.ODD_SERVER_NFL_URL;
//   const kit = process.env.ODD_SERVER_LOCK;
//   const res = await fetch(
//     `${url}?apiKey=${kit}&bookmakers=pinnacle&markets=h2h,spreads,totals&oddsFormat=american`
//   );
//   const data = await res.json();
//   console.log(data);

//   // pass data to the page via props
//   return { props: { data } };
// }
