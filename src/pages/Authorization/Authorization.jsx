import React from "react";
import useInput from "./../../component/customHookInput";
import { useState } from "react";
import Loader from "./../../component/Loader";
import Modal from "../../component/Modal";
import { Button, Input } from "antd";

const Authorization = ({modalActive, setModalActive}) => {
  const [loading, setLoading] = useState(false);
  const [errorFindUser,setErrorFindUser] = useState(false)
  const [errorPassword, setErrorPassword] =useState(false)

  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 4, maxLength: 16 });

  const authentication = async (e,options) => {
      e.preventDefault()
    const response = await fetch(
        "https://sheltered-dusk-77313.herokuapp.com/auth/signin",
        {
          method: "POST",
          body: JSON.stringify(options),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );
      setLoading(false);
      const data = await response.json()
      localStorage.setItem('userToken', data.token)
      console.log(data);
      console.log(response);
      if(data.message === 'Пользователь с такой почтой не найден'){
        setErrorFindUser('Пользователь с такой почтой не найден')
      }
      if(data.message === 'Некорректный пароль'){
        setErrorPassword('Некорректный пароль')
      }
      if(response.status === 201){
        setErrorFindUser('')
        setErrorPassword('')
        setModalActive(true)
      }
      
  };

  return (
    <div className="auth">
    <Modal modalActive={modalActive} setModalActive={setModalActive} text='Вы успешно авторизованы!!!' auth={true}/>
      <form action="">
        <h1>Авторизация</h1>
        {email.isDirty && email.isEmpty && (
          <div className="error"> поле не может быть пустым </div>
        )}
        {email.isDirty && email.emailError && (
          <div className="error"> некорректный email </div>
        )}
        {email.isDirty && errorFindUser && (
          <div className="error"> {errorFindUser}</div>
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
        {password.isDirty && errorPassword && (
          <div className="error"> {errorPassword} </div>
        )}
        <Input
          value={password.value}
          onChange={(e) => password.onChange(e)}
          onBlur={(e) => password.onBlur(e)}
          type="password"
          placeholder="password"
        />
        <button
          onClick={(e) => {
            authentication(e, {
              email: email.value,
              password: password.value,
            });
            setLoading(true)

          }}
          disabled={!email.formValid || !password.formValid}
        >
          {loading ? <Loader /> : "Авторизация"}
        </button>
      </form>
    </div>
  );
};

export default Authorization;
