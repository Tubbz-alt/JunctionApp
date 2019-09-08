import React, { useEffect } from 'react';
import styles from './EventDashboard.module.scss';

import { connect } from 'react-redux';
import SidebarLayout from 'components/layouts/SidebarLayout';
import Image from 'components/generic/Image';
import EventNavBar from 'components/navbars/EventNavBar/index';

import EventDashboardHome from './EventDashboardHome';
import EventDashboardTeam from './EventDashboardTeam';

import * as AuthSelectors from 'redux/auth/selectors';
import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as DashboardActions from 'redux/dashboard/actions';

const EventDashboard = ({
    match,
    location,
    updateEvent,
    updateRegistration,
    updateTeam,
    updateProfiles,
    event,
    team
}) => {
    const { slug } = match.params;

    /** Update event if slug changes */
    useEffect(() => {
        updateEvent(slug);
    }, [slug, updateEvent]);

    /** Update registration if slug changes */
    useEffect(() => {
        updateRegistration(slug);
    }, [slug, updateRegistration]);

    /** Update team if slug changes */
    useEffect(() => {
        updateTeam(slug);
    }, [slug, updateTeam]);

    /** Update team member profiles if team changes */
    useEffect(() => {
        updateProfiles(team);
    }, [team, updateProfiles]);

    return (
        <SidebarLayout
            theme="light"
            baseRoute={match.url}
            location={location}
            renderSidebarTop={collapsed => {
                if (collapsed) return null;
                return (
                    <div className={styles.sidebarTop}>
                        <Image
                            className={styles.sidebarLogo}
                            publicId={event.logo ? event.logo.publicId : ''}
                            transformation={{
                                width: 200
                            }}
                        />
                    </div>
                );
            }}
            renderTop={() => <EventNavBar />}
            routes={[
                {
                    path: '',
                    icon: 'home',
                    label: 'Dashboard',
                    render: () => <EventDashboardHome />
                },
                {
                    path: '/team',
                    icon: 'team',
                    label: 'Team',
                    render: () => <EventDashboardTeam />
                }
            ]}
        />
    );
};

const mapStateToProps = state => ({
    idToken: AuthSelectors.getIdToken(state),
    event: DashboardSelectors.event(state),
    eventLoading: DashboardSelectors.eventLoading(state),
    eventError: DashboardSelectors.eventError(state),
    team: DashboardSelectors.team(state)
});

const mapDispatchToProps = dispatch => ({
    updateEvent: slug => dispatch(DashboardActions.updateEvent(slug)),
    updateRegistration: slug => dispatch(DashboardActions.updateRegistration(slug)),
    updateTeam: slug => dispatch(DashboardActions.updateTeam(slug)),
    updateProfiles: team => dispatch(DashboardActions.updateProfiles(team))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventDashboard);