import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const EmployeeLogin = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <TextField
          required
          id="standard-full-width"
          label="Email"
          placeholder="email"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          value={email}
          onInput={e => setEmail(e.target.value)}
        />
        <TextField
          required
          id="standard-password-input"
          label="Password"
          placeholder="password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          value={password}
          onInput={e => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
        Login
      </Button>
    </form>
  );
};

export default EmployeeLogin;
