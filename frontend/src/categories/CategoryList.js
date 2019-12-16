import { withStyles } from '@material-ui/core/styles';
import React, { Children, Fragment, cloneElement } from 'react';
import {
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

const CategoryFilter = props => (
    <Filter {...props}>
        <SearchInput source="search" alwaysOn />
    </Filter>
);

const styles = theme => ({
});

const CategoryListBulkActions = props => (
    <Fragment>
        <ResetViewsButton {...props} />
        { props.permissions === 'manager' && <BulkDeleteButton {...props} /> }
    </Fragment>
);

const CategoryListActionToolbar = withStyles({
    toolbar: {
        alignItems: 'center',
        display: 'flex',
    },
})(({ classes, children, ...props }) => (
    <div className={classes.toolbar}>
        {Children.map(children, button => button && cloneElement(button, props))}
    </div>
));

const CategoryList = withStyles(styles)(({ permissions, classes, ...props }) => (
    <List
        {...props}
        bulkActionButtons={<CategoryListBulkActions />}
        filters={<CategoryFilter />}
        sort={{ field: 'name', order: 'ASC' }}
    >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.name}
                    tertiaryText={record =>
                        new Date(record.created_at).toLocaleDateString()
                    }
                    linkType={'show'}
                />
            }
            medium={
                <Datagrid rowClick={'show'}>
                    <TextField source="name" />
                    <DateField source="created_at" />
                    <ReferenceField source="created_by" reference="users" linkType={false}>
                        <TextField source="name" />
                    </ReferenceField>
                    <CategoryListActionToolbar>
                        <ShowButton />
                        { permissions === 'manager' && <EditButton/>}
                        { permissions === 'manager' && <DeleteWithConfirmButton/>}
                    </CategoryListActionToolbar>
                </Datagrid>
            }
        />
    </List>
));

export default CategoryList;
