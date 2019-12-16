import { ShowController } from 'ra-core';
import React from 'react';
import {
    Datagrid,
    DateField,
    FileField,
    ReferenceField,
    ReferenceManyField,
    ShowView,
    SimpleShowLayout,
    TextField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DocumentTitle from './DocumentTitle';

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

const DocumentShow = ({ permissions, ...props}) => (
    <ShowController title={<DocumentTitle />} {...props}>
        {controllerProps => {
            console.log(permissions);
            return <ShowView {...props} {...controllerProps}>
                <SimpleShowLayout>
                    <TextField source="name" />
                    <ReferenceField source="category_id" reference="categories" linkType={false}>
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceManyField
                        reference="revisions"
                        target="article_id"
                        sort={{ field: 'created_at', order: 'DESC' }}
                        label="document.form.revisions"
                    >
                        <Datagrid>
                            <FileField source="content" title="content" />
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
        }}
    </ShowController>
);

export default DocumentShow;
