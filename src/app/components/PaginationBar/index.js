import './paginationBar.css'
export default function PaginationBar({ page, onNextPage, onPreviousPage }) {
    return (
        <div className="pagination-bar">
            <button
                className="pagination-bar-button"
                onClick={onPreviousPage}
                disabled={page <= 1}
            >
                Anterior
            </button>

            <span>{page}</span>

            <button
                className="pagination-bar-button"
                onClick={onNextPage}
            >
                Siguiente
            </button>
        </div>
    );
}
