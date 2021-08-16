import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { withRouter } from "react-router";

const a11yProps = index => {
    return {
      id: `nav-tab-${index}`,
      "aria-controls": `nav-tabpanel-${index}`
    };
  };

const NavPanel = ({history}) => {
  const onTabClick = (url) => {
      history.push(url);
  }

  return (
    <>
      <Tab label="Man" onClick={() => onTabClick('/man')} {...a11yProps(0)} />
      <Tab label="Woman" onClick={() => onTabClick('/woman')} {...a11yProps(1)}/>
    </>
  );
};

export default withRouter(NavPanel);