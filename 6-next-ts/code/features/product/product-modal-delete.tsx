"use client";
import { useProduct } from "@/src/contextts/context-product";
import productAPI from "@/src/services/product";
import React, { FormEvent, useRef, useState } from "react";
import {
  FaCheck,
  FaExclamationTriangle,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";

type ProductModalDeleteProps = {
  id: number;
  name: string;
};

const ProductModalDelete = (props: ProductModalDeleteProps) => {
  const { id, name } = props;
  const { productRealTime } = useProduct();
  const [loading, setLoading] = useState<boolean>(false);
  const modalDelete = useRef<HTMLDialogElement>(null);
  const [errMsg, setErrMsg] = useState<string>("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const deleted = await productAPI.deleteProductId(id);
      productRealTime();
      modalDelete.current?.close();
      await Swal.fire({
        title: "Success !",
        text: deleted?.data.msg,
        icon: "success",
      });
    } catch (err: any) {
      setErrMsg(err?.response?.data.errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        onClick={() => modalDelete.current?.showModal()}
        className="bg-red-500 p-2 inline-block  hover:scale-[1.1] cursor-pointer duration-150 rounded"
      >
        <FaTrashAlt className="text-white" />
      </button>
      <dialog className="modal" ref={modalDelete}>
        <form
          className="modal-box p-0 max-h-[85vh] flex flex-col"
          onSubmit={handleSubmit}
        >
          <div className="bg-red-500 p-3">
            <div className="text-white text-2xl">Delete Product</div>
          </div>
          <div className="p-3 text-center">
            <FaExclamationTriangle className="text-center text-8xl text-red-500 inline-block" />
          </div>
          <div className="text-center text-2xl p-3">
            Are you sure delete {name} ?
          </div>
          <div className="flex justify-center gap-2 p-3">
            <button
              type="button"
              className={`bg-slate-500 flex items-center gap-2 px-3 py-1 rounded ${loading ? "opacity-30  cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
              onClick={() => modalDelete.current?.close()}
              disabled={loading}
            >
              <FaTimes className="text-white text-2xl" />
              <div className="text-white text-lg">No</div>
            </button>
            {errMsg ? (
              <div className="text-red-600 italic font-bold ps-4 text-xl">
                *{errMsg}
              </div>
            ) : (
              <button
                type="submit"
                className={`bg-red-500 flex items-center gap-2 px-3 py-1 rounded ${loading ? "opacity-30  cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                disabled={loading}
              >
                <FaCheck className="text-white text-2xl" />
                <div className="text-white text-lg">Yes</div>
              </button>
            )}
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ProductModalDelete;
