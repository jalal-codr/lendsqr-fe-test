import styles from '../../styles/abstracts/_pagination.module.scss';
import caretIcon from "../../assets/icons/np_next.png";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.showingCount}>
        Showing
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            <option value="100">100</option>
            <option value="50">50</option>
            <option value="10">10</option>
          </select>
          <img src={caretIcon} className={styles.caret} alt="" />
        </div>
        out of {totalItems}
      </div>

      <div className={styles.pageNumbers}>
        <button
          className={styles.arrow}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          &lt;
        </button>

        {[...Array(totalPages)].slice(0, 3).map((_, i) => {
          const page = i + 1;
          return (
            <span
              key={page}
              className={page === currentPage ? styles.activePage : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </span>
          );
        })}

        {totalPages > 3 && <span>...</span>}

        <span
          className={currentPage === totalPages ? styles.activePage : undefined}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </span>

        <button
          className={styles.arrow}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;