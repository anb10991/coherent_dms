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
import TextEntryTitle from './TextEntryTitle';

const TextEntryEdit = props => (
    <Edit title={<TextEntryTitle />} {...props}>
        <TabbedForm>
            <FormTab label="textentry.form.summary">
                <TextInput source="name" validate={required()} resettable />
                <ReferenceInput label="textentry.form.category" source="category_id" reference="categories" validate={required()} resettable sort={{ field: 'name', order: 'ASC' }}>
                    <AutocompleteInput />
                </ReferenceInput>
                <BooleanInput source="is_active" />
                <BooleanInput source="is_homepage" />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default TextEntryEdit;
