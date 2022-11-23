import React, { useContext } from 'react';
import ngLogo from '../Images/logo-ngcash-branco.88c5860.svg'
import Button from './button';
import { Link, useNavigate } from 'react-router-dom'
import MyContext from '../Provider/MyContext';

function Header() {
  const  { logedIn, setLogedIn } = useContext(MyContext);
  
  const navigate = useNavigate()

  const handleLogout = () => {
      localStorage.removeItem('NGUser')
      setLogedIn(false)
      navigate('/')
  }

  return (
    <header>
      <nav>
        <div>
          <div>
            <Link to={'/'}><img src={ ngLogo } alt="logo NG.Cash em cor branca." width={90}/></Link>
          </div>
          <div>
            <ul>
              <li><Link to={'/'}>Inicio</Link></li>
            </ul>
          </div>
        </div>
          { logedIn ? (
            <Button 
            isDisabled={ false }
            buttonText="Sair"
            buttonFunc={ handleLogout }
            buttonClass="logout_button"
          />
          ) : null }
      </nav>
    </header>
  )
}

export default Header;