'use client';

import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import type { FormEvent, ReactElement } from 'react';
import { useState } from 'react';

const SearchPanel = (): ReactElement => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const newParams = new URLSearchParams(searchParams);
    newParams.set('query', query);
    router.replace(`?${newParams.toString()}`);
  };

  const handleClear = (): void => {
    setQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('query');
    router.replace(`?${newParams.toString()}`);
  };

  return (
    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }} onSubmit={handleSubmit}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search user"
        value={query}
        inputProps={{ 'aria-label': 'search user' }}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleClear}>
        <CancelIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" type="submit">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchPanel;
