import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

export default function Home() {
  const [appList, setAppList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getIds() {
      try {
        setLoading(true);
        let { data } = await axios.get("http://localhost:3005/getapps");
        if (data.ok) {
          setAppList(data.list);
          setLoading(false);
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    getIds();
  }, []);

  return (
    <React.Fragment>
      <div className="searchArea">
        <input type="text" placeholder="search...." />
      </div>
      <div className="appList__listArea">
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          appList.map((app, i) => {
            return (
              <div key={i} className="appList__item">
                <Link to={`/game/${app.steam_appid}`}>
                  <embed src={app.header_image} />
                  <h4>{app.name}</h4>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </React.Fragment>
  );
}
