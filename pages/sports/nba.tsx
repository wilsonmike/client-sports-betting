import { useState, useEffect } from "react";

export default function NBA({ data }: { data: any }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data) {
      setItems(data.items);
    }
  }, [data]);

  return (
    <div className="max-w-7xl justify-center mx-auto">
      <div className="px-6 pt-20">
        <div className="p-4">
          {items.map((item: any) => (
            <div className="ring-1 ring-gray-100 m-10 p-10" key={item.id}>
              <h3>{item.sport_title}</h3>
              <p>{item.home_team}</p>
              <p>{item.away_team}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const url = process.env.ODD_SERVER_NBA_URL;
//   const kit = process.env.ODD_SERVER_LOCK;
//   const data = await fetch(
//     `${url}?apiKey=${kit}&bookmakers=pinnacle&markets=h2h,spreads,totals&oddsFormat=american`
//   );
//   const items = await data.json();
//   console.log(items);

//   // pass data to the page via props
//   return {
//     props: {
//       data: {
//         items,
//       },
//     },
//   };
// }
