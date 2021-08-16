import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Paper, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { setSearchText } from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    borderRadius: "20px",
    justifyContent: "space-between",
    minWidth: "150px"
  },
  input: {
    marginLeft: theme.spacing(2)
  },
  iconSearch: {
    marginRight: "10px"
  },
}));

const SearchPanel = () => { 
  const dispatch = useDispatch();
  const classes = useStyles();

  const onInput = (evt) => {
    evt.preventDefault();
    dispatch(setSearchText(evt.target.value))
  };
  return (
    <Paper component="form" className={classes.root} onInput={onInput}>
      <InputBase
        className={classes.input}
        placeholder="Search..."
        inputProps={{ "aria-label": "search google maps" }}
        fullWidth
      />
      <SearchIcon className={classes.iconSearch} />
    </Paper>
  );
};

export default SearchPanel;
