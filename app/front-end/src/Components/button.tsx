import React from "react";

interface buttonTypes {
  isDisabled: boolean;
  buttonText: string;
  buttonFunc: any;
}

function Button({ isDisabled, buttonText, buttonFunc }: buttonTypes) {
  return (
    <button
      disabled={ isDisabled }
      type="button"
      onClick={ buttonFunc }
      >{ buttonText }
    </button>
  )
}

export default Button;
