import React, { Component } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@mui/material";
const axios = require("axios");

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm_password: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {
    axios
      .post("http://localhost:3005/register", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
      });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div>
          <h2>Register</h2>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "50%",
            margin: "0 auto",
            justifyContent: "center",
          }}
        >
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="User Name"
            required
            style={{ margin: 20 }}
          />

          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
            style={{ margin: 20 }}
          />

          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirm Password"
            required
            style={{ margin: 20 }}
          />

          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === "" && this.state.password === ""}
            onClick={this.register}
            style={{ margin: "20px auto", width: "40%" }}
          >
            Register
          </Button>

          <Link href="/login">Login</Link>
        </div>
      </div>
    );
  }
}