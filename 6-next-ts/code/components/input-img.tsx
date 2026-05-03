import React, {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  RefObject,
  useId,
} from "react";

import { IoMdClose } from "react-icons/io";

type InputImgProps<T> = {
  title: string;
  req: T;
  setReq: Dispatch<SetStateAction<T>>;
  htmlId: keyof T;
  className?: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setPreview: Dispatch<SetStateAction<string>>;
  preview: string;
  inputRef: RefObject<HTMLInputElement | null>;
} & InputHTMLAttributes<HTMLInputElement>;

const InputImg = <T extends object>(props: InputImgProps<T>) => {
  const {
    title,
    htmlId,
    req,
    setReq,
    className,
    setLoading,
    inputRef,
    preview,
    setPreview,
    ...rest
  } = props;
  const generatedId = useId();
  const inputId = `${String(htmlId)}-${generatedId}`;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];
    setLoading(true);
    if (file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    } else {
      setPreview("");
      setLoading(false);
    }
    setReq((prev) => ({
      ...prev,
      [htmlId]: file,
      removeImg: false,
    }));
  };
  const handleRemove = () => {
    setPreview("");
    setReq((prev) => ({
      ...prev,
      [htmlId]: null,
      removeImg: true,
    }));
    setLoading(false);
    if (inputRef?.current) inputRef.current.value = "";
  };
  return (
    <div className="p-3">
      <label htmlFor={inputId} className="block mb-2 text-lg">
        {title}
      </label>
      {preview && (
        <div className="relative inline-block mb-3" onClick={handleRemove}>
          <div
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 
                  bg-red-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
          >
            <IoMdClose className="text-white font-extrabold text-lg" />
          </div>
          <img
            src={preview}
            alt="preview"
            className="rounded-lg max-w-full h-auto"
            onLoad={() => setLoading(false)}
            referrerPolicy="no-referrer"
            // multiple={false}
          />
        </div>
      )}
      <input
        type="file"
        id={inputId}
        className={`border-1 border-slate-300 p-2 rounded w-full focus:outline-none focus:border-2 ${className}`}
        onChange={handleChange}
        ref={inputRef}
        {...rest}
      />
    </div>
  );
};

export default InputImg;
