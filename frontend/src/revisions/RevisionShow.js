import { ShowController } from 'ra-core';
import React from 'react';
import {
    CardActions,
    EditButton,
    FileField,
    ReferenceField,
    RichTextField,
    ShowView,
    Tab,
    TabbedShowLayout,
    TextField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import RevisionTitle from './RevisionTitle';
import FormRender from '../components/form-render';

const RevisionShowActions = ({ basePath, data, resource }) => (
    <CardActions>
        <EditButton basePath={basePath} record={data} />
    </CardActions>
);

const RevisionShow = props => {
    return <ShowController title={<RevisionTitle />} {...props} actions={<RevisionShowActions />}>
        {controllerProps => {
            return <ShowView {...props} {...controllerProps}>
                <TabbedShowLayout>
                    <Tab label="revision.form.summary">
                        {controllerProps.record && controllerProps.record.revision_type === 'textentry' && 
                        <RichTextField source="content" />}
                        {controllerProps.record && controllerProps.record.revision_type === 'form' &&
                        <FormRender content={controllerProps.record.content} showSubmit={false}/>}
                        {controllerProps.record && controllerProps.record.revision_type === 'document' &&
                        <FileField source="content" title="content" />}
                        <TextField source="note" />
                        <ReferenceField reference="articles" source="article_id" linkType={false}>
                            <TextField source="name" />
                        </ReferenceField>
                        <ReferenceField reference="users" source="created_by" linkType={false}>
                            <TextField source="name" />
                        </ReferenceField>
                    </Tab>
                </TabbedShowLayout>
            </ShowView>
        }}
    </ShowController>
};

export default RevisionShow;
