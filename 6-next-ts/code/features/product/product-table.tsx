`"use client"`;
import { formatCurrency } from "@/src/utils/format-currency";
import React, { useEffect } from "react";
import {
  ProductModalUpdate,
  ProductModalDelete,
  ProductModalDetail,
} from "@/src/features/product";
import { useProduct } from "@/src/contextts/context-product";

const ProductTable = () => {
  const { req, product, getProduct, loading } = useProduct();
  useEffect(() => {
    getProduct(req);
  }, [req]);
  return (
    <table className="table table-zebra w-[600px] table-fixed">
      {/* head */}
      <thead>
        <tr>
          <th className="w-[50px] text-center">#</th>
          <th className="w-[150px]">Name</th>
          <th className="w-[150px]">Price</th>
          <th className="w-[250px] text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td className="font-bold italic text-center" colSpan={4}>
              loading.....
            </td>
          </tr>
        ) : product.length === 0 ? (
          <tr>
            <td className="font-bold italic text-center" colSpan={4}>
              Product is Empty...
            </td>
          </tr>
        ) : (
          product.map((p) => (
            <tr key={p.id}>
              <th className="truncate hover:whitespace-normal text-center">
                {p.id}
              </th>
              <td className="truncate hover:whitespace-normal capitalize">
                {p.name}
              </td>
              <td className="truncate hover:whitespace-normal">
                {formatCurrency(p.price)}
              </td>
              <td className="flex justify-center gap-3">
                <ProductModalDetail id={p.id} />
                <ProductModalUpdate id={p.id} />
                <ProductModalDelete id={p.id} name={p.name} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
