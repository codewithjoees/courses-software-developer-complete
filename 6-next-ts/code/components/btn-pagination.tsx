import React, { Dispatch, memo, SetStateAction } from "react";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { BiSkipNext } from "react-icons/bi";

type BasePagination = {
  page: number;
  limit: number;
};

type PaginationProps<T extends BasePagination> = {
  getApi: (req: T) => Promise<void>;
  loading: boolean;
  req: T;
  setReq: Dispatch<SetStateAction<T>>;
  pagination: {
    total: number;
    totalPages: number;
    noStart: number;
    noEnd: number;
  };
};

const Pagination = <T extends BasePagination>(props: PaginationProps<T>) => {
  const { loading, pagination, req, setReq, getApi } = props;
  const { total, totalPages, noStart, noEnd } = pagination;
  const handlePage = async (event: number | "prev" | "next") => {
    let page = req.page;
    if (event === "prev") page--;
    if (event === "next") page++;
    if (typeof event === "number") page = event;
    if (page < 1) page = totalPages;
    if (page > totalPages) page = 1;
    const newReq = { ...req, page };
    setReq(newReq);
    await getApi(newReq);
  };
  return (
    <>
      {total >= 1 && !loading && (
        <>
          <div className="text-center text-[14px] mb-2 text-slate-600">
            Showing {noStart} to {noEnd} of {total} entries
          </div>
          <div className="flex justify-center gap-3">
            <button
              className="cursor-pointer"
              onClick={() => handlePage("prev")}
              disabled={loading}
            >
              <MdOutlineSkipPrevious className="text-[20px]" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  className={`h-[35px] w-[35px] rounded-full  font-bold shadow-md cursor-pointer ${req.page === number && "bg-blue-500 text-white"}`}
                  onClick={() => handlePage(number)}
                  key={number}
                  disabled={loading}
                >
                  {number}
                </button>
              ),
            )}
            <button
              className="h-[35px] w-[35px] cursor-pointer"
              onClick={() => handlePage("next")}
              disabled={loading}
            >
              <BiSkipNext className="text-[20px]" />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Pagination;
