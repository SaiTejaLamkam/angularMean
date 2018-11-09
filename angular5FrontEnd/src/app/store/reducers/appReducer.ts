import { ACTION_LOGOUT, ACTION_LOGIN } from '../actions/appActions'

export interface appReducerState {
  login: boolean,
  user?: string
}

const initialState: appReducerState = {
  login: false
}


export function reducer(state = initialState, action): appReducerState {
  switch (action.type) {
    case ACTION_LOGOUT:
      return {
        ...state,
        login: false,
        user: null
      };
    case ACTION_LOGIN:
      return {
        ...state,
        login: true,
        ...action.payload
      };
  }

  return state;
};
