"use client";

import React, { MouseEvent, useRef, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { Product } from "@/src/interfaces/product";
import productAPI from "@/src/services/product";
import { formatCurrency } from "@/src/utils/format-currency";

type ProductModalDetailProps = {
  id: number;
};

const ProductModalDetail = (props: ProductModalDetailProps) => {
  const { id } = props;
  const modalDetail = useRef<HTMLDialogElement>(null);
  const [productId, setProductId] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    img: "",
    desc: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const openModal = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    try {
      const { data } = await productAPI.getProductId(id);
      setProductId(data);
    } catch (error) {
      throw error;
    } finally {
      modalDetail.current?.showModal();
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        className={`bg-green-600 hover:scale-[1.2] transition-all duration-300 p-2 inline-block rounded ${loading ? "opacity-35 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
        onClick={openModal}
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner text-white"></span>
        ) : (
          <IoEyeSharp className="text-white" />
        )}
      </button>
      <dialog className="modal" ref={modalDetail}>
        <div className="modal-box p-0 max-h-[85vh] flex flex-col">
          <div className="bg-green-600 p-3">
            <div className="text-white text-2xl">Product Detail</div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {/* product name */}
            <div className="mb-2">
              <div className="text-lg mb-1">Product Name :</div>
              <div className="ms-2 text-lg">{productId.name}</div>
            </div>
            {/*  product price */}
            <div className="mb-2">
              <div className="text-lg mb-1">Product Price :</div>
              <div className="ms-2 text-lg">
                {formatCurrency(productId.price)}
              </div>
            </div>
            {/* product img */}
            <div className="mb-2">
              <div className="text-lg">Product Image :</div>
            </div>
            {productId.img === "" && (
              <div className="ms-2 mb-2">
                <div className="text-slate-500 italic text-lg">
                  No Image Displayed...
                </div>
              </div>
            )}
            {productId.img !== "" && (
              <div className="mt-3 mb-3">
                <img
                  src={String(productId.img)}
                  alt="Josse Surya Pinem"
                  className="w-auto h-auto"
                  onLoad={() => setLoading(false)}
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            {/*  product description */}
            <div className="mb-2">
              <div className="text-lg mb-1">Product Information :</div>
              <div className="ms-2 text-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
                aut sed, consectetur eligendi sint accusantium aspernatur
                assumenda veritatis pariatur eaque itaque in sequi doloremque
                tempore? Delectus inventore optio quasi excepturi.
              </div>
            </div>
          </div>
          <div className="p-3 border-t-2 border-t-slate-200 flex justify-end">
            <button
              className="py-2 px-3 text-white rounded bg-green-600"
              onClick={() => modalDetail.current?.close()}
            >
              Done
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductModalDetail;
