import { paginationCalculation } from 'utils/paginationCalculation';

const totalCount = 25;
const pageSize = 4;
const siblingCount = 1;

jest.fn(paginationCalculation);

describe('usePagination', () => {
  it('should render dots in the end of pagination and last page', () => {
    const currentPage = 1;
    const pagination = paginationCalculation(totalCount, pageSize, siblingCount, currentPage);
    expect(pagination).toStrictEqual([1, 2, 3, 4, 5, '...', 7]);
  });

  it('should render dots after first page if current page bigger or equal then 4', () => {
    const currentPage = 4;
    const pagination = paginationCalculation(totalCount, pageSize, siblingCount, currentPage);
    expect(pagination).toStrictEqual([1, '...', 3, 4, 5, 6, 7]);
  });

  it('should render dots after first page and before last page if current page bigger or equal then 5', () => {
    const currentPage = 4;
    const totalCount = 29;
    const pagination = paginationCalculation(totalCount, pageSize, siblingCount, currentPage);
    expect(pagination).toStrictEqual([1, '...', 3, 4, 5, '...', 8]);
  });
});
