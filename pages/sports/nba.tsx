import React from "react";

export default function NBA({ data }: { data: any }) {
  return <div>nba</div>;
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
