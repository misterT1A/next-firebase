import { Button, ButtonGroup, Card, CardActions, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import type { FC, ReactElement } from 'react';
import React from 'react';

import type { UserType } from '@/types/types';

import DeleteItem from '../DeleteItem/DeleteItem';

interface IProps {
  user: UserType;
}

const UserCard: FC<IProps> = ({ user }): ReactElement => {
  const { name, time, age, description } = user;

  return (
    <Card className="flex flex-col items-start justify-between gap-10 sm:flex-row">
      <CardContent>
        <Typography variant="h5" component="div">
          Name: {name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Age: {age}</Typography>
        <div className="flex flex-col gap-1">
          <Typography sx={{ color: 'text.secondary' }} variant="body1">
            Description:
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </div>
        <Typography className="text-orange-500">Date: {time}</Typography>
      </CardContent>
      <CardActions>
        <ButtonGroup disableElevation variant="contained" orientation="horizontal" aria-label="Disabled button group">
          <DeleteItem id={user.id} />
          <Button variant="contained">
            <Link href={`/edit/${user.id}`}>Edit</Link>
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default UserCard;
