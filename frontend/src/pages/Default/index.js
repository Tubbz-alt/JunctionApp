import React, { Component, useEffect } from 'react';
import styles from './DefaultPage.module.scss';

import { connect } from 'react-redux';
import * as AuthSelectors from 'redux/auth/selectors';
import * as AuthActions from 'redux/auth/actions';
import * as EventActions from 'redux/events/actions';
import * as EventSelectors from 'redux/events/selectors';

import Divider from 'components/generic/Divider';
import LineDivider from 'components/generic/LineDivider/';
import ExternalLink from 'components/generic/ExternalLink';
import Footer from 'components/Footer';
import PageWrapper from 'components/PageWrapper';

import EventHighlight from './EventHighlight';
import EventsGrid from './EventsGrid';
import CenteredContainer from 'components/generic/CenteredContainer';
import GlobalNavBar from 'components/navbars/GlobalNavBar';

const DefaultPage = ({ updateEvents }) => {
    useEffect(() => {
        updateEvents();
    }, [updateEvents]);

    return (
        <PageWrapper
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <div className={styles.wrapper}>
                    <Divider size={1} />
                    <EventHighlight />
                    <Divider size={2} />
                    <CenteredContainer>
                        <EventsGrid />
                    </CenteredContainer>
                    <Divider size={2} />
                    <CenteredContainer>
                        <LineDivider />
                        <Divider size={1} />
                        <h2>New to Junction?</h2>
                        <p>
                            More info about Junction can be found from our website{' '}
                            <ExternalLink href="https://hackjunction.com"> here</ExternalLink>
                        </p>
                        <Divider size={5} />
                    </CenteredContainer>
                </div>
            )}
        />
    );
};

const mapDispatchToProps = dispatch => ({
    updateEvents: () => dispatch(EventActions.updateEvents())
});

export default connect(
    null,
    mapDispatchToProps
)(DefaultPage);