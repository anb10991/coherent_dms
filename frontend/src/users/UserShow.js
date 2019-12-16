/* eslint react/jsx-key: off */
import React from 'react';
import PropTypes from 'prop-types';
import { EmailField, Show, Tab, TabbedShowLayout, TextField } from 'react-admin'; // eslint-disable-line import/no-unresolved

import UserTitle from './UserTitle';

const UserShow = ({ permissions, ...props }) => (
    <Show title={<UserTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="user.form.summary">
                <TextField source="name" />
                <EmailField source="email" />
                <TextField source = "phone" />
                <TextField source="occupation" />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

UserShow.propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    permissions: PropTypes.string,
};

export default UserShow;
