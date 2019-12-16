import { withStyles } from '@material-ui/core/styles';
import React, { Children, cloneElement } from 'react';
import {
    Datagrid,
    DateField,
    ShowButton,
    List,
    ReferenceField,
    Responsive,
    SimpleList,
    TextField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import { Card, CardHeader, CardContent, Paper } from '@material-ui/core';

const redirect = (id, basePath, record) => ({
    pathname: (record.article_type === 'textentry' ? `/textentries/${id}/show` : `/documents/${id}/show`)
})

const MasterDocumentListActionToolbar = withStyles({
    toolbar: {
        alignItems: 'center',
        display: 'flex',
    },
})(({ classes, children, ...props }) => (
    <div className={classes.toolbar}>
        {Children.map(children, button => button && cloneElement(button, props))}
    </div>
));

const MasterDocumentList = (({ ...props }) => {
    return  <Card>
                <CardHeader title="Master Documents" />
                <CardContent>
                    <Paper>
                        <List
                            {...props}
                            bulkActionButtons={false}
                            exporter={false}
                            filter={{article_type: 'document,textentry', is_active: true}}
                            sort={{ field: 'name', order: 'ASC' }}
                        >
                            <Responsive
                                small={
                                    <SimpleList
                                        linkType={redirect}
                                        primaryText={record => record.name}
                                        tertiaryText={record =>
                                            new Date(record.created_at).toLocaleDateString()
                                        }
                                    />
                                }
                                medium={
                                    <Datagrid rowClick={redirect}>
                                        <TextField source="name" />
                                        <ReferenceField source="category_id" reference="categories" linkType={false}>
                                            <TextField source="name" />
                                        </ReferenceField>
                                        <DateField source="updated_at" />
                                        <ReferenceField source="created_by" reference="users" linkType={false}>
                                            <TextField source="name" />
                                        </ReferenceField>
                                        <MasterDocumentListActionToolbar>
                                            <ShowButton />
                                        </MasterDocumentListActionToolbar>
                                    </Datagrid>
                                }
                            />
                        </List>
                    </Paper>
                </CardContent>
            </Card>
});

export default MasterDocumentList;
