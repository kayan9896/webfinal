import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import ReactHtmlParser from "react-html-parser";
export default function Details() {
  console.log(useParams());
  const { sid } = useParams();
  const [gameDetails, setGameDetails] = useState({});
  useEffect(() => {
    async function getGameDetails() {
      let { data } = await axios.get(
        `https://gamewebsite.onrender.com/game/${sid}`
      );
      console.log(data);
      if (data.ok) setGameDetails(data.details);
    }
    getGameDetails();
  }, [sid]);
  return (
    <div>
      <div className="details__area">
        <table className="details__table">
          <tbody>
            {Object.keys(gameDetails).map((key) => {
              switch (key) {
                case "header_image":
                  return (
                    <tr>
                      <td>{key}</td>
                      <td>
                        <embed src={gameDetails[key]} width={"30%"} />
                      </td>
                    </tr>
                  );
                case "pc_requirements":
                  return (
                    <React.Fragment>
                      <tr>
                        <td>Minimum PC requirements</td>
                        <td
                          dangerouslySetInnerHTML={{
                            __html: gameDetails[key].minimum,
                          }}
                        />
                      </tr>
                      <tr>
                        <td>recommended PC requirements</td>
                        <td
                          dangerouslySetInnerHTML={{
                            __html: gameDetails[key].recommended,
                          }}
                        />
                      </tr>
                    </React.Fragment>
                  );
                case "price_overview":
                  return (
                    <tr>
                      <td>Current Price</td>
                      <td>{gameDetails[key].final_formatted}</td>
                    </tr>
                  );
                case "genres":
                  const genres = gameDetails[key].map(
                    ({ description }) => description
                  );
                  return (
                    <tr>
                      <td>genres</td>
                      <td>{genres.join(", ")}</td>
                    </tr>
                  );

                case "categories":
                  const categories = gameDetails[key].map(
                    ({ description }) => description
                  );
                  return (
                    <tr>
                      <td>categories</td>
                      <td>{categories.join(", ")}</td>
                    </tr>
                  );

                case "release_date":
                  return (
                    <tr>
                      <td>Price</td>
                      <td>{gameDetails[key]["date"]}</td>
                    </tr>
                  );
                case "screenshots":
                  return (
                    <tr>
                      <td style={{ borderBottomLeftRadius: 20 }}>
                        Screenshots
                      </td>
                      <td style={{ borderBottomRightRadius: 20 }}>
                        {gameDetails[key].map(({ path_thumbnail }) => (
                          <embed
                            src={path_thumbnail}
                            width={"20%"}
                            style={{ paddingRight: 10 }}
                          />
                        ))}
                      </td>
                    </tr>
                  );  
                default:
                  return (
                    <tr>
                      <td
                        style={{ borderTopLeftRadius: key === "name" ? 20 : 0 }}
                      >
                        {key.replace("_", " ")}
                      </td>
                      <td
                        style={{
                          borderTopRightRadius: key === "name" ? 20 : 0,
                        }}
                        dangerouslySetInnerHTML={{ __html: gameDetails[key] }}
                      />
                    </tr>
                  );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
