/* eslint react/jsx-key: off */

import { withStyles } from '@material-ui/core/styles';
import React, { Children, cloneElement } from 'react';
import {
    BulkDeleteWithConfirmButton,
    Datagrid,
    DeleteWithConfirmButton,
    EditButton,
    EmailField,
    Filter,
    List,
    Responsive,
    SearchInput,
    ShowButton,
    SimpleList,
    TextField,
} from 'react-admin';

const UserFilter = props => (
    <Filter {...props}>
        <SearchInput source="search" alwaysOn />
    </Filter>
);

const UserBulkActionButtons = props => (
    ( props.permissions === 'manager' && <BulkDeleteWithConfirmButton {...props} />  )
);

const UserListActionToolbar = withStyles({
    toolbar: {
        alignItems: 'center',
        display: 'flex',
    },
})(({ classes, children, ...props }) => (
    <div className={classes.toolbar}>
        {Children.map(children, button => button && cloneElement(button, props))}
    </div>
));

const UserList = ({ permissions, ...props }) => (
    <List
        {...props}
        sort={{ field: 'username', order: 'ASC' }}
        bulkActionButtons={<UserBulkActionButtons />}
        filters={<UserFilter />}
    >
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => record.email}
                />
            }
            medium={
                <Datagrid rowClick="show">
                    <TextField source="username" />
                    <EmailField source="email" />
                    <TextField source="name" />
                    <TextField source="phone" />
                    <TextField source="occupation" />
                    {permissions === 'admin' && <TextField source="role" />}
                    <UserListActionToolbar>
                        <ShowButton />
                        { permissions === 'manager' && <EditButton/>}
                        { permissions === 'manager' && <DeleteWithConfirmButton/>}
                    </UserListActionToolbar>
                </Datagrid>
            }
        />
    </List>
);

export default UserList;
