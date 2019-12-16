import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';

import './App.css';

import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import customRoutes from './routes';

import authProvider from './authProvider';
import { Dashboard } from './dashboard';
import dataProvider from './dataProvider';
import i18nProvider from './i18nProvider';
import { reducer as tree } from 'ra-tree-ui-materialui';

import UserIcon from '@material-ui/icons/People';
import UserCreate from './users/UserCreate';
import UserEdit from './users/UserEdit';
import UserList from './users/UserList';
import UserShow from './users/UserShow';

import CategoryIcon from '@material-ui/icons/Dns';
import CategoryCreate from './categories/CategoryCreate';
import CategoryEdit from './categories/CategoryEdit';
import CategoryList from './categories/CategoryList';
import CategoryShow from './categories/CategoryShow';

import DocumentIcon from '@material-ui/icons/AttachFile';
import DocumentCreate from './documents/DocumentCreate';
import DocumentEdit from './documents/DocumentEdit';
import DocumentList from './documents/DocumentList';
import DocumentShow from './documents/DocumentShow';

import FormIcon from '@material-ui/icons/Assignment';
import FormCreate from './forms/FormCreate';
import FormEdit from './forms/FormEdit';
import FormList from './forms/FormList';
import FormShow from './forms/FormShow';

import RevisionCreate from './revisions/RevisionCreate';
import RevisionShow from './revisions/RevisionShow';
import RevisionEdit from './revisions/RevisionEdit';

import TextEntryIcon from '@material-ui/icons/Edit';
import TextEntryCreate from './textentries/TextEntryCreate';
import TextEntryEdit from './textentries/TextEntryEdit';
import TextEntryList from './textentries/TextEntryList';
import TextEntryShow from './textentries/TextEntryShow';

import MasterDocumentIcon from './master-documents/MasterDocumentList';
import MasterDocumentList from './master-documents/MasterDocumentList';

class App extends Component {

    render() {
        return (
            <Admin
                authProvider={authProvider}
                dataProvider={dataProvider}
                i18nProvider={i18nProvider}
                customReducers={{ theme: themeReducer, tree: tree }}
                customRoutes={customRoutes}
                dashboard={Dashboard}
                loginPage={Login}
                appLayout={Layout}
                title="Coherent DMS"
                locale="en"
            >
                {permissions => [
                    <Resource name="users" 
                        list={UserList} 
                        show={UserShow}
                        icon={UserIcon}
                        edit={permissions === 'manager' ? UserEdit : null}
                        create={permissions === 'manager' ? UserCreate: null}/>,
                    <Resource name="master-documents"
                        list={MasterDocumentList}
                        icon={MasterDocumentIcon} />,
                    <Resource name="categories"
                        list={CategoryList}
                        show={CategoryShow}
                        icon={CategoryIcon}
                        edit={permissions === 'manager' ? CategoryEdit : null}
                        create={permissions === 'manager' ? CategoryCreate : null} />,
                    <Resource name="revisions"
                        show={RevisionShow}
                        create={permissions === 'manager' ? RevisionCreate : null}
                        edit={permissions === 'manager' ? RevisionEdit : null}
                         />,
                    <Resource name="documents"
                        list={DocumentList}
                        show={DocumentShow}
                        icon={DocumentIcon}
                        create={permissions === 'manager' ? DocumentCreate : null}
                        edit={permissions === 'manager' ? DocumentEdit : null} />,
                    <Resource name="textentries"
                        list={TextEntryList}
                        show={TextEntryShow}
                        icon={TextEntryIcon}
                        create={permissions === 'manager' ? TextEntryCreate : null}
                        edit={permissions === 'manager' ? TextEntryEdit : null } />,
                    <Resource name="forms"
                        list={FormList}
                        show={FormShow}
                        icon={FormIcon}
                        create={permissions === 'manager' ? FormCreate : null}
                        edit={permissions === 'manager' ? FormEdit : null} />,
                    <Resource name="articles" />,
                ]}
            </Admin>
        );
    }
}

export default App;
