import React, {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  TextareaHTMLAttributes,
  useId,
} from "react";

type TextAreaProps<T> = {
  title: string;
  req: T;
  setReq: Dispatch<SetStateAction<T>>;
  htmlId: keyof T;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = <T extends object>(props: TextAreaProps<T>) => {
  const { title, req, setReq, htmlId, className, ...rest } = props;
  const generatedId = useId();
  const inputId = `${String(htmlId)}-${generatedId}`;
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        className={`border-1 border-slate-300 w-full p-2 rounded-md text-sm ps-3 focus:outline-none focus:border-2 ${className}`}
        id={inputId}
        value={String(req[htmlId])}
        placeholder="more information...."
        rows={7}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
