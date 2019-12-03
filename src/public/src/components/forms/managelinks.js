import React from "react";
import UpdateLink from "./subforms/updatelink";
import AddRemoveLinks from "./subforms/createremovelink";

const ManageLinksForm = () => {
  return (
    <div>
      <AddRemoveLinks />
      <UpdateLink />
    </div>
  );
};

export default ManageLinksForm;
