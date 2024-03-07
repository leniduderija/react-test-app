import React, { ButtonHTMLAttributes, MouseEvent } from "react";
import "./Button.css";
import cn from "classnames";
import withLogger from "services/hoc/withLogger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ButtonBase = ({
  onClick,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn("Button", className)}
      onClick={onClick}
      {...props}
      data-testid="Button"
    >
      {children}
    </button>
  );
};

export const Button = withLogger(ButtonBase);
