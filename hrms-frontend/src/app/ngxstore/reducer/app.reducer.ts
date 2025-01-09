// blockchain.reducer.ts

import { Notification } from '../../layout/common/notifications/notifications.types';
import { Action } from '@ngrx/store';
import { APP_ACTION } from '../actions/app.actions';

export function appReducer(state: any[] = [], action) {
    //console.log(action);
    switch (action.type) {
        case APP_ACTION.ADD_NOTIFI:
            return [...state, action];
        case APP_ACTION.REMOVE_NOTIFI:
            return [action];
        case APP_ACTION.USER_INFO:
            return [action];
        default:
            return state;
    }
}

export function userReducer(state: any, action) {
    //console.log(action);
    switch (action.type) {
        case APP_ACTION.USER_INFO:
            return action;
        default:
            return state;
    }
}
