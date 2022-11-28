import React, { Component } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@mui/material";
const axios = require("axios");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  login = () => {
    const pwd = bcrypt.hashSync(this.state.password, salt);

    axios
      .post("http://localhost:3005/login", {
        username: this.state.username,
        password: pwd,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.id);
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: err.response.data.errorMessage,
            icon: "error",
            type: "error",
          });
        }
      });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div>
          <h2>Login</h2>
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
            id="username"
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
            id="password"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
            style={{ margin: 20 }}
          />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === "" && this.state.password === ""}
            onClick={this.login}
            style={{ margin: '20px auto', width:'40%', }}
          >
            Login
          </Button>

          <Link href="/register">Register</Link>
        </div>
      </div>
    );
  }
}
