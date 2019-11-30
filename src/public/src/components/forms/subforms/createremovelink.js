import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  formControl: {
    marginLeft: theme.spacing(10),
    minWidth: 120
  },
  wrap: {
    marginBottom: theme.spacing(10)
  }
}));

const AddRemoveLinks = () => {
  const classes = useStyles();
  const [role, setRole] = React.useState("");

  const handleChange = event => {
    setRole(event.target.value);
  };

  return (
    <div className={classes.wrap}>
      <h2 className={classes.header}>Creat or Remove Link:</h2>
      <div className={classes.container}>
        <TextField label="Link" id="standard-basic" className={classes.textField} />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={role} onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <ButtonGroup variant="text" color="primary" className={classes.button}>
          <Button>Create</Button>
          <Button>Remove</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default AddRemoveLinks;
