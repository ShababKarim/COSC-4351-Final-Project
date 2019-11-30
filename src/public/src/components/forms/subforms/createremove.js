import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex"
  },
  header: { marginTop: theme.spacing(2), marginBottom: theme.spacing(0) },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  button: {
    marginLeft: theme.spacing(10)
  },
  wrap: {
    marginBottom: theme.spacing(10)
  }
}));

const CreateRemove = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrap}>
      <h2 className={classes.header}>Create or Remove Admin:</h2>
      <div className={classes.container}>
        <TextField label="Employee ID" id="standard-basic" className={classes.textField} />
        <ButtonGroup variant="text" color="primary" className={classes.button}>
          <Button>Create</Button>
          <Button>Remove</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CreateRemove;
