import React from 'react';

import {
    AutocompleteInput,
    Create,
    ReferenceInput,
    SaveButton,
    SimpleForm,
    TextInput,
    Toolbar,
    required,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const redirect = (basePath, id, data) => ({
    pathname: '/revisions/create',
    state: { record: { article_id: data.id, revision_type: data.article_type, note: 'Initial Version' } },
})

const FormCreateToolbar = props => (
    <Toolbar {...props}>
        <SaveButton
            label="global.button.action.save_and_continue"
            redirect={redirect}
            submitOnEnter={true}
            variant="flat"
        />
    </Toolbar>
);

const FormCreate = ({ permissions, ...props }) => (
    <Create {...props}>
        <SimpleForm
            toolbar={<FormCreateToolbar />}
            defaultValue={{article_type: 'form', is_homepage: false}}
        >
            <ReferenceInput label="document.form.category" source="category_id" reference="categories" validate={required()} resettable sort={{ field: 'name', order: 'ASC' }}>
                <AutocompleteInput />
            </ReferenceInput>
            <TextInput autoFocus source="name" validate={required()} />
        </SimpleForm>
    </Create>
);

export default FormCreate;
