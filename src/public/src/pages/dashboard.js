import React, { useContext } from "react";
import AuthContext from "../context";

import NavBar from "../components/dash/navbar";
import HomeDrawer from "../components/dash/homeDrawer";
import Links from "../components/dash/links";
import SuperAdminTabs from "../components/superadmin/superadmintabs";

const Dashboard = () => {
    const { auth } = useContext(AuthContext);
    return (
        <div>
            <NavBar />
            <HomeDrawer />
            <Links />
            {auth && auth.adminType === "SUPER_ADMIN" ? (
                <SuperAdminTabs />
            ) : null}
        </div>
    );
};

export default Dashboard;
