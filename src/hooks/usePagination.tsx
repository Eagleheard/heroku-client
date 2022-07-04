import { useMemo } from 'react';

import { paginationCalculation } from 'utils/paginationCalculation';

interface IUsePagination {
  totalCount: number;
  pageSize: number;
  currentPage: number;
}

export const usePagination = ({ totalCount, pageSize, currentPage }: IUsePagination) => {
  const siblingCount = 1;
  const paginationRange = useMemo(
    () => paginationCalculation(totalCount, pageSize, siblingCount, currentPage),
    [totalCount, pageSize, currentPage],
  );
  return paginationRange;
};
