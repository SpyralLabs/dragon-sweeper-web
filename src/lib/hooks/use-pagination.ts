import { useSearchParams } from 'react-router';

export default function usePagination(params?: { size?: number }) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 0;
  const size = params?.size ?? 4;

  return {
    page: currentPage,
    size,
  };
}
