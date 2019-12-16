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

const FormFilter = props => (
    <Filter {...props}>
        <SearchInput source="search" alwaysOn />
    </Filter>
);

const styles = theme => ({
});

const FormListBulkActions = props => (
    <Fragment>
        <ResetViewsButton {...props} />
        { props.permissions === 'manager' && <BulkDeleteButton {...props} /> }
    </Fragment>
);

const FormListActionToolbar = withStyles({
    toolbar: {
        alignItems: 'center',
        display: 'flex',
    },
})(({ classes, children, ...props }) => (
    <div className={classes.toolbar}>
        {Children.map(children, button => button && cloneElement(button, props))}
    </div>
));

const FormList = withStyles(styles)(({ permissions, classes, ...props }) => (
    <List
        {...props}
        bulkActionButtons={<FormListBulkActions />}
        filters={<FormFilter />}
        filter={{article_type: 'form'}}
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
                    <TextField source="name" cellClassName={classes.name} />
                    <ReferenceField source="category_id" reference="categories" linkType={false}>
                        <TextField source="name" />
                    </ReferenceField>
                    <DateField
                        source="updated_at"
                        cellClassName={classes.updatedAt}
                    />
                    <ReferenceField source="created_by" reference="users" linkType={false}>
                        <TextField source="name" />
                    </ReferenceField>
                    <FormListActionToolbar>
                        <ShowButton />
                        { permissions === 'manager' ? <EditButton/> : null}
                        { permissions === 'manager' ? <DeleteWithConfirmButton/> : null}
                    </FormListActionToolbar>
                </Datagrid>
            }
        />
    </List>
));

export default FormList;
