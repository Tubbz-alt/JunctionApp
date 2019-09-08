import React from 'react';
import styles from './Account.module.scss';

import { connect } from 'react-redux';

import TabsLayout from 'components/layouts/TabsLayout';
import * as AuthSelectors from 'redux/auth/selectors';
import AccountNavBar from 'components/navbars/AccountNavBar';

import AccountDashboard from './AccountDashboard';

const AccountPage = ({ match, location }) => {
    return (
        <TabsLayout
            baseRoute={match.url}
            location={location}
            renderHeader={() => <AccountNavBar />}
            routes={[
                {
                    path: '',
                    label: 'Dashboard',
                    render: routeProps => <AccountDashboard />
                },
                {
                    path: '/preferences',
                    label: 'Preferences',
                    render: routeProps => (
                        <p className={styles.comingSoonText}>
                            <strong>Coming soon!</strong> Here you'll be able to edit your account details and manage your
                            privacy preferences. In the meantime, if you have anything to contact us about, don't
                            hesitate to shoot us an email at{' '}
                            <a href="mailto:hello@hackjunction.com">hello@hackjunction.com</a>
                        </p>
                    )
                },
                {
                    path: '/achievements',
                    label: 'Achievements',
                    render: routeProps => 
                        <p className={styles.comingSoonText}>
                            <strong>Coming soon!</strong> Here you'll be able to see your past performances, submitted projects and other achievements in Junction events.
                        </p>
                }
            ]}
        />
    );
};

const mapStateToProps = state => ({
    session: AuthSelectors.getSession(state)
});

export default connect(mapStateToProps)(AccountPage);