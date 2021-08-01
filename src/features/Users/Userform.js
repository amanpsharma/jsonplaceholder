import React from "react";
import { Paper, Button, TextField, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { saveUsers, editUsers, editUserSingle } from "./userSlice";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Userform = () => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      city: "",
      street: "",
      suite: "",
      zipcode: "",
    },
  });
  const { singleUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  React.useEffect(() => {
    reset(singleUser);
  }, [singleUser, reset]);

  const callApi = (data) => {
    dispatch(editUserSingle(data.id, data));
    dispatch(editUsers(data.id, data));
  };
  const onSubmit = (data) => {
    console.log(data, "singleUser.length");
    data.id ? callApi(data) : dispatch(saveUsers(data));
  };

  const classes = useStyles();
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper square elevation={0}>
          <div className={classes.root}>
            <Grid item xs={12} container direction="row">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Name"
                    variant="outlined"
                    value={value || ""}
                    onChange={onChange}
                    type="name"
                    error={!!error}
                    helperText={error ? error.message : null}
                    style={{ marginRight: 10 }}
                  />
                )}
                rules={{ required: "Name is required" }}
              />

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
                    value={value || ""}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "username is required" }}
              />
            </Grid>
            <br />
            <Grid item xs={12} container direction="row">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Email"
                    variant="outlined"
                    value={value || ""}
                    onChange={onChange}
                    type="email"
                    error={!!error}
                    helperText={error ? error.message : null}
                    style={{ marginRight: 10 }}
                  />
                )}
                rules={{ required: "Email is required" }}
              />

              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Phone"
                    variant="outlined"
                    value={value || ""}
                    onChange={onChange}
                    type="phone"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "Phone is required" }}
              />
            </Grid>
            <br />
            <Grid item xs={12} container direction="row">
              <Controller
                name="address.city"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="City"
                    variant="outlined"
                    value={value || ""}
                    onChange={onChange}
                    type="city"
                    error={!!error}
                    helperText={error ? error.message : null}
                    style={{ marginRight: 10 }}
                  />
                )}
                rules={{ required: "City is required" }}
              />
              <br />
              <Controller
                name="address.street"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Street"
                    variant="outlined"
                    value={value || ""}
                    onChange={onChange}
                    type="street"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "Street is required" }}
              />
            </Grid>

            <br />
            <Grid item xs={12} container direction="row">
              <Controller
                name="address.suite"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Suite"
                    variant="outlined"
                    value={value || ""}
                    onChange={onChange}
                    type="suite"
                    error={!!error}
                    helperText={error ? error.message : null}
                    style={{ marginRight: 10 }}
                  />
                )}
                rules={{ required: "Suite is required" }}
              />
              <br />
              <Controller
                name="address.zipcode"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="zipcode"
                    variant="outlined"
                    value={value || ""}
                    onChange={onChange}
                    type="zipcode"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "Zipcode is required" }}
              />
            </Grid>

            <br />
            <Grid item xl={12} container direction="row">
              <Controller
                name="website"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Website"
                    variant="outlined"
                    value={value || ""}
                    onChange={onChange}
                    type="website"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "Website is required" }}
              />
            </Grid>
            <br />
            <Grid item xs={12} container direction="row">
              <Controller
                name="company.name"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Company name"
                    variant="outlined"
                    value={value || ""}
                    onChange={onChange}
                    type="suite"
                    error={!!error}
                    helperText={error ? error.message : null}
                    style={{ marginRight: 10 }}
                  />
                )}
                rules={{ required: "Company name is required" }}
              />
              <br />
              <Controller
                name="company.catchPhrase"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="catchPhrase"
                    variant="outlined"
                    value={value || ""}
                    onChange={onChange}
                    type="catchPhrase"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "catchPhrase is required" }}
              />
            </Grid>
            <br />
            <Grid item xs={12} container direction="row">
              <Controller
                name="company.bs"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="companyBS"
                    variant="outlined"
                    value={value || ""}
                    onChange={onChange}
                    type="companyBS"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: "companyBS is required" }}
              />
            </Grid>
          </div>
          <br />
          <div className="login_button">
            <Button type="submit" variant="contained" color="primary">
              {singleUser.length === 0 ? "Add User" : "Update User"}
            </Button>
          </div>
        </Paper>
      </form>
    </div>
  );
};
export default Userform;
