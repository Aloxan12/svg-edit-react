import React, { useState } from 'react';

interface InputProps {
  type: string;
  defaultValue: string;
  handleChange: (name: string, value: string) => void;
  name: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ type, defaultValue, handleChange, name, disabled }) => {
  const [value, setValue] = useState<string>(defaultValue);

  return (
      <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => handleChange(name, e.target.value)}
          type={type}
          name={name}
          disabled={disabled}
      />
  );
};

export default Input;