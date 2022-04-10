import { getAllUsers, getOneUsers } from "./../store/userReducer";

export const fetchOneUser = () => {
  const token = localStorage.getItem("userToken");

  return function (dispatch) {
    fetch(
        `https://sheltered-dusk-77313.herokuapp.com/users/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => response.json())
      .then((json) => dispatch(getOneUsers(json))
      );
  };
};