import "./Divider.css";
import cn from "classnames";
import withLogger from "services/hoc/withLogger";

interface DividerProps {
  className?: string;
}

const DividerBase = ({ className }: DividerProps) => {
  return <div className={cn("Divider", className)} data-testid="Divider" />;
};

export const Divider = withLogger(DividerBase);
