import { ShowController, GET_MANY_REFERENCE } from 'ra-core';
import React, {Component} from 'react';
import {
    BooleanField,
    Datagrid,
    DateField,
    ReferenceField,
    ReferenceManyField,
    ShowView,
    SimpleShowLayout,
    TextField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextEntryTitle from './TextEntryTitle';
import dataProvider from '../dataProvider';

const CreateRelatedComment = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: '/revisions/create',
            state: { record: { article_id: record.id, revision_type: record.article_type } },
        }}
        color="primary"
    >
        New Revision
    </Button>
);

class TextEntryPreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: '',
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const { record } = this.props;
        dataProvider(
            GET_MANY_REFERENCE,
            'revisions',
            {
                target: 'article_id',
                id: record.id,
                sort: { field: 'created_at', order: 'DESC' },
                pagination: { page: 1, perPage: 1}
            }
        ).then((data) => {
            this.setState({formData: data.data[0].content});
        })
        .catch((e) => {
        });
    }

    render = () => {
        return  <div className="preview" dangerouslySetInnerHTML={{__html: this.state.formData}}>
                </div>
    }
}

const TextEntryShow = props => (
    <ShowController title={<TextEntryTitle />} {...props}>
        {controllerProps => (
            <ShowView {...props} {...controllerProps}>
                <SimpleShowLayout>
                    <TextField source="name" />
                    <TextEntryPreview />
                    <ReferenceField source="category_id" reference="categories">
                        <TextField source="name" />
                    </ReferenceField>
                    <BooleanField source="is_active" />
                    <BooleanField source="is_homepage" />
                    <ReferenceManyField
                        reference="revisions"
                        target="article_id"
                        sort={{ field: 'created_at', order: 'DESC' }}
                        label="textentry.form.revisions"
                    >
                        <Datagrid rowClick={'show'}>
                            <TextField source="note" />
                            <ReferenceField reference="users" source="created_by" linkType={false}>
                                <TextField source="name" />
                            </ReferenceField>
                            <DateField source="created_at" />
                        </Datagrid>
                    </ReferenceManyField>
                    { props.permissions === 'manager' && <CreateRelatedComment /> }
                </SimpleShowLayout>
            </ShowView>
        )}
    </ShowController>
);

export default TextEntryShow;
