import { Button, ButtonGroup } from '@mui/material';
import { memo, useState, type ReactElement } from 'react';

import { PageDirection } from '@/types/types';

interface IProps {
  setDirection: (direction: PageDirection) => void;
  pages: number;
}

const Pagination = memo(function Pagination({ setDirection, pages }: IProps): ReactElement {
  const [page, setPage] = useState<number>(1);

  const firstPage = page === 1;
  const endPage = page === pages;

  const handlePreviousClick = (): void => {
    if (firstPage) return;
    setDirection(PageDirection.PREV);
    setPage((prev) => prev - 1);
  };

  const handleNextClick = (): void => {
    if (endPage) return;
    setDirection(PageDirection.NEXT);
    setPage((prev) => prev + 1);
  };

  return (
    <ButtonGroup variant="text" aria-label="Basic button group">
      <Button onClick={handlePreviousClick} disabled={firstPage}>
        Prev page
      </Button>
      <Button onClick={handleNextClick} disabled={endPage}>
        Next page
      </Button>
    </ButtonGroup>
  );
});

export default Pagination;
