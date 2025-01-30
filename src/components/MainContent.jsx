import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  selectProducts,
  selectIsLoading,
  selectError,
} from '../redux/userSlice';
import Card from './Card';

const MainContent = () => {
  const items = useSelector(selectProducts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [debounce, setDebounce] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    const timeoutId = setTimeout(() => {
      setDebounce(searchQuery);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, dispatch]);

  const filteredItems = items.filter((product) =>
    product.title.toLowerCase().includes(debounce.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-5/6 flex flex-col justify-center items-center gap-5 p-4 bg-base-100">
      <div className="flex justify-center w-full">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full max-w-xs my-4 bg-neutral"
        />
      </div>
      <div className="container flex flex-wrap justify-center gap-5 p-5">
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              descr={product.description}
              price={product.price}
              img={product.thumbnail}
            />
          ))
        ) : (
          <div>No product found.</div>
        )}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredItems.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-md ${
                currentPage === number
                  ? 'bg-base-500 text-base-content'
                  : 'bg-base-200 text-base-content'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainContent;
