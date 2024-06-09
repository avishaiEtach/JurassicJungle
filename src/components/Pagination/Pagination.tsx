import { Pagination } from "@mui/material";
import "./Pagination.scss";

interface PaginationProps {
  pagesAmount: number;
  page: number;
  setPage: (page: number) => void;
}

export const PaginationMui = ({
  page,
  setPage,
  pagesAmount,
}: PaginationProps) => {
  return (
    <div className="pagination__container">
      <Pagination
        page={page}
        onChange={(ev, page) => setPage(page)}
        count={pagesAmount}
        shape="rounded"
      />
    </div>
  );
};
