import React, { useState, useEffect } from 'react';
import Input from '../../Components/input';
import Button from '../../Components/button';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUser } from '../../service/user';
import '../Login/style.css'

const minLenghtPassword = 8

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [disabled, setDisabled] = useState(true)


  const handleClick = async () => {
    const user = await fetchUser(username, password);
    if (!user.username) {
      setError(true)
      setErrorMsg(user)
    } else {
      navigate('/user/dashboard')
      localStorage.setItem('NGUser', JSON.stringify(user))
    }
  } 

  useEffect(() => {
    if (!localStorage.getItem('NGUser')) {
      navigate('/')
    }
    if (localStorage.getItem('NGUser')) {
      navigate('/user/dashboard')
    }
  }, [navigate])

  useEffect(() => {
    if (password.length >= minLenghtPassword) setDisabled(false)
  }, [password])

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
          />
          <Input
            inputName='Senha:'
            inputType='text'
            inputValue={ password }
            inputFunc={ (e: React.ChangeEvent<HTMLInputElement>) => {
              setError(false)
              setPassword(e.target.value)}
            }
          />
          <Button
            isDisabled={disabled}
            buttonText="Login"
            buttonFunc={ handleClick }
          />
          <div>
            <p><Link to={'/register'}>Ainda não tem uma conta? clique aqui!</Link></p>
          </div>
      </div>

    </section>
  )
}

export default Login;
