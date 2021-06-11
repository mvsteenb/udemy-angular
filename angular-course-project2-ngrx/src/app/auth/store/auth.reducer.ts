import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
}

const initialState: State = {
  user: null
}

export function authReducer(
  state = initialState,         // set default to initial state
  action: AuthActions.AuthActions
) { 

  switch(action.type) {
    case AuthActions.LOGIN : 
      const loginUser = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
      return {
        ...state,
        user : loginUser
      }
    case AuthActions.LOGOUT : 
      return {
        ...state,
        user : null
      }
    default: 
      return state;
  }

}