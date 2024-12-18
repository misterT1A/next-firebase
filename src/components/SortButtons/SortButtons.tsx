import { Button, Typography } from '@mui/material';
import type { FC, ReactElement } from 'react';
import React from 'react';

import { getSortUsers } from '@/services/firebaseServerActions';
import type { UserType } from '@/types/types';
import { SortEnum } from '@/types/types';

interface IProps {
  setUsers: (users: UserType[]) => void;
}

const SortButtons: FC<IProps> = ({ setUsers }): ReactElement => {
  const sortHandler = async (type: SortEnum): Promise<void> => {
    const users = await getSortUsers(type);
    setUsers(users);
  };

  return (
    <div className="flex flex-col gap-2">
      <Typography>Sort by creation date</Typography>
      <div className="flex gap-2">
        <Button variant="outlined" onClick={() => sortHandler(SortEnum.ASC)}>
          ASC
        </Button>
        <Button variant="outlined" onClick={() => sortHandler(SortEnum.DESC)}>
          DESC
        </Button>
      </div>
    </div>
  );
};

export default SortButtons;
