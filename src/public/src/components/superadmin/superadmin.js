import React from "react";
import NavBar from "../dash/navbar";
import HomeDrawer from "../dash/homeDrawer";
import SuperAdminTabs from "./superadmintabs";

const SuperAdmin = () => {
  return (
    <div>
      <NavBar />
      <HomeDrawer />
      <SuperAdminTabs />
    </div>
  );
};

export default SuperAdmin;
