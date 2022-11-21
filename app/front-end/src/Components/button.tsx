import React from "react";

interface buttonTypes {
  isDisabled: boolean;
  buttonText: string;
  buttonFunc: any;
  buttonClass?: string;
  buttonValue?: string;
}

function Button({ isDisabled, buttonText, buttonFunc, buttonClass, buttonValue }: buttonTypes) {
  return (
    <button
      disabled={ isDisabled }
      type="button"
      onClick={ buttonFunc }
      value={ buttonValue }
      className={ buttonClass }
      >{ buttonText }
    </button>
  )
}

export default Button;
