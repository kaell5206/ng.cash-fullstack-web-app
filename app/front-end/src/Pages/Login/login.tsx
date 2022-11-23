import React, { useState, useEffect, useContext } from 'react';
import Input from '../../Components/input';
import Button from '../../Components/button';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUser } from '../../service/user';
import '../Login/style.css'
import MyContext from '../../Provider/MyContext';
import phoneImg from '../../Images/home-ngcash-app.49e176e.png';
import google from '../../Images/googleplay.a58a8ba.png';
import apple from '../../Images/appstore.a23ac7c.png';

const minLenghtPassword = 8

function Login() {

  const { setLogedIn } = useContext(MyContext);
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [disabled, setDisabled] = useState(true)



  const handleClick = async () => {
    const user = await fetchUser(username, password);
    if (!user.username) {
      setError(true);
      setErrorMsg(user);
    } else {
      setLogedIn(true);
      navigate('/user/dashboard');
      localStorage.setItem('NGUser', JSON.stringify(user));
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
    if (password.length >= minLenghtPassword) {setDisabled(false) } else {
      setDisabled(true)
    }
  }, [password])

  return (
    <section className="login_section">
      <div className='app_area'>
        <div className='login_text_area'>
        <h1>A CARTEIRA DA NOVA GERAÇÃO.</h1>
        <p>É para todas as idades!</p>
        </div>
        <div className='login_images_area'>
          <img src={ phoneImg } alt="imagem de um celular com uma interface do app NG.Cash" width={344} />
          <div className='appstore_div'>
          <Link target="_blank" to='https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.neaglebank&hl=en&utm_source=site&utm_campaign=download-app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
          <img src={google} alt="imagem do botão da play store" width={150}/>
          </Link>
          <Link target="_blank" to="https://itunes.apple.com/app/id1480105326">
          <img src={apple} alt="imagem do botão da apple store"  width={150}/>
          </Link>
          </div>
        </div>
      </div>
      <div className='login_area'>
          <div>
          {error ? <p className='error_msg'>{errorMsg}</p> : null}
          <Input
            inputName='Usuário:'
            inputType='text'
            inputValue={ username }
            inputFunc={ (e: React.ChangeEvent<HTMLInputElement>) => {
              setError(false)
              setUsername(e.target.value)}
            }
            inputClass="login_area_input"
          />
          <Input
            inputName='Senha:'
            inputType='password'
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
            buttonClass="button_login"
          />
          <div className='register_link_div'>
            <p><Link to={'/register'}>Ainda não tem uma conta? clique aqui!</Link></p>
          </div>
          </div>
      </div>
    </section>
  )
}

export default Login;
