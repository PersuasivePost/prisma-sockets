//Hello World

import React from "react";

interface InputProps {
  placeholder: string;
  className: string;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export default function Input(props: InputProps) {
  let { name, placeholder, className, handleInput } = props;

  return (
    <div className={className}>
      <input
        name={name}
        onChange={handleInput}
        className={className}
        placeholder={placeholder}
      />
      {/* <input className="input-field" placeholder={placeholder} /> */}
    </div>
  );
}
