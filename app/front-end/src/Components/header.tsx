import React, { useContext } from 'react';
import ngLogo from '../Images/logo-ngcash-branco.88c5860.svg'
import Button from './button';
import { Link, useNavigate } from 'react-router-dom'

function Header() {

  const navigate = useNavigate()

  const handleLogout = () => {
      localStorage.removeItem('NGUser')
      navigate('/')
  }

  return (
    <header>
      <nav>
        <div>
          <img src={ ngLogo } alt="logo NG.Cash em cor branca." width={110}/>
        </div>
        <div>
          <ul>
            <li><Link to={'/'}>Inicio</Link></li>
            <li><Link to={'/'}>Carreira</Link></li>
            <li><Link to={'/'}>Ajuda</Link></li>
          </ul>
          <Button 
            isDisabled={ false }
            buttonText="Sair"
            buttonFunc={ handleLogout }
          />
        </div>
      </nav>
    </header>
  )
}

export default Header;