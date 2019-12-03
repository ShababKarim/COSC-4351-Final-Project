import React from "react";
import NavBar from "../dash/navbar";
import HomeDrawer from "../dash/homeDrawer";
import Links from "../dash/links";

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <HomeDrawer />
      <Links />
    </div>
  );
};

export default Dashboard;
