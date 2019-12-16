import React from 'react';
import {
    Edit,
    FormTab,
    TabbedForm,
    TextInput,
    required,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import CategoryTitle from './CategoryTitle';

const CategoryEdit = props => (
    <Edit title={<CategoryTitle />} {...props}>
        <TabbedForm defaultValue={{ average_note: 0 }}>
            <FormTab label="category.form.summary">
                <TextInput source="name" validate={required()} resettable />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default CategoryEdit;
