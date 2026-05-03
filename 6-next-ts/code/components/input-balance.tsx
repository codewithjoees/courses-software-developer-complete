import React, {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useId,
} from "react";
import { formatCurrency, unFormatCurrency } from "@/src/utils/format-currency";

type InputBalanceProps<T> = {
  title: string;
  req: T;
  setReq: Dispatch<SetStateAction<T>>;
  htmlId: keyof T;
  className?: string;
  priceDisplay: string;
  setPriceDisplay: Dispatch<SetStateAction<string>>;
} & InputHTMLAttributes<HTMLInputElement>;

const InputBalance = <T extends object>(props: InputBalanceProps<T>) => {
  const {
    title,
    htmlId,
    req,
    setReq,
    className,
    priceDisplay,
    setPriceDisplay,
    ...rest
  } = props;
  const generatedId = useId();
  const inputId = `${String(htmlId)}-${generatedId}`;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const currency = formatCurrency(value);
    setPriceDisplay(currency);
    const sendAPI = unFormatCurrency(currency);
    setReq((prev) => ({
      ...prev,
      [htmlId]: sendAPI,
    }));
  };
  return (
    <div className="p-3">
      <label htmlFor={inputId} className="block mb-2 text-lg">
        Product Price :
      </label>
      <input
        type="text"
        id={inputId}
        className={`border-1 border-slate-300 p-2 rounded w-full focus:outline-none focus:border-2 ${className}`}
        onChange={handleChange}
        value={String(formatCurrency(priceDisplay))}
        {...rest}
      />
    </div>
  );
};

export default InputBalance;
