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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="card w-full rounded-lg shadow-lg dark:bg-gray-700"
              >
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                  <div className="text-lg font-bold">{item.sport_title}</div>
                  <div className="bg-emerald-100 text-emerald-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-emerald-400 border border-emerald-400">
                    {new Date(item.commence_time).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex p-4 border-b border-gray-200">
                  <div className="text-gray-600 ml-2">{item.away_team} @</div>
                  <div className="font-semibold">⚡{item.home_team}</div>
                </div>
                <ul className="list-none p-4">
                  {item.bookmakers.map((bookmaker: any) => (
                    <React.Fragment key={bookmaker.key}>
                      {bookmaker.markets.map((market: any) => (
                        <React.Fragment key={market.key}>
                          <li className="text-gray-600 font-bold">
                            {market.key}
                          </li>
                          {market.outcomes.map((outcome: any) => (
                            <div
                              className="flex justify-between items-center mx-auto"
                              key={outcome.name}
                            >
                              <div className="text-sm text-gray-800">
                                {outcome.name}
                              </div>
                              <div className="ml-3 flex-1 text-sm text-gray-600">
                                {outcome.price}
                              </div>
                              <div className="text-sm text-gray-600">
                                {outcome.point}
                              </div>
                            </div>
                          ))}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
