import { Input, Spin } from "antd";
import React, { useState } from "react";
import useInput from "../../component/customHookInput";
import Modal from "../../component/Modal";

const Registration = ({modalActive,setModalActive}) => {
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 4, maxLength: 16 });
  const name = useInput("", { isEmpty: true });
  const age = useInput("", { isEmpty: true });

  const registration = async (e, options) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://sheltered-dusk-77313.herokuapp.com/auth/signup",
        {
          method: "POST",
          body: JSON.stringify(options),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );
      if (response.status === 400) {
        setUserExists(true);
        setLoading(false);
      } else {
        setUserExists(false);
      }
      if (response.status === 201) {
        setModalActive(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.status);
    }
  };
  return (
    <div className="auth">
      <Modal modalActive={modalActive} setModalActive={setModalActive} text='Вы успешно зарегистрированы!!!' />
      <form action="">
        <h1>Регистрация</h1>

        {email.isDirty && email.isEmpty && (
          <div className="error"> поле не может быть пустым </div>
        )}
        {email.isDirty && email.emailError && (
          <div className="error"> некорректный email </div>
        )}
        {email.isDirty && userExists && (
          <div className="error"> Пользователь уже существует </div>
        )}
        <Input
          value={email.value}
          onChange={(e) => email.onChange(e)}
          onBlur={(e) => email.onBlur(e)}
          type="text"
          placeholder="email"
        />
        {password.isDirty && password.isEmpty && (
          <div className="error"> поле не может быть пустым </div>
        )}
        {password.isDirty && password.minLengthError && (
          <div className="error"> пароль должен быть больше 4 </div>
        )}
        {password.isDirty && password.maxLengthError && (
          <div className="error"> пароль должен быть меньше 16 </div>
        )}
        <Input
          value={password.value}
          onChange={(e) => password.onChange(e)}
          onBlur={(e) => password.onBlur(e)}
          type="password"
          placeholder="password"
        />
        {name.isDirty && name.isEmpty && (
          <div className="error"> поле не может быть пустым </div>
        )}
        <Input
          value={name.value}
          onChange={(e) => name.onChange(e)}
          onBlur={(e) => name.onBlur(e)}
          type="text"
          placeholder="name"
        />
        {age.isDirty && age.isEmpty && (
          <div className="error"> поле не может быть пустым </div>
        )}
        <Input
          value={age.value}
          onChange={(e) => age.onChange(e)}
          onBlur={(e) => age.onBlur(e)}
          type="number"
          placeholder="age"
        />
        <button
        
          onClick={(e) => {
            registration(e, {
              email: email.value,
              password: password.value,
              name: name.value,
              age: Number(age.value),
            });
            setLoading(true);
          }}
          disabled={
            !email.formValid ||
            !password.formValid ||
            !name.formValid ||
            !age.formValid
          }
        >
          {loading ? <Spin /> : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
};

export default Registration;
