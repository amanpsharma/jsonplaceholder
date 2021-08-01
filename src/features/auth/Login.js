import React, { useEffect } from "react";
import { Paper, Button, TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const history = useHistory();
  const onSubmit = (data) => {
    console.log(data);
    const userDetails = {
      username: "aman",
      password: "12345aman",
    };
    const { username, password } = data;
    window.localStorage.setItem("username", userDetails.username);
    if (
      username === userDetails.username &&
      password === userDetails.password
    ) {
      props.history.push("/users");
    } else {
      props.history.push("/");
    }
  };

  useEffect(() => {
    localStorage.getItem("username")
      ? history.push("/users")
      : history.push("/");
  }, [history]);

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper square>
          <div className="login_wrapper">
            <p>Sign in</p>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="User Name"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "username is required" }}
            />
            <br />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Password"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  type="password"
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: "password is required" }}
            />
          </div>
          <div className="login_button">
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </div>
        </Paper>
      </form>
    </div>
  );
};

export default Login;
