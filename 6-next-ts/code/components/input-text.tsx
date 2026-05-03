import React, {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useId,
} from "react";

type InputTextProps<T> = {
  title: string;
  htmlId: keyof T;
  req: T;
  setReq: Dispatch<SetStateAction<T>>;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputText = <T extends object>(props: InputTextProps<T>) => {
  const { title, htmlId, req, setReq, className, ...rest } = props;
  const generatedId = useId();
  const inputId = `${String(htmlId)}-${generatedId}`;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setReq((prev) => ({
      ...prev,
      [htmlId]: value,
    }));
  };
  return (
    <div className="p-3">
      <label htmlFor={inputId} className="block mb-2 text-lg">
        {title}
      </label>
      <input
        type="text"
        id={inputId}
        className={`border-1 border-slate-300 p-2 rounded w-full capitalize focus:outline-none focus:border-2 ${className}`}
        onChange={handleChange}
        value={String(req[htmlId])}
        {...rest}
      />
    </div>
  );
};

export default InputText;
