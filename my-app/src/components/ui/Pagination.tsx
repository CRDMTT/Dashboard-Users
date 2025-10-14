import UIButton from './button/UIButton'

type Props = {
  page: number
  totalPages: number
  startIndex: number
  endIndex: number
  total: number
  onNext: () => void
  onPrev: () => void
}

export default function Pagination({ page, totalPages, startIndex, endIndex, total, onNext, onPrev }: Props) {
  return (
    <nav aria-label="Pagination" className="d-flex justify-content-between align-items-center mt-3 mb-3">
      <span>Showing {startIndex + 1}–{endIndex} of {total}</span>
      <div>
        <UIButton variant="secondary" onClick={onPrev} disabled={page === 1}>Prev</UIButton>
        <span className="mx-2">Page {page} / {totalPages}</span>
        <UIButton variant="secondary" onClick={onNext} disabled={page === totalPages}>Next</UIButton>
      </div>
    </nav>
  )
}
