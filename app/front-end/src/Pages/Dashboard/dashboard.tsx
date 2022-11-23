import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../Components/card";
import { fetchTransactionHistory, fetchUserBalance, fetchUserValidation } from "../../service/user";
import iconePix from '../../Images/icone-pix.svg'
import '../Dashboard/style.css'
import { ITransaction } from "../../Interfaces/ITransaction";
import { IUser } from "../../Interfaces/IUser";
import Button from "../../Components/button";
import MyContext from "../../Provider/MyContext";
import ResponsiveTable from "../../Components/responsiveTable";

function Dashboard() {
  const navigate = useNavigate()
  const { setLogedIn } = useContext(MyContext);
  const [userBalance, setUserBalance] = useState(0)
  const [history, setHistory] = useState<ITransaction[]>([]);
  const [filter, setFilter] = useState('');

  const getBalance = useCallback(async () => {
    const data =  await fetchUserBalance();
    if (!data.balance) {
      setUserBalance(data);
    } else {
      setUserBalance(data.balance)
    }
  }, [])

  const validateUser = useCallback(async () => {
    const validate = await fetchUserValidation(navigate);
    if (!validate) return null
    return validate
}, [navigate])

  useEffect(() => {
    validateUser()
    getBalance()
  }, [navigate, validateUser, getBalance])

  useEffect(() => {
    if (!localStorage.getItem('NGUser')) {
      navigate('/')
    }
    if (localStorage.getItem('NGUser')) {
      setLogedIn(true)
      navigate('/user/dashboard')
    }
  }, [navigate, setLogedIn])

  useEffect(() => {
    const get = async () => { 
      const get = await fetchTransactionHistory() 
      if (get.length <= 0) return "Nenhuma transação encontrada."
      setHistory(get.slice().reverse())
    }
    get()
  }, [])

  const getUserName = (): IUser | string => {
    const local = localStorage.getItem('NGUser')
    if (!local) return "User"
    return JSON.parse(local).username;
  } 

  const formatDate = (date: string) => {
    const dateSplit = date.split('T');
    return `${dateSplit[0].split('-').reverse().join('/')} as ${dateSplit[1].split('.')[0]}`
  }

  const renderTransactions = (): ITransaction[] => {
    const local = localStorage.getItem('NGUser')
    const oldArr = history;
    if (local) {
      const { accountId } = JSON.parse(local);
      const cashInArr = oldArr.filter(itm => itm.creditedAccountId === accountId);
      const cashOutArr = oldArr.filter(itm => itm.debitedAccountId === accountId);
      if (filter === "cashIn") return cashInArr;
      if (filter === "cashOut")  return cashOutArr;
      if (filter === "data") {
        return oldArr.slice().reverse()
      }
      if (filter === "limpar") return oldArr;
    }
    return oldArr;
  }

  return (
    <>
    <section className="user_area">
      <h1 className="user_area_h1">{`Bem vindo de volta ${ getUserName() }`}</h1>
      <div className="user_Balance_card">
        <h1>{ `R$ ${String(userBalance).replace('.',',')}` }</h1>
      </div>
      <div>
        <Card
          cardText="Pix" 
          imgAlt="icone Pix"
          imgUrl={ iconePix }
          imgTrue
          cardClass="card_body welcome"
        />
      </div>
      <div>
        <Card
          cardText="Meu NG.plus"
          cardInsideText="NG+"
          imgTrue={true}
          cardClass="card_body "
        />
      </div>
      <div className="exemplo_card2">
        <Card
          cardText="Card Exemplo"
          cardInsideText=""
          imgTrue={false}
          cardClass="card_body"
        />
      </div>
      <div className="span-2">
        <Card
          cardText="Card Exemplo"
          cardInsideText=""
          imgTrue={false}
          cardClass="card_body"
        />
      </div>
    </section>
    <section className="user_history">
        <div className="user_table_area">
        <h1 className="user_area_h1">Historico</h1>
        <div>
          <p>Filtrar por: </p>
          <div className="user_history_filters">
            <Button
              buttonText="Limpar filtros" 
              isDisabled={false}
              buttonFunc={ (e: React.ChangeEvent<HTMLButtonElement> ) => setFilter(e.target.value) }
              buttonClass="user_area_h1"
              buttonValue="limpar"
            />
            <Button
              buttonText="Cash in" 
              isDisabled={false}
              buttonFunc={ (e: React.ChangeEvent<HTMLButtonElement> ) => setFilter(e.target.value) }
              buttonClass="user_area_h1"
              buttonValue="cashIn"
            />
            <Button
            buttonText="Cash out"
            isDisabled={false}
            buttonFunc={ (e: React.ChangeEvent<HTMLButtonElement> ) => setFilter(e.target.value) }
            buttonClass="user_area_h1"
            buttonValue="cashOut"
            />
            <Button
              buttonText="Data da transação" 
              isDisabled={false}
              buttonFunc={ (e: React.ChangeEvent<HTMLButtonElement> ) => setFilter(e.target.value) }
              buttonClass="user_area_h1"
              buttonValue="data"
            />
          </div>
        </div>
        { renderTransactions().map(item => (
          <ResponsiveTable
            credited={item.credited.username}
            debited={item.debited.username}
            date={formatDate(item.createdAt)}
            value={item.value}
            responClass="responsive_table"
          />
        ))}
        <table className="user_table">
          <thead>
            <tr>
              <th>enviou</th>
              <th>valor</th>
              <th>para</th>
              <th>em</th>
            </tr>
          </thead>
          <tbody>
            {renderTransactions().map(itm => (
              <tr key={itm.id} className="table_row">
              <th>{itm.debited.username}</th>
              <th>{`R$ ${itm.value}`}</th>
              <th>{itm.credited.username}</th>
              <th>{ formatDate(itm.createdAt) }</th>
            </tr>
            ))}
          </tbody>
        </table>
        </div>
      </section>
    </>
  )
}

export default Dashboard;
