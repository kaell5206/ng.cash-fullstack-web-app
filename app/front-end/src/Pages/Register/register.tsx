import React, { useContext, useEffect, useState } from 'react';
import Input from '../../Components/input';
import Button from '../../Components/button';
import { useNavigate } from 'react-router-dom'
import { fetchRegisterUser } from '../../service/user';
import MyContext from '../../Provider/MyContext';
import registerImg from '../../Images/todasidades.92fe90f.svg'
import './style.css';
import { IUser } from '../../Interfaces/IUser';

const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;

const minLenghtUsername = 3

function Register() {
  const navigate = useNavigate()
  const { setLogedIn } = useContext(MyContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [disabled, setDisabled] = useState(true)

  const handleClick = async (): Promise<void | React.Dispatch<React.SetStateAction<IUser |string>>> => {
    const user = await fetchRegisterUser(username, password);
    if (!user.username) {
      setError(true)
      setErrorMsg(user as string)
    } else {
      setLogedIn(true)
      localStorage.setItem('NGUser', JSON.stringify(user))
      navigate('/user/dashboard')
    }
  } 

  useEffect(() => {
    if (username.length >= minLenghtUsername && regexPassword.test(password)) {
      setDisabled(false)
    } else {
      setErrorMsg("Campos invalidos.")
    }
  }, [password, username.length])

  return (
    <section className="login_section">
      <div className='login_area'>
          <div>
          {error ? <p>{errorMsg}</p> : null}
          <Input
            inputName='Usuário:'
            inputType='text'
            inputValue={ username }
            inputFunc={ (e: React.ChangeEvent<HTMLInputElement>) => {
              setError(false)
              setUsername(e.target.value)}
            }
            inputClass="register_label"
            inputDescription="username deve conter pelo menos 3 characteres."
          />
          <Input
            inputName='Senha:'
            inputType='password'
            inputValue={ password }
            inputFunc={ (e: React.ChangeEvent<HTMLInputElement>) => {
              setError(false)
              setPassword(e.target.value)}
            }
            inputClass="register_label"
            inputDescription="Senha deve possuir uma letra maiuscula, um numero e ter pelo menos 8 characteres."
          />
          <Button
            isDisabled={disabled}
            buttonText="Register"
            buttonFunc={ handleClick }
            buttonClass="button_login"
          />
          </div>
      </div>
      <div className='app_area regiter_content'>
        <div className='login_text_area register_texts'>
        <h1>PARA TODAS AS IDADES</h1>
        <p>Abra a sua conta independente da sua idade.</p>
        <p>Nunca é cedo para começar.</p>
        </div>
        <div className='login_images_area register_images'>
          <img className="img_phone" src={ registerImg } alt="imagem de um celular com uma interface do app NG.Cash"/>
        </div>
      </div>
    </section>
  )
}

export default Register;
