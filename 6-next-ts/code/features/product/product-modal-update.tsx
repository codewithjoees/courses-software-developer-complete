"use client";
import { InputBalance, InputImg, InputText, TextArea } from "@/src/components";
import { useProduct } from "@/src/contextts/context-product";
import { ProductUpdate } from "@/src/interfaces/product";
import productAPI from "@/src/services/product";
import React, { FormEvent, useRef, useState } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Swal from "sweetalert2";

type ProductModalUpdateProps = {
  id: number;
};

const ProductModalUpdate = (props: ProductModalUpdateProps) => {
  const { id } = props;
  const modalUpdate = useRef<HTMLDialogElement>(null);
  const { productRealTime } = useProduct();
  const [req, setReq] = useState<ProductUpdate>({
    id: 0,
    name: "",
    price: 0,
    desc: "",
    img: undefined,
    removeImg: false,
  });
  const [priceDisplay, setPriceDisplay] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<{ [key: string]: string }>({});
  const form = useRef<HTMLDivElement>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await productAPI.updateProductId(req);
      setReq({
        id: 0,
        name: "",
        price: 0,
        desc: "",
        img: undefined,
        removeImg: false,
      });
      setErrMsg({});
      setPreview("");
      if (inputRef.current) inputRef.current.value = "";
      setPriceDisplay("");
      productRealTime();
      modalUpdate.current?.close();
      await Swal.fire({
        title: "Success",
        text: updated.data.msg,
        icon: "success",
      });
    } catch (err: any) {
      setErrMsg(err.response?.data.errors);
      form.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const openModal = async () => {
    setLoading1(true);
    try {
      const { data } = await productAPI.getProductId(id);
      setReq((prev) => ({
        ...prev,
        id: data.id,
        name: data.name,
        price: data.price,
        desc: data.desc,
      }));
      setPreview(data.img);
      setPriceDisplay(data.price);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setErrMsg({});
      setLoading1(false);
      modalUpdate.current?.showModal();
    }
  };
  return (
    <div>
      <button
        className={`bg-blue-500 text-white inline-block p-2 hover:scale-[1.1] duration-150 rounded ${loading1 ? "opacity-30 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
        onClick={openModal}
        disabled={loading1}
      >
        {loading1 ? (
          <span className="loading loading-spinner text-white"></span>
        ) : (
          <HiMiniPencilSquare />
        )}
      </button>
      <dialog className="modal" ref={modalUpdate}>
        <form
          className="modal-box p-0 max-h-[85vh] flex flex-col"
          onSubmit={handleSubmit}
        >
          <div className="bg-blue-500 p-3 text-white">
            <div className="text-2xl">Update Product</div>
          </div>
          <div className="p-1 flex-1 overflow-y-auto" ref={form}>
            {/* alert error */}
            {Object.keys(errMsg).length > 0 && (
              <div className="text-red-600 italic font-bold ps-3 pt-3">
                *Error
              </div>
            )}
            {/* product name */}
            <InputText<ProductUpdate>
              title="Product Name :"
              className="focus:border-blue-500"
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
            <InputBalance<ProductUpdate>
              title="Product Price :"
              className="focus:border-blue-500"
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
            <InputImg<ProductUpdate>
              title="Product Image :"
              className="focus:border-blue-500"
              req={req}
              setReq={setReq}
              htmlId="img"
              setLoading={setLoading}
              preview={preview}
              setPreview={setPreview}
              inputRef={inputRef}
            />
            {errMsg?.img && (
              <div className="text-red-600 italic font-bold ps-4 text-sm">
                *{errMsg?.img}
              </div>
            )}
            {/* product desc */}
            <TextArea<ProductUpdate>
              title="Product Description :"
              req={req}
              htmlId="desc"
              setReq={setReq}
              className="focus:border-blue-500"
              placeholder="ex: product is good"
            />
          </div>
          <div className="flex justify-end border-t-2 border-slate-300 p-3 gap-2">
            <button
              type="button"
              className={`bg-red-600 py-2 px-3 text-white rounded ${loading ? "opacity-35 cursor-not-allowed" : "opacity-100 curosr-pointer"}`}
              onClick={() => modalUpdate.current?.close()}
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
                className={`py-2 px-3 text-white rounded bg-blue-600 ${loading ? "opacity-35 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Update"
                )}
              </button>
            )}
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ProductModalUpdate;
