import React, { useState, useEffect, useContext } from "react";
import Input from "../../../Components/input";
import Button from "../../../Components/button";
import { useNavigate } from "react-router-dom";
import { fetchCreateTransaction } from "../../../service/user";
import MyContext from "../../../Provider/MyContext";


function Pix() {
  const { setLogedIn } = useContext(MyContext);
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const  [value, setValue] = useState('')
  const [transactionSucess,setTransactionSucess] = useState(false)

  const handleClick = async () => {
    const user = await fetchCreateTransaction(username, value.replace(',','.'));
    if (!user.debitedAccountId) {
      setError(true)
      setErrorMsg(user)
    } else {
      setTransactionSucess(true)
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('NGUser')) {
      navigate('/')
    }
    if (localStorage.getItem('NGUser')) {
      setLogedIn(true)
    }
  }, [navigate, setLogedIn]);

  
  return (
    transactionSucess ? <h1 className="error_msg pix_area">Pix enviado com sucesso!</h1> :
      <section className="pix_area">
          <h1 className="pix_area_title">Area de transefencia:</h1>
        <div className="pix_area_inputs">
          {error ? <p>{errorMsg}</p> : null}
          <Input 
            inputName="Usuario"
            inputType="text"
            inputValue={ username }
            inputFunc={ (e: React.ChangeEvent<HTMLInputElement>) => {
              setError(false)
              setUsername(e.target.value)}}
          />
          <Input 
            inputName="valor"
            inputType="text"
            inputValue={ value }
            inputFunc={ (e: React.ChangeEvent<HTMLInputElement>) => {
              setError(false)
              setValue(e.target.value)}}
          />
          <Button
              isDisabled={false}
              buttonText="Enviar pix"
              buttonFunc={ handleClick }
          />
        </div>
      </section>
  )
}

export default Pix;
