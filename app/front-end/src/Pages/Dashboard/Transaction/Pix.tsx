import React, { useState } from "react";
import Input from "../../../Components/input";
import Button from "../../../Components/button";
// import { useNavigate } from "react-router-dom";
import { fetchCreateTransaction } from "../../../service/user";


function Pix() {
  // const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const  [value, setValue] = useState('')
  // const [disabled, setDisabled] = useState(true)
  const [transactionSucess,setTransactionSucess] = useState(false)

  const handleClick = async () => {
    const user = await fetchCreateTransaction(username, value);
    if (!user.debitedAccountId) {
      setError(true)
      setErrorMsg(user)
    } else {
      setTransactionSucess(true)
    }
  } 

  
  return (
    transactionSucess ? <h1>Pix enviado com sucesso!</h1> :
      <section>
        <div>
          <h1>Area de transefencia:</h1>
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
