import React from "react";

interface inputTypes {
  inputType: string;
  inputName: string;
  inputValue: string;
  inputFunc: any;
  inputDescription?: string;
  inputClass?: string;
}

function Input({ inputType, inputName, inputValue, inputFunc, inputDescription, inputClass }: inputTypes) {
  return (
    <label 
      htmlFor={ inputName }
      className={ inputClass }
      >
      { inputName }
      <input
        type={ inputType }
        name={ inputName }
        id={ inputName }
        value={ inputValue }
        onChange={ inputFunc }
        
      />
      { inputDescription }
    </label>
  )
}

export default Input;
