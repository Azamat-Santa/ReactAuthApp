import { getAllUsers } from "./../store/userReducer";

export const fetchUsers = () => {
  const token = localStorage.getItem("userToken");

  return function (dispatch) {
    fetch(`https://sheltered-dusk-77313.herokuapp.com/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((json) => {
        const newUsers = json.users.map((user) => {
          return {
            key: user.id,
            id: user.id,
            email: user.email,
            name: user.name,
            age: user.age,
            role: user.role,
            status: user.status,
          };
        });
        dispatch(getAllUsers(newUsers));
      });
  };
};
