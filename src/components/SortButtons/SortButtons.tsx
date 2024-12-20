'use client';

import { Button, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';

import { SortEnum } from '@/types/types';

const SortButtons = (): ReactElement => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sort, setSort] = useState<SortEnum>(SortEnum.ASC);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', sort);
    router.replace(`?${newParams.toString()}`);
  }, [sort]);

  const sortHandler = (sort: SortEnum): void => {
    setSort(sort);
  };

  return (
    <div className="flex flex-col gap-2">
      <Typography>Sort by creation date</Typography>
      <div className="flex gap-2">
        <Button variant="outlined" onClick={() => sortHandler(SortEnum.ASC)} disabled={sort === SortEnum.ASC}>
          ASC
        </Button>
        <Button variant="outlined" onClick={() => sortHandler(SortEnum.DESC)} disabled={sort === SortEnum.DESC}>
          DESC
        </Button>
      </div>
    </div>
  );
};

export default SortButtons;
