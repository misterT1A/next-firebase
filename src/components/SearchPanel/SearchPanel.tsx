'use client';

import type { FormEvent, ReactElement } from 'react';
import { useState } from 'react';

interface IProps {
  submitHandler: (query: string) => void;
}

const SearchPanel = ({ submitHandler }: IProps): ReactElement => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    submitHandler(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className='className="rounded-md text-black" bg-slate-600 p-1'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search user"
        type="text"
      />

      <button className="bg-slate-600 p-1" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchPanel;
