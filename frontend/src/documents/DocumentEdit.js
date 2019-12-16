import React from 'react';
import {
    AutocompleteInput,
    BooleanInput,
    Edit,
    FormTab,
    ReferenceInput,
    TabbedForm,
    TextInput,
    required,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import DocumentTitle from './DocumentTitle';

const DocumentEdit = props => (
    <Edit title={<DocumentTitle />} {...props}>
        <TabbedForm defaultValue={{ average_note: 0 }}>
            <FormTab label="document.form.summary">
                <TextInput source="name" validate={required()} resettable />
                <ReferenceInput source="category_id" reference="categories" validate={required()} resettable sort={{ field: 'name', order: 'ASC' }}>
                    <AutocompleteInput />
                </ReferenceInput>
                <BooleanInput source="is_active" />
                <BooleanInput source="is_homepage" />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default DocumentEdit;
