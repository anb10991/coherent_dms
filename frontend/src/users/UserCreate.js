/* eslint react/jsx-key: off */
import React from 'react';
import {
    Create,
    email,
    FormTab,
    number,
    SaveButton,
    TabbedForm,
    TextInput,
    Toolbar,
    required,
} from 'react-admin';

const UserEditToolbar = ({ permissions, ...props }) => (
    <Toolbar {...props}>
        <SaveButton
            label="user.action.save_and_show"
            redirect="show"
            submitOnEnter={true}
        />
    </Toolbar>
);

const UserCreate = ({ permissions, ...props }) => (
    <Create {...props}>
        <TabbedForm toolbar={<UserEditToolbar permissions={permissions} defaultValue={{is_staff: false}} />}>
            <FormTab label="user.form.summary" path="">
                <TextInput source="username" autoFocus validate={required()} />
                <TextInput source="email" validate={[required(), email()]} />
                <TextInput source="password" type="password" validate={required()} />
                <TextInput source="first_name" />
                <TextInput source="last_name" />
                <TextInput source="phone" validate={number()} />
                <TextInput source="occupation" />
            </FormTab>
        </TabbedForm>
    </Create>
);

export default UserCreate;
