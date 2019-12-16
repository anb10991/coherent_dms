import React, { Component } from 'react';
import { Responsive, withDataProvider } from 'react-admin';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { HomeCategoryList } from './HomeCategoryList';
import { HomeArticleList } from './HomeArticleList';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

class Dashboard extends Component {
    render() {
        return (
            <Responsive
                xsmall={
                    <div>
                        <div style={styles.flexColumn}>
                            <div style={{ marginBottom: '2em' }}>
                                <HomeCategoryList {...this.props} />
                                <HomeArticleList {...this.props} />
                            </div>
                        </div>
                    </div>
                }
                small={
                    <div style={styles.flexColumn}>
                        <div style={styles.singleCol}>
                            <HomeCategoryList {...this.props} />
                            <HomeArticleList {...this.props} />
                        </div>
                    </div>
                }
                medium={
                    <div style={styles.flex}>
                        <div style={styles.leftCol}>
                            <div style={styles.singleCol}>
                                <HomeCategoryList {...this.props} />
                            </div>
                        </div>
                        <div style={styles.leftCol}>
                            <div style={styles.singleCol}>
                                <HomeArticleList {...this.props} />
                            </div>
                        </div>
                    </div>
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    withDataProvider
)(Dashboard);
