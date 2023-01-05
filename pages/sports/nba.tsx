import React, { useState, useEffect } from "react";

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
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Sport</th>
                <th className="px-4 py-2">Commence Time</th>
                <th className="px-4 py-2">Home Team</th>
                <th className="px-4 py-2">Away Team</th>
                <th className="px-4 py-2">Bookmaker</th>
                <th className="px-4 py-2">Market</th>
                <th className="px-4 py-2">Outcome</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Point</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">{item.sport_title}</td>
                  <td className="px-4 py-2">{item.commence_time}</td>
                  <td className="px-4 py-2">{item.home_team}</td>
                  <td className="px-4 py-2">{item.away_team}</td>
                  {item.bookmakers.map((bookmaker: any) => (
                    <React.Fragment key={bookmaker.key}>
                      <td>{bookmaker.title}</td>
                      {bookmaker.markets.map((market: any) => (
                        <React.Fragment key={market.key}>
                          <td className="px-4 py-2">{market.key}</td>
                          {market.outcomes.map((outcome: any) => (
                            <React.Fragment key={outcome.name}>
                              <td className="px-4 py-2">{outcome.name}</td>
                              <td className="px-4 py-2">{outcome.price}</td>
                              <td className="px-4 py-2">{outcome.point}</td>
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const url = process.env.ODD_SERVER_NBA_URL;
  const kit = process.env.ODD_SERVER_LOCK;
  const data = await fetch(
    `${url}?apiKey=${kit}&bookmakers=pinnacle&markets=h2h,spreads,totals&oddsFormat=american`
  );
  const items = await data.json();
  console.log(items);

  // pass data to the page via props
  return {
    props: {
      data: {
        items,
      },
    },
  };
}
