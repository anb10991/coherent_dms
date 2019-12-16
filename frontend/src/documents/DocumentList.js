import { withStyles } from '@material-ui/core/styles';
import React, { Children, Fragment, cloneElement } from 'react';
import {
    BooleanField,
    BulkDeleteButton,
    Datagrid,
    DateField,
    DeleteWithConfirmButton,
    EditButton,
    ShowButton,
    Filter,
    List,
    ReferenceField,
    Responsive,
    SearchInput,
    SimpleList,
    TextField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

import ResetViewsButton from './ResetViewsButton';

const DocumentFilter = props => (
    <Filter {...props}>
        <SearchInput source="search" alwaysOn />
    </Filter>
);

const styles = theme => ({
});

const DocumentListBulkActions = props => (
    <Fragment>
        <ResetViewsButton {...props} />
        { props.permissions === 'manager' && <BulkDeleteButton {...props} /> }
    </Fragment>
);

const DocumentListActionToolbar = withStyles({
    toolbar: {
        alignItems: 'center',
        display: 'flex',
    },
})(({ classes, children, ...props }) => (
    <div className={classes.toolbar}>
        {Children.map(children, button => button && cloneElement(button, props))}
    </div>
));

const documentRowStyle = (record, index) => ({
    backgroundColor: record.is_active ? 'lightblue' : 'lightgrey',
});

const DocumentList = withStyles(styles)(({ permissions, classes, ...props }) => {
    if (!permissions)
        return <Fragment></Fragment>;

    return <List
        {...props}
        bulkActionButtons={<DocumentListBulkActions />}
        filters={<DocumentFilter />}
        filter={permissions === 'manager' ? {article_type: 'document'} : {article_type: 'document', is_active: true}}
        sort={{ field: 'name', order: 'ASC' }}
    >
        <Responsive
            small={
                <SimpleList
                    linkType={'show'}
                    primaryText={record => record.name}
                    tertiaryText={record =>
                        new Date(record.created_at).toLocaleDateString()
                    }
                />
            }
            medium={
                <Datagrid rowClick={'show'} rowStyle={documentRowStyle}>
                    <TextField source="name" cellClassName={classes.name} />
                    <ReferenceField source="category_id" reference="categories" linkType={false}>
                        <TextField source="name" />
                    </ReferenceField>
                    {permissions === 'manager' &&
                    <BooleanField source="is_active" />}
                    {permissions === 'manager' &&
                    <BooleanField source="is_homepage" />}
                    <DateField
                        source="updated_at"
                        cellClassName={classes.updatedAt}
                    />
                    <ReferenceField source="created_by" reference="users" linkType={false}>
                        <TextField source="name" />
                    </ReferenceField>
                    <DocumentListActionToolbar>
                        <ShowButton />
                        { permissions === 'manager' && <EditButton/>}
                        { permissions === 'manager' && <DeleteWithConfirmButton/>}
                    </DocumentListActionToolbar>
                </Datagrid>
            }
        />
    </List>
});

export default DocumentList;
