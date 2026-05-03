import { InputSearch } from "@/src/components";
import { useProduct } from "@/src/contextts/context-product";
import type { ProductSearch } from "@/src/interfaces/product";
import React from "react";

const ProductInputSearch = () => {
  const { req, setReq, getProduct } = useProduct();
  return (
    <div>
      <InputSearch<ProductSearch>
        req={req}
        setReq={setReq}
        getApi={getProduct}
      />
    </div>
  );
};

export default ProductInputSearch;
