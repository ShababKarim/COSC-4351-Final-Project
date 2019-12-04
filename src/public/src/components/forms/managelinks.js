import React from 'react';
import UpdateLink from './subforms/updatelink';
import AddLink from './subforms/addlink';
import RemoveLink from './subforms/removelink';

const ManageLinksForm = props => {
    return (
        <div>
            <AddLink links={props.links} />
            <UpdateLink links={props.links} />
            <RemoveLink links={props.links} />
        </div>
    );
};

export default ManageLinksForm;
