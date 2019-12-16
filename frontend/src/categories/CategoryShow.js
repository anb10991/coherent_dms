import { ShowController } from 'ra-core';
import React from 'react';
import {
    Datagrid,
    DateField,
    ReferenceField,
    ReferenceManyField,
    ShowView,
    Tab,
    TabbedShowLayout,
    TextField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import CategoryTitle from './CategoryTitle';

const redirect = (id, basePath, record) => ({
    pathname: (record.article_type === 'textentry' ? `/textentries/${id}/show` : record.article_type === 'document' ? `/documents/${id}/show` : `/forms/${id}/show`)
})

const CategoryShow = props => (
    <ShowController title={<CategoryTitle />} {...props}>
        {controllerProps => (
            <ShowView {...props} {...controllerProps}>
                <TabbedShowLayout>
                    <Tab label="category.form.summary">
                        <TextField source="name" />
                        <ReferenceManyField
                            reference="articles"
                            target="category_id"
                            sort={{ field: 'article_type', order: 'ASC' }}
                            label="category.form.articles"
                        >
                            <Datagrid rowClick={redirect}>
                                <TextField source="name" />
                                <TextField source="article_type" />
                                <ReferenceField reference="users" source="created_by" linkType={false}>
                                    <TextField source="name" />
                                </ReferenceField>
                                <DateField source="updated_at" />
                            </Datagrid>
                        </ReferenceManyField>
                    </Tab>
                </TabbedShowLayout>
            </ShowView>
        )}
    </ShowController>
);

export default CategoryShow;
