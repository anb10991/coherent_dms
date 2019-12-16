/* eslint react/jsx-key: off */
import React from 'react';
import PropTypes from 'prop-types';
import {
    Edit,
    email,
    FormTab,
    SaveButton,
    TabbedForm,
    TextInput,
    Toolbar,
    required,
} from 'react-admin';
import { withStyles } from '@material-ui/core';

import UserTitle from './UserTitle';

const toolbarStyles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

/**
 * Custom Toolbar for the Edit form
 *
 * Save with undo, but delete with confirm
 */
const UserEditToolbar = withStyles(toolbarStyles)(props => (
    <Toolbar {...props}>
        <SaveButton />
    </Toolbar>
));

const UserEdit = ({ permissions, ...props }) => (
    <Edit title={<UserTitle />} {...props}>
        <TabbedForm
            defaultValue={{ role: 'user' }}
            toolbar={<UserEditToolbar />}
        >
            <FormTab label="user.form.summary" path="">
                <TextInput source="username" validate={required()} />
                <TextInput source="email" type="email" validate={[required(), email()]} />
                <TextInput source="password" type="password" validate={required()} />
                <TextInput source="first_name" />
                <TextInput source="last_name" />
                <TextInput source="phone" />
                <TextInput source="occupation" />
            </FormTab>
        </TabbedForm>
    </Edit>
);

UserEdit.propTypes = {
    id: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    permissions: PropTypes.string,
};

export default UserEdit;
