"use client";
import { InputImg, InputText, TextArea } from "@/src/components";
import { InputBalance } from "@/src/components";
import { useProduct } from "@/src/contextts/context-product";
import type { ProductCreate } from "@/src/interfaces/product";
import productAPI from "@/src/services/product";
import React, { FormEvent, useRef, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import Swal from "sweetalert2";

const ProductModalCreate = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { productRealTime } = useProduct();
  const [req, setReq] = useState<ProductCreate>({
    name: "",
    price: 0,
    img: null,
    desc: "",
  });
  const [priceDisplay, setPriceDisplay] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");
  const form = useRef<HTMLDivElement>(null);
  const [errMsg, setErrMsg] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const created = await productAPI.createProduct(req);
      setErrMsg({});
      setReq({
        name: "",
        price: 0,
        img: null,
        desc: "",
      });
      setPriceDisplay("");
      setPreview("");
      if (inputRef?.current) inputRef.current.value = "";
      productRealTime();
      modalRef.current?.close();
      await Swal.fire({
        title: "Success",
        text: created?.data.msg,
        icon: "success",
      });
    } catch (error: any) {
      setErrMsg(error.response?.data.errors);
      form.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        className="bg-green-600 text-white flex items-center gap-2 p-2 rounded cursor-pointer"
        onClick={() => modalRef.current?.showModal()}
      >
        <IoMdAddCircle className="text-xl" />
        <div className="text-md font-bold">Create Product</div>
      </button>
      {/* form */}
      <dialog className="modal" ref={modalRef}>
        <form
          className="modal-box p-0 max-h-[85vh] flex flex-col"
          onSubmit={handleSubmit}
        >
          <div className="bg-green-600 p-3 text-white">
            <div className="text-2xl">Create Product</div>
          </div>
          <div className="p-1 flex-1 overflow-y-auto" ref={form}>
            {/* alert error */}
            {Object.keys(errMsg).length > 0 && (
              <div className="text-red-600 italic font-bold ps-3 pt-3">
                *Error
              </div>
            )}
            {/* product name */}
            <InputText<ProductCreate>
              title="Product Name :"
              className="focus:border-green-500"
              req={req}
              setReq={setReq}
              htmlId="name"
              placeholder="ex: Product - 1"
            />
            {/* error product name */}
            {errMsg?.name && (
              <div className="text-red-600 italic font-bold ps-4 text-sm">
                *{errMsg?.name}
              </div>
            )}
            {/* product price */}
            <InputBalance<ProductCreate>
              title="Product Price :"
              className="focus:border-green-500"
              req={req}
              setReq={setReq}
              htmlId="price"
              placeholder="ex: $10.000"
              priceDisplay={priceDisplay}
              setPriceDisplay={setPriceDisplay}
            />
            {/* error product price */}
            {errMsg?.price && (
              <div className="text-red-600 italic font-bold ps-4 text-sm">
                *{errMsg?.price}
              </div>
            )}
            {/* product img */}
            <InputImg<ProductCreate>
              title="Product Image :"
              className="focus:border-green-500"
              req={req}
              setReq={setReq}
              htmlId="img"
              setLoading={setLoading}
              inputRef={inputRef}
              setPreview={setPreview}
              preview={preview}
            />
            {errMsg?.img && (
              <div className="text-red-600 italic font-bold ps-4 text-sm">
                *{errMsg?.img}
              </div>
            )}
            {/* product desc */}
            <TextArea<ProductCreate>
              title="Product Description :"
              req={req}
              htmlId="desc"
              setReq={setReq}
              className="focus:border-green-500"
              placeholder="ex: product is good"
            />
          </div>
          <div className="flex justify-end border-t-2 border-slate-300 p-3 gap-2">
            <button
              type="button"
              className={`py-2 px-3 text-white rounded bg-red-600 ${loading ? "opacity-35 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
              onClick={() => modalRef.current?.close()}
              disabled={loading}
            >
              Cancel
            </button>
            {errMsg?.role ? (
              <div className="text-red-600 italic font-bold ps-4 text-sm">
                *{errMsg?.role}
              </div>
            ) : (
              <button
                type="submit"
                className={`py-2 px-3 text-white rounded bg-green-600  ${loading ? "opacity-35 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Save"
                )}
              </button>
            )}
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ProductModalCreate;
