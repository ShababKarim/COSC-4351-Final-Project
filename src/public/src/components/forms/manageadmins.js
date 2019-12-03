import React from "react";
import CreateRemove from "./subforms/createremove";
import AddRemoveRoles from "./subforms/addremoveroles";
import UpdateRole from "./subforms/updaterole";

const ManageAdminsForm = () => {
  return (
    <div>
      <CreateRemove />
      <AddRemoveRoles />
      <UpdateRole />
    </div>
  );
};

export default ManageAdminsForm;
