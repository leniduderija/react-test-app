import React, { InputHTMLAttributes } from "react";
import "./Input.css";
import cn from "classnames";
import withLogger from "services/hoc/withLogger";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputBase = ({ onChange, className, placeholder }: InputProps) => {
  return (
    <input
      className={cn("Input", className)}
      type="text"
      onChange={onChange}
      placeholder={placeholder}
      data-testid="Input"
    />
  );
};

export const Input = withLogger(InputBase);
