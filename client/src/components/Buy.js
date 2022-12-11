import { useAuth0 } from "@auth0/auth0-react";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Buy() {
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  const [successfullPay, setSuccessfullPay] = useState(false);

  const [cardDetail, setCardDetail] = useState({
    name: "",
    number: "",
    cvv: "",
    expire: "",
  });

  async function submitHandler() {
    let allFilled;
    if (!(state.game.is_free||!state.game.price_overview)) {
      allFilled = Object.keys(cardDetail).every(
        (key) => cardDetail[key].length
      );
      allFilled = allFilled && email.length > 0;
    } else {
      allFilled = email.length > 0;
    }
    if (allFilled) {
      const { data } = await axios.post("http://localhost:3005/users/buy", {
        email,
        gameId: state.game.gameId,
        cardDetail,
      });
      if (data.ok) {
        setSuccessfullPay(true);
      }
    } else alert("Please Fill All The Fields!");
  }
  return (
    <Container>
      <h4 style={{ textAlign: "center" }}>
        Buy {state.game.name} -{" "}
        {state.game.is_free||!state.game.price_overview
          ? "Free To Play"
          : state.game.price_overview.final_formatted}
      </h4>
      <Grid container style={{ justifyContent: "center" }}>
        {successfullPay ? (
          <h2>
            Thank You! We Will Send You a link via the email to download the
            game!
          </h2>
        ) : (
          <Grid item className="buyArea__form">
            {!(state.game.is_free||!state.game.price_overview) ? (
              <>
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="**** **** **** ****"
                  maxLength={16}
                  onChange={({ target: { value } }) =>
                    setCardDetail({ ...cardDetail, number: value })
                  }
                />

                <div className="buyAre__form__sec">
                  <input
                    type="text"
                    placeholder="CVV"
                    pattern={"[0-9]{3}"}
                    maxLength={3}
                    onChange={({ target: { value } }) =>
                      setCardDetail({ ...cardDetail, cvv: value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="MM/YY"
                    onChange={({ target: { value } }) =>
                      setCardDetail({ ...cardDetail, expire: value })
                    }
                  />
                </div>

                <label>Card Holder Name</label>
                <input
                  type="text"
                  placeholder="Name..."
                  onChange={({ target: { value } }) =>
                    setCardDetail({ ...cardDetail, name: value })
                  }
                />
              </>
            ) : null}

            <label>Email</label>
            <input
            
              placeholder="To Recive The game"
              type="text"
              pattern="/^[a-zA-Z0-9.!#$%’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
              
              onChange={({ target: { value } }) => {
                setEmail(value);
              }}
            />

            <button onClick={submitHandler}>Buy Now!</button>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
