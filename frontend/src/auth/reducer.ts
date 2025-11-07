// src/auth/reducer.ts

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
    case 'LOGIN_FAIL':
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
