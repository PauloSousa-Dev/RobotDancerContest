import { PropsWithChildren } from "react";
import styles from "./style.module.scss";

type ButtonTypes = PropsWithChildren & {
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary";

  size: "small" | "medium" | "large";
};
const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "medium",
  ...props
}: ButtonTypes) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        styles.btn,
        styles[`btn-${variant}`],
        styles[`btn-${size}`],
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
