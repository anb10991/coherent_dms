import React, {Component, Fragment} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';

import {
    Datagrid,
    DateField,
    List,
    ReferenceField,
    Responsive,
    SimpleList,
    TextField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const redirect = (id, basePath, record) => ({
    pathname: (record.article_type === 'textentry' ? `/textentries/${id}/show` : `/documents/${id}/show`)
})

export class HomeArticleList extends Component {
    render() {
        return  <Card>
                    <CardHeader title="Top Articles" />
                    <CardContent>
                        <Paper>
                            <List
                                basePath='/articles'
                                location = {this.props.location}
                                match = {this.props.match}
                                hasCreate={false}
                                hasList={false}
                                hasEdit={false}
                                hasShow={false}
                                resource="articles"
                                bulkActionButtons={false}
                                exporter={false}
                                pagination={<Fragment></Fragment>}
                                sort={{ field: 'name', order: 'ASC' }}
                                filter={{is_homepage: true, is_active: true}}
                            >
                                <Responsive
                                    small={
                                        <SimpleList
                                            primaryText={record => record.name}
                                            tertiaryText={record =>
                                                new Date(record.created_at).toLocaleDateString()
                                            }
                                            linkType={redirect}
                                        />
                                    }
                                    medium={
                                        <Datagrid rowClick={redirect}>
                                            <TextField source="name" />
                                            <DateField source="created_at" />
                                            <ReferenceField source="created_by" reference="users" linkType={false}>
                                                <TextField source="name" />
                                            </ReferenceField>
                                        </Datagrid>
                                    }
                                />
                            </List>
                        </Paper>
                    </CardContent>
                </Card>
    };
};