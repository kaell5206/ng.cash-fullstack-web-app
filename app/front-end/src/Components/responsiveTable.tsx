import React from "react";

interface IResponCard {
  debited: string;
  credited: string;
  value: string;
  date: string;
  responClass: string;
}

function ResponsiveTable({ debited, credited, value, date, responClass }: IResponCard) {
  return (
    <div className={ responClass }>
      <div className="respon_row"><p>Enviou:</p><p>{debited}</p></div>
      <div className="respon_row"><p>Valor:</p><p>{value}</p></div>
      <div className="respon_row"><p>para:</p><p>{credited}</p></div>
      <div className="respon_row"><p>Data:</p><p>{date}</p></div>
    </div>
  )
}

export default ResponsiveTable;