import { Pagination } from "@/src/components";
import { useProduct } from "@/src/contextts/context-product";
import React from "react";
import type { ProductSearch } from "@/src/interfaces/product";

const ProductBtnPagination = () => {
  const { pagination, getProduct, loading, req, setReq } = useProduct();
  return (
    <div>
      <Pagination<ProductSearch>
        pagination={pagination}
        getApi={getProduct}
        loading={loading}
        req={req}
        setReq={setReq}
      />
    </div>
  );
};

export default ProductBtnPagination;
