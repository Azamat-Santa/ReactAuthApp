const defaultState = {
    users: [],
    user:{}
  };

export const GET_ALL_USERS ='GET_ALL_USERS'
export const GET_ONE_USERS ='GET_ONE_USERS'

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
     
      case GET_ALL_USERS:
        return { ...state, users: [...state.users, ...action.payload] };
      case GET_ONE_USERS:
        return { ...state, user: {...state.user, ...action.payload}};
      default:
        return state;
    }
  };

export const getAllUsers = (payload)=>({type:GET_ALL_USERS , payload})
export const getOneUsers = (payload)=>({type:GET_ONE_USERS , payload})