import { ShowController, GET_MANY_REFERENCE, CREATE } from 'ra-core';
import React, { Component, cloneElement, Children } from 'react';
import { withStyles } from '@material-ui/core/styles';

import {
    Datagrid,
    DateField,
    DeleteWithConfirmButton,
    EditButton,
    ReferenceField,
    ReferenceManyField,
    ShowView,
    showNotification,
    SimpleShowLayout,
    TextField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

import FormTitle from './FormTitle';
import FormRender from '../components/form-render';
import PropTypes from 'prop-types';
import dataProvider from '../dataProvider';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const FormSubmissionListActionToolbar = withStyles({
    toolbar: {
        alignItems: 'center',
        display: 'flex',
    },
})(({ classes, children, ...props }) => (
    <div className={classes.toolbar}>
        {Children.map(children, button => button && cloneElement(button, props))}
    </div>
));

class FormPreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formPrototype: '',
            formData: '',
        };
    }

    componentDidMount() {
        this.fetchData();
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

    handleFormdata = (formData) => {
        this.setState({formData: formData});
    }

    handleSubmit = () => {
        const { record } = this.props;
        dataProvider(
            CREATE,
            'revisions',
            {
                data: {
                    article_id: record.id, 
                    content: this.state.formData, 
                    revision_type: record.article_type,
                    note: 'form submission'
                }
            }
        ).then((data) => {
            showNotification('Form submitted!');
            this.props.history.push('/');
            this.props.history.push(this.props.location.pathname);
        })
        .catch((e) => {
            showNotification('Error submitting the form!');
        });
    }

    render = () => {
        return  <React.Fragment>
                    <FormRender content={this.state.formPrototype} handleFormdata={this.handleFormdata} handleSubmit={this.handleSubmit} showSubmit={true}/>
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

const FormShow = ({permissions, ...props}) => (
    <ShowController title={<FormTitle />} {...props}>
        {controllerProps => (
            <ShowView {...props} {...controllerProps}>
                <SimpleShowLayout>
                    <MyFormPreview history={props.history} location={props.location} />
                    <TextField source="name" />
                    <ReferenceField source="category_id" reference="categories">
                        <TextField source="name" />
                    </ReferenceField>
                    <DateField source="updated_at" />
                    <ReferenceManyField
                        reference="revisions"
                        target="article_id"
                        sort={{ field: 'created_at', order: 'DESC' }}
                        label = "form.form.submissions"
                    >
                        <Datagrid rowClick={'show'}>
                            <TextField source="note" />
                            <ReferenceField reference="users" source="created_by" linkType={false}>
                                <TextField source="name" />
                            </ReferenceField>
                            <DateField source="created_at" />
                            <FormSubmissionListActionToolbar>
                                { permissions === 'manager' && <EditButton/>}
                                { permissions === 'manager' && <DeleteWithConfirmButton redirect={props.location.pathname}/>}
                            </FormSubmissionListActionToolbar>
                        </Datagrid>
                    </ReferenceManyField>
                </SimpleShowLayout>
            </ShowView>
        )}
    </ShowController>
);

export default FormShow;
