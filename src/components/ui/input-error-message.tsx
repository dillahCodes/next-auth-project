import clsx from "clsx";

interface InputFieldErrorMessageProps {
  message: string | null;
  className?: string;
}

const InputFieldErrorMessage: React.FC<InputFieldErrorMessageProps> = ({ message, className }) => {
  if (!message) return null;
  return (
    <p
      className={clsx("text-sm", className, {
        "text-red-500": !className,
      })}
    >
      {message}
    </p>
  );
};

export default InputFieldErrorMessage;
