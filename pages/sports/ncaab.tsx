import React, { useState, useEffect } from "react";

export default function NCAAB({ data }: { data: any }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data) {
      setItems(data.items);
    }
  }, [data]);

  return (
    <div className="max-w-7xl justify-center mx-auto px-6">
      <div className="pt-20">
        <div className="cursor-default">
          <div className="flex justify-end ml-auto dark:text-gray-600">
            <span className="dark:bg-gray-900 p-2 mb-2 rounded-lg text-xs font-semibold ring-1 ring-gray-700">
              Any Missing Odds Do Not Have Sharp Data Yet
            </span>
            <span className="dark:bg-gray-900 p-2 ml-2 mb-2 rounded-lg text-xs font-semibold ring-1 ring-gray-700">
              ⚡ Indicates Home Advantage
            </span>
          </div>
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
                  <div className="text-sm font-bold inline-flex items-center dark:text-gray-600">
                    {new Date(item.commence_time).toLocaleTimeString([], {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className="flex p-4 dark:bg-gray-800">
                  <div className="text-md text-gray-300 font-semibold">
                    {item.away_team} @
                  </div>
                  <div className="text-md text-gray-300 font-semibold">
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
                                    ? "text-sm font-medium inline-flex items-center mx-auto my-1 justify-center w-10 py-0.5 rounded dark:bg-gray-900 dark:text-emerald-400 border border-emerald-400"
                                    : "text-sm font-medium inline-flex items-center mx-auto my-1 justify-center w-10 py-0.5 rounded dark:bg-gray-900 dark:text-red-400 border border-red-400"
                                }`}
                              >
                                {outcome.price}
                              </div>
                              <div
                                className={`flex-1 text-sm text-gray-600 ml-10 ${
                                  outcome.point >= 0 || outcome.point <= 0
                                    ? "text-sm font-medium inline-flex items-center mx-auto my-1 justify-center w-10 py-0.5 rounded dark:bg-gray-900 dark:text-blue-300 border border-blue-300"
                                    : ""
                                }`}
                              >
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

export async function getServerSideProps(context: any) {
  const url = process.env.ODD_SERVER_NCAAB_URL;
  const kit = process.env.ODD_SERVER_LOCK;
  const data = await fetch(
    `${url}?apiKey=${kit}&bookmakers=pinnacle&markets=h2h,spreads,totals&oddsFormat=american`
  );
  const items = await data.json();

  // set cache-control headers
  context.res.setHeader(
    "Cache-Control",
    "s-maxage=900, stale-while-revalidate=300"
  );
  // pass data to the page via props
  return {
    props: {
      data: {
        items,
      },
    },
  };
}
