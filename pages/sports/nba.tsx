import React, { useState, useEffect } from "react";

export default function NBA({ data }: { data: any }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data) {
      setItems(data.items);
    }
  }, [data]);

  return (
    <div className="max-w-7xl justify-center mx-auto px-6">
      <div className="pt-20">
        <div className="">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="card w-full rounded-lg shadow-lg dark:bg-gray-800 ring-1 ring-gray-700"
              >
                <div className="flex justify-between items-center px-4 py-1">
                  <div className="text-sm font-bold dark:text-gray-600">
                    {item.sport_title}
                  </div>
                  <div className="text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-800 border border-gray-800">
                    {new Date(item.commence_time).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex p-4 dark:bg-gray-800">
                  <div className="text-sm text-gray-300 font-semibold">
                    {item.away_team} @
                  </div>
                  <div className="text-sm text-gray-300 font-semibold">
                    ⚡{item.home_team}
                  </div>
                </div>
                <ul className="list-none p-4 dark:bg-gray-800 rounded-b-lg">
                  {item.bookmakers.map((bookmaker: any) => (
                    <React.Fragment key={bookmaker.key}>
                      {bookmaker.markets.map((market: any) => (
                        <React.Fragment key={market.key}>
                          <li className="text-gray-300 font-bold text-lg border-b border-gray-600 py-1">
                            {market.key}
                          </li>
                          {market.outcomes.map((outcome: any) => (
                            <div
                              className="flex items-center py-1"
                              key={outcome.name}
                            >
                              <div className="flex-1 text-sm font-bold text-gray-500">
                                {outcome.name}
                              </div>
                              <div
                                className={`flex ml-3 text-md text-gray-800 ${
                                  outcome.price >= 0
                                    ? "bg-emerald-100 text-emerald-800 text-sm font-medium inline-flex items-center mx-auto my-1 justify-center w-10 py-0.5 rounded dark:bg-gray-900 dark:text-emerald-400 border border-emerald-400"
                                    : "bg-red-100 text-red-800 text-sm font-medium inline-flex items-center mx-auto my-1 justify-center w-10 py-0.5 rounded dark:bg-gray-900 dark:text-red-400 border border-red-400"
                                }`}
                              >
                                {outcome.price}
                              </div>
                              <div className="flex-1 text-sm text-gray-600 ml-10">
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

  // pass data to the page via props
  return {
    props: {
      data: {
        items,
      },
    },
  };
}
