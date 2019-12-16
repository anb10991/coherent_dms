import { UPDATE, GET_MANY_REFERENCE, required } from 'ra-core';
import React, {Component} from 'react';
import {
    AutocompleteInput,
    Edit,
    FormTab,
    ReferenceInput,
    TabbedForm,
    TextInput,
    showNotification,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import FormTitle from './FormTitle';
import FormBuilder from '../components/form-builder';
import PropTypes from 'prop-types';
import dataProvider from '../dataProvider';
import { connect } from 'react-redux';
import { change } from 'redux-form';

class RevisionFormBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formPrototype: '',
        };
    }

    fetchData = async () => {
        const { record, showNotification } = this.props;
        dataProvider(
            GET_MANY_REFERENCE,
            'revisions',
            {
                target: 'article_id',
                id: record.id,
                sort: { field: 'created_at', order: 'ASC' },
                pagination: { page: 1, perPage: 1}
            }
        ).then((data) => {
            this.setState({formPrototype: data.data[0].content});
        })
        .catch((e) => {
            showNotification('Error: Can\'t get revision', 'warning');
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    handleFormData = (formData) => {
        const { record, showNotification } = this.props;
        dataProvider(
            GET_MANY_REFERENCE,
            'revisions',
            {
                target: 'article_id',
                id: record.id,
                sort: { field: 'created_at', order: 'ASC' },
                pagination: { page: 1, perPage: 1}
            }
        ).then((data) => {
            dataProvider(
                UPDATE,
                'revisions',
                {
                    id: data.data[0].id,
                    data: {
                        ...data.data[0],
                        content: formData,
                    },
                    previousData: {
                        content: data.data[0].content,
                    }
                }
            );
        })
        .catch((e) => {
            showNotification('Error: Can\'t get revision', 'warning');
        });
    }

    render = () => (
        <React.Fragment>
            <FormBuilder handleFormData={this.handleFormData} content={this.state.formPrototype} />
        </React.Fragment>
    )
};

RevisionFormBuilder.propTypes = {
    change: PropTypes.func,
    showNotification: PropTypes.func,
};

const MyFormBuilder = connect(
    null, 
    {
        change,
        showNotification,
    }
)(RevisionFormBuilder);

const FormEdit = props => (
    <Edit title={<FormTitle />} {...props}>
        <TabbedForm>
            <FormTab label="form.form.summary">
                <ReferenceInput label="document.form.category" source="category_id" reference="categories" validate={required()} resettable sort={{ field: 'name', order: 'ASC' }}>
                    <AutocompleteInput />
                </ReferenceInput>
                <TextInput autoFocus source="name" validate={required()} />
                <MyFormBuilder history={props.history} location={props.location} />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export default FormEdit;
