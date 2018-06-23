import angular from "angular";

const app = angular.module("app", []);

app.controller("loginController", [
  "$http",
  "$location",
  function(http, location) {
    let vm = this;
    this.app = "App works";

    this.login = () => {
      http
        .post("/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res);
        });
    };
    this.register = () => {
      http
        .post("/register", {
          email: this.email,
          password: this.password
        })
        .then(res => console.log(res));
    };
  }
]);
