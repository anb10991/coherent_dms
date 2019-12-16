import React from 'react';

import {
    AutocompleteInput,
    BooleanInput,
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

const TextEntryCreateToolbar = props => (
    <Toolbar {...props}>
        <SaveButton
            label="global.button.action.save_and_continue"
            redirect={redirect}
            submitOnEnter={true}
            variant="flat"
        />
    </Toolbar>
);

const TextEntryCreate = ({ permissions, ...props }) => (
    <Create {...props}>
        <SimpleForm
            toolbar={<TextEntryCreateToolbar />}
            defaultValue={{article_type: 'textentry'}}
        >
            <TextInput autoFocus source="name" validate={required()} />
            <ReferenceInput label="document.form.category" source="category_id" reference="categories" validate={required()} resettable sort={{ field: 'name', order: 'ASC' }}>
                <AutocompleteInput />
            </ReferenceInput>
            <BooleanInput source="is_active" defaultValue={true} />
            <BooleanInput source="is_homepage" defaultValue={true} />
        </SimpleForm>
    </Create>
);

export default TextEntryCreate;
