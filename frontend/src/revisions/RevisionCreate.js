import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Create,
    DisabledInput,
    FileField,
    FileInput,
    SaveButton,
    SimpleForm,
    TextInput,
    Toolbar,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import RichTextInput from 'ra-input-rich-text';
import { CreateController, required } from 'ra-core';
import FormBuilder from '../components/form-builder';
import { connect } from 'react-redux';
import { change } from 'redux-form';

const RevisionCreateToolbar = props => (
    <Toolbar {...props}>
        <SaveButton
            label="global.button.action.save_and_show"
            redirect="show"
            submitOnEnter={false}
            variant="flat"
        />
    </Toolbar>
);

class RevisionFormBuilder extends Component {

    handleFormData = (formData) => {
        this.props.change("record-form", "content", formData);
    }

    render = () => (
        <React.Fragment>
            <FormBuilder handleFormData={this.handleFormData} />
        </React.Fragment>
    )
};

RevisionFormBuilder.propTypes = {
    change: PropTypes.func,
};

const MyFormBuilder = connect(
    null, 
    {
        change,
    }
)(RevisionFormBuilder);

const RevisionCreate = ({ permissions, ...props }) => {
    return <CreateController {...props}>
        {controllerProps => {
            return (<Create {...props} {...controllerProps}>
                <SimpleForm
                    toolbar={<RevisionCreateToolbar />}
                >
                    {controllerProps.record && controllerProps.record.revision_type === "document" &&
                    <FileInput source="content" ><FileField source="src" title="title" /></FileInput>}
                    {controllerProps.record && controllerProps.record.revision_type === "textentry" &&
                    <RichTextInput source="content" validate={required()} />}
                    {controllerProps.record && controllerProps.record.revision_type === "form" &&
                    <MyFormBuilder />}
                    {controllerProps.record && controllerProps.record.note && controllerProps.record.note === 'Initial Version' &&
                    <DisabledInput source="note" />}
                    {controllerProps.record && (!controllerProps.record.note || controllerProps.record.note !== 'Initial Version') &&
                    <TextInput source="note" validate={required()}/>}
                </SimpleForm>
            </Create>)
        }}
    </CreateController>
};

export default RevisionCreate;
