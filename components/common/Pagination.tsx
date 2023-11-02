import { PAGINATION_RANGE } from '@/const/const';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface PaginationProps {
  totalPage : number;
}

export const Pagination = ({totalPage} : PaginationProps) => {
  const {query} = useRouter();
  const currentPage = Number(query.page) || 1;
  
  return (
    <div>
      <ul className='flex flex-row gap-2 justify-center items-center w-full'>
        <li>
          <PaginationItem to={currentPage - 1} value="&lt;"  disabled={currentPage === 1}/>
        </li>

        {
          Array.from(
            {length : PAGINATION_RANGE} ,
             (_, i)=> currentPage - PAGINATION_RANGE + i + 2
          ).map((page) => page > 0 && page <= totalPage ?(
            <PaginationItem
              key={page}
              to={page}
              value={page}
              active={page === currentPage}
            />
          ) : null)
        }

        <li>
          <PaginationItem to={currentPage + 1} value="&gt;" disabled={currentPage === totalPage}/>
        </li>
      </ul>
    </div>
  )
}
interface PaginationItemProps {
  to : number;
  value : React.ReactNode;
  disabled? : boolean;
  active? : boolean;
}
const PaginationItem = ({to, value, disabled = false, active=false} : PaginationItemProps) => {
  const paginationRoute = '/page/[page]';
  const {pathname, query} = useRouter();

  const etendedPathname = pathname.indexOf(paginationRoute) === -1 ? `${pathname.replace(/\/$/ , '')}${paginationRoute}` : pathname

  return (
  <Link href={{
    pathname : etendedPathname,
    query : {
      ...query,
      page : to,
    }
  }}>
    <button className={`px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-black disabled:text-gray-400 disabled:cursor-not-allowed ${
          active ? "bg-gray-100 text-black" : ""
        }`} disabled={disabled}>{value}</button>
  </Link>)
}