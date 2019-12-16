
import { UPDATE } from 'ra-core';
import React, { Component } from 'react';

import {
    Edit,
    SimpleShowLayout,
    showNotification,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

import RevisionTitle from './RevisionTitle';
import FormRender from '../components/form-render';
import PropTypes from 'prop-types';
import dataProvider from '../dataProvider';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class FormPreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: this.props.record.content,
        };
    }

    handleFormdata = (formData) => {
        console.log(formData);
        this.setState({formData: formData});
    }

    handleSubmit = () => {
        const { record } = this.props;
        dataProvider(
            UPDATE,
            'revisions',
            {
                id : record.id,
                data: {
                    ...record,
                    content: this.state.formData, 
                }
            }
        ).then(() => {
            showNotification('Form submitted!');
            this.props.history.push(`${record.id}/show`);
        })
        .catch((e) => {
            showNotification('Error submitting the form!');
        });
    }

    render = () => {
        return  <React.Fragment>
                    <FormRender content={this.state.formData} handleFormdata={this.handleFormdata} handleSubmit={this.handleSubmit} showSubmit={true}/>
                </React.Fragment>
    }
}

FormPreview.propTypes = {
    push: PropTypes.func,
    showNotification: PropTypes.func,
}

const MyFormPreview = connect(null, {
    showNotification,
    push
})(FormPreview);

const RevisionEdit = props => (
    <Edit title={<RevisionTitle />} {...props}>
        <SimpleShowLayout>
            <MyFormPreview history={props.history} location={props.location} />
        </SimpleShowLayout>
    </Edit>
);

export default RevisionEdit;
