import React from 'react';

import {
    Create,
    FormTab,
    SaveButton,
    TabbedForm,
    TextInput,
    Toolbar,
    required,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const CategoryCreateToolbar = props => (
    <Toolbar {...props}>
        <SaveButton
            label="global.button.action.save_and_show"
            redirect="show"
            submitOnEnter={false}
            variant="flat"
        />
    </Toolbar>
);

const CategoryCreate = ({ permissions, ...props }) => (
    <Create {...props}>
        <TabbedForm
            toolbar={<CategoryCreateToolbar />}
        >
            <FormTab label="category.form.summary" path="">
                <TextInput autoFocus source="name" validate={required()} />
            </FormTab>
        </TabbedForm>
    </Create>
);

export default CategoryCreate;
