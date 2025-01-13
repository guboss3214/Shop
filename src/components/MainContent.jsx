import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

const MainContent = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const [itemsPerPage] = useState(8);
  const [debounce, setDebounce] = useState('');

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounce(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products');
        setItems(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filteredItems = items.filter((product) => {
    return product.title.toLowerCase().includes(debounce.toLowerCase());
  });
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
        {searchQuery === '' ? (
          currentItems.map((product) => {
            return (
              <Card
                key={product.id}
                id={product.id}
                title={product.title}
                descr={product.description}
                price={product.price}
                img={product.thumbnail}
              />
            );
          })
        ) : filteredItems.length === 0 ? (
          <div>No product found.</div>
        ) : (
          filteredItems.map((product) => {
            return (
              <Link to={`/product/${product.id}`} key={product.id}>
                <Card
                  title={product.title}
                  descr={product.description}
                  price={product.price}
                  img={product.thumbnail}
                />
              </Link>
            );
          })
        )}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
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
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
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
