import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import SettingsIcon from '@material-ui/icons/Settings';
import { withRouter } from 'react-router-dom';
import {
    translate,
    DashboardMenuItem,
    MenuItemLink,
    Responsive,
} from 'react-admin';

import categories from '../categories';
import users from '../users';
import documents from '../documents';
import textentries from '../textentries';
import forms from '../forms';
import masterDocuments from '../master-documents';

class Menu extends Component {
    state = {
        menuArticles: false,
    };

    static propTypes = {
        onMenuClick: PropTypes.func,
        logout: PropTypes.object,
    };

    handleToggle = menu => {
        this.setState(state => ({ [menu]: !state[menu] }));
    };

    render() {
        const { onMenuClick, logout, translate } = this.props;
        return (
            <div>
                {' '}
                <DashboardMenuItem onClick={onMenuClick} />
                <MenuItemLink
                    to={`/master-documents`}
                    primaryText={translate(`resources.masterDocuments.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<masterDocuments.icon />}
                    onClick={onMenuClick}
                />
                <MenuItemLink
                    to={`/categories`}
                    primaryText={translate(`resources.categories.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<categories.icon />}
                    onClick={onMenuClick}
                />
                <MenuItemLink
                    to={`/documents`}
                    primaryText={translate(`resources.documents.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<documents.icon />}
                    onClick={onMenuClick}
                />
                <MenuItemLink
                    to={`/textentries`}
                    primaryText={translate(`resources.textentries.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<textentries.icon />}
                    onClick={onMenuClick}
                />
                <MenuItemLink
                    to={`/forms`}
                    primaryText={translate(`resources.forms.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<forms.icon />}
                    onClick={onMenuClick}
                />
                <MenuItemLink
                    to={`/users`}
                    primaryText={translate(`resources.users.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<users.icon />}
                    onClick={onMenuClick}
                />
                <Responsive
                    xsmall={
                        <MenuItemLink
                            to="/configuration"
                            primaryText={translate('pos.configuration')}
                            leftIcon={<SettingsIcon />}
                            onClick={onMenuClick}
                        />
                    }
                    medium={null}
                />
                <Responsive
                    small={logout}
                    medium={null} // Pass null to render nothing on larger devices
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
    theme: state.theme,
    locale: state.i18n.locale,
});

const enhance = compose(
    withRouter,
    connect(
        mapStateToProps,
        {}
    ),
    translate
);

export default enhance(Menu);
