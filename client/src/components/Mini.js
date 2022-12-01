import React, { useEffect, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

export default function Mini() {
  const [miniList, setMiniList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    async function getIds() {
      try {
        setLoading(true);
        let re = await fetch("https://gamewebsite.onrender.com/api/listall");
        if (!re.ok) {
          throw new Error(`e:${re.status}`);
        }
        const da = await re.json();
        setLoading(false);
        console.log(da);
        setMiniList(da);
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
      <div className="appList__listArea">
        <Grid
          container
          // spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ justifyContent: "center" }}
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            miniList
              .filter((i) => {
                let filter = searchParams.get("filter");
                if (!filter) return true;
                let name = i.Game.toLowerCase();
                return name.includes(filter.toLowerCase());
              })
              .map((i) => {
                return (
                  <Grid
                    key={i._id}
                    xs={2}
                    sm={3}
                    md={3}
                    style={{ marginLeft: 20, marginBottom: 40 }}
                  >
                    <Card sx={{ maxWidth: 345 }}>
                      <embed src={i.Gamelink} />

                      <CardContent>{i.Game}</CardContent>
                      <CardActions>
                        <Link
                          to={`/mini/${i._id}`}
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
      </div>
    </React.Fragment>
  );
}
