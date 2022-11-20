import React, { useEffect, useState } from 'react';
import Input from '../../Components/input';
import Button from '../../Components/button';
import { Link, useNavigate } from 'react-router-dom'
import { fetchRegisterUser } from '../../service/user';

const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;

const minLenghtUsername = 3

function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [disabled, setDisabled] = useState(true)

  const handleClick = async () => {
    const user = await fetchRegisterUser(username, password);
    if (!user.username) {
      setError(true)
      setErrorMsg(user)
    } else {
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
          {error ? <p>{errorMsg}</p> : null}
          <Input
            inputName='Usuário:'
            inputType='text'
            inputValue={ username }
            inputFunc={ (e: React.ChangeEvent<HTMLInputElement>) => {
              setError(false)
              setUsername(e.target.value)}
            }
            inputDescription="username deve conter pelo menos 3 characteres."
          />
          <Input
            inputName='Senha:'
            inputType='text'
            inputValue={ password }
            inputFunc={ (e: React.ChangeEvent<HTMLInputElement>) => {
              setError(false)
              setPassword(e.target.value)}
            }
            inputDescription="Senha deve possuir uma letra maiuscula, um numero e ter pelo menos 8 characteres."
          />
          <Button
            isDisabled={disabled}
            buttonText="Register"
            buttonFunc={ handleClick }
          />
      </div>
    </section>
  )
}

export default Register;
