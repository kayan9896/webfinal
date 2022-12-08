import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MiniDetails() {
  const { gameId } = useParams();
  const [details, setDetails] = useState([]);
  useEffect(() => {
    async function getdetails() {
      let re = await fetch(
        `https://gamewebsite.onrender.com/api/json/${gameId}`
      );
      const da = await re.json();
      if (re.ok) setDetails(da);
      // console.log(da);
    }
    getdetails();
  }, [gameId]);
  return (
    <Grid
      container
      style={{
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 100,
      }}
    >
      <Grid
        xs={12}
        item
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid xs={6} item style={{ width: "100%" }}>
          <h1>{details.Game}</h1>
          <embed
            src={details.Gamelink}
            style={{ width: "100vw", height: "100vh" }}
          />
        </Grid>
        <Grid xs={6} item>
          <p style={{ textAlign: "justify" }}>{details.Description}</p>
          <p style={{ textAlign: "justify" }}>{details.Instructions}</p>
        </Grid>
      </Grid>
    </Grid>
  );
}
