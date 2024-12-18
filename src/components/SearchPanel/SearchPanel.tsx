'use client';

import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import type { FormEvent, ReactElement } from 'react';
import { useState } from 'react';

import { getSearchUsers } from '@/services/firebaseServerActions';
import type { UserType } from '@/types/types';

interface IProps {
  setUsers: (users: UserType[]) => void;
}

const SearchPanel = ({ setUsers }: IProps): ReactElement => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const [users] = await getSearchUsers(query);
    setUsers(users);
  };

  const handleClear = (): void => {
    setQuery('');
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
