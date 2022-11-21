import React, { useEffect, useState } from 'react';
import ngLogo from '../Images/logo-ngcash-branco.88c5860.svg'
import Button from './button';
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const [logedIn, setLogedIn] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('NGUser')) {
      setLogedIn(true)
    } else {
      setLogedIn(false)
    }
  }, [])

  const handleLogout = () => {
      localStorage.removeItem('NGUser')
      navigate('/')
  }

  return (
    <header>
      <nav>
        <div>
          <Link to={'/'}><img src={ ngLogo } alt="logo NG.Cash em cor branca." width={110}/></Link>
        </div>
        <div>
          <ul>
            <li><Link to={'/'}>Inicio</Link></li>
            <li><Link to={'/'}>Carreira</Link></li>
            <li><Link to={'/'}>Ajuda</Link></li>
          </ul>
          { logedIn ? (
            <Button 
            isDisabled={ false }
            buttonText="Sair"
            buttonFunc={ handleLogout }
          />
          ) : null }
        </div>
      </nav>
    </header>
  )
}

export default Header;