import * as ActionTypes from './actionTypes';
import { buildHandler, buildUpdatePath } from '../utils';

const initialState = {
    event: {
        data: {},
        loading: true,
        error: false,
        updated: 0
    },
    registration: {
        data: {},
        loading: true,
        error: false,
        updated: 0
    },
    team: {
        data: {},
        loading: true,
        error: false,
        updated: 0
    },
    profiles: {
        data: [],
        loading: true,
        error: false,
        updated: 0
    }
};

const updateEventHandler = buildHandler('event');
const updateRegistrationHandler = buildHandler('registration');
const updateTeamHandler = buildHandler('team');
const updateProfilesHandler = buildHandler('profiles');

const editRegistration = buildUpdatePath('registration.data');
const editTeam = buildUpdatePath('team.data');
const editProfiles = buildUpdatePath('profiles.data');

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_EVENT: {
            return updateEventHandler(state, action);
        }
        case ActionTypes.UPDATE_REGISTRATION: {
            return updateRegistrationHandler(state, action);
        }
        case ActionTypes.UPDATE_TEAM: {
            return updateTeamHandler(state, action);
        }
        case ActionTypes.UPDATE_PROFILES: {
            return updateProfilesHandler(state, action);
        }
        case ActionTypes.EDIT_REGISTRATION: {
            return editRegistration(state, action.payload);
        }
        case ActionTypes.EDIT_TEAM: {
            return editTeam(state, action.payload);
        }
        case ActionTypes.CLEAR_TEAM: {
            return editTeam(state, initialState.team.data);
        }
        case ActionTypes.EDIT_PROFILES: {
            return editProfiles(state, action.payload);
        }
        default:
            return state;
    }
}