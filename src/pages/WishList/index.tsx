import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';

const ITEMS_PER_PAGE = 10;

const WishList: NextPage = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const removeItemFromWishlist = (index: number) => {
    const updatedWishlist = wishlist.filter((_, i) => i !== index);
    setWishlist(updatedWishlist);

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
  };

  const totalPages = Math.ceil(wishlist.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentWishlistPage = wishlist.slice(startIndex, endIndex);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <h1>Wishlist</h1>
      <ul className="flex flex-wrap gap-4 flex-col">
        {currentWishlistPage.map((item, index) => (
          <li key={startIndex + index} className="p-[3px] border-2 block text-center">
            {item}
            <button
              onClick={() => removeItemFromWishlist(startIndex + index)}
              className="p-2 text-red-500 cursor-pointer"
            >
              <BsTrash />
            </button>
          </li>
        ))}
      </ul>
      {wishlist.length > ITEMS_PER_PAGE && (
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => changePage(index + 1)}
              className={`p-2 cursor-pointer ${
                currentPage === index + 1 ? 'bg-gray-300' : 'bg-white'
              } border border-gray-500`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      <div onClick={clearWishlist} className="cursor-pointer mt-4">
        Clear Wishlist
      </div>
    </div>
  );
};

export default WishList;
