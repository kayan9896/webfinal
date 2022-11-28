import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Link, useSearchParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { Grid } from "@mui/material";
import { Box } from "@mui/system";

export default function Home() {
  const [appList, setAppList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    async function getIds() {
      try {
        setLoading(true);
        let { data } = await axios.get(
          "https://gamewebsite.onrender.com/getapps"
        );
        if (data.ok) {
          setAppList(data.list);
          setAppList(data.list);
          setLoading(false);
        }
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    getIds();
  }, []);

  return (
    <React.Fragment>
      <Box style={{ textAlign: "center", marginBottom: 50 }}>
        <TextField
          label="Search..."
          variant="standard"
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
          style={{ width: 250 }}
        />
      </Box>

      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        style={{ justifyContent: "center" }}
      >
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          appList
            .filter((i) => {
              let filter = searchParams.get("filter");
              if (!filter) return true;
              let name = i.name.toLowerCase();
              return name.startsWith(filter.toLowerCase());
            })
            .map((app, i) => {
              return (
                <Grid
                key={app.steam_appid}
                  xs={2}
                  sm={3}
                  md={3}
                  style={{ marginLeft: 20, marginBottom: 40 }}
                >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={app.header_image}
                    />
                    <CardContent>{app.name}</CardContent>
                    <CardActions>
                      <Link
                        to={`/game/${app.steam_appid}`}
                        style={{ textDecoration: "none" }}
                      >
                        Show Details
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
        )}
      </Grid>
    </React.Fragment>
  );
}
