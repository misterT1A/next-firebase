import { memo, type ReactElement } from 'react';

interface IProps {
  prevHandler: () => void;
  nextHandler: () => void;
}

const Pagination = memo(function Pagination({ prevHandler, nextHandler }: IProps): ReactElement {
  return (
    <ul className="flex gap-1">
      <li
        className={
          'flex w-fit cursor-pointer items-center justify-center rounded-md bg-slate-400 p-2 text-black hover:bg-slate-600'
        }
        onClick={prevHandler}
      >
        Prev
      </li>
      <li
        className={
          'flex w-fit cursor-pointer items-center justify-center rounded-md bg-slate-400 p-2 text-black hover:bg-slate-600'
        }
        onClick={nextHandler}
      >
        Next
      </li>
    </ul>
  );
});

export default Pagination;
