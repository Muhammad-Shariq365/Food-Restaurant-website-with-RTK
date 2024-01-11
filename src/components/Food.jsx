import { useState } from 'react';
import { useSelector } from 'react-redux';
import 'primeicons/primeicons.css';
import { FaPlus } from 'react-icons/fa';
import { toggleZoomedItem } from '../components/cartSlice';
import { useDispatch } from 'react-redux';

const Food = () => {
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.search.searchData);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [isZoomedArray, setIsZoomedArray] = useState(searchData.map(() => false));

  const handleZoomClick = (item) => {
    const filteredIndex = filteredData.findIndex((data) => data.id === item.id);
    const originalIndex = searchData.findIndex((data) => data.id === item.id);
    const updatedZoomArray = [...isZoomedArray];

    // Toggle the zoom state
    updatedZoomArray[filteredIndex] = !updatedZoomArray[filteredIndex];
    setIsZoomedArray(updatedZoomArray);

    // Toggle the Redux state by passing the entire item
    dispatch(toggleZoomedItem({ index: originalIndex, isZoomed: updatedZoomArray[filteredIndex], item }));
  };

  const filteredData = searchData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!filteredCategory || item.category.toLowerCase() === filteredCategory) &&
      (!selectedPrice || parseFloat(item.price) <= selectedPrice)
  );

  const filterType = (category) => {
    setFilteredCategory(category === filteredCategory ? null : category);
    // Reset selectedPrice when "All" is clicked
    setSelectedPrice('');
  };

  const filterPrice = (price) => {
    setSelectedPrice(price);
    setFilteredCategory('');
  };

  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
      <h1 className="text-orange-600 font-bold text-4xl text-center">Top Rated Menu Items</h1>

      {/* Filter Row */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Filter Type */}
        <div>
          <p className="font-bold text-gray-700">Filter Type</p>
          <div className="flex justfiy-between flex-wrap">
            <button
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
              onClick={() => filterType(null)}
            >
              All
            </button>
            <button
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
              onClick={() => filterType('burger')}
            >
              Burgers
            </button>
            <button
              onClick={() => filterType('pizza')}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Pizza
            </button>
            <button
              onClick={() => filterType('salad')}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Salads
            </button>
            <button
              onClick={() => filterType('chicken')}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Chicken
            </button>
          </div>
        </div>

        {/* Filter Price */}
        <div>
          <p className="font-bold text-gray-700">Filter Price</p>
          <div className="flex justify-between max-w-[390px] w-full">
            <button
              onClick={() => filterPrice(10)}
              className={`m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white ${
                selectedPrice === 10 ? 'bg-orange-600 text-white' : ''
              }`}
            >
              10
            </button>
            <button
              onClick={() => filterPrice(20)}
              className={`m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white ${
                selectedPrice === 20 ? 'bg-orange-600 text-white' : ''
              }`}
            >
              20
            </button>
            <button
              onClick={() => filterPrice(30)}
              className={`m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white ${
                selectedPrice === 30 ? 'bg-orange-600 text-white' : ''
              }`}
            >
              30
            </button>
            <button
              onClick={() => filterPrice(40)}
              className={`m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white ${
                selectedPrice === 40 ? 'bg-orange-600 text-white' : ''
              }`}
            >
              40
            </button>
          </div>
        </div>
      </div>

      {/* Display foods */}
      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 ">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="border shadow-lg rounded-lg hover:scale-105 duration-300 "
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="sm:flex  justify-between py-2 px-2 [py-2  bg-slate-400 px-1]">
              <h5 className="text-xs font-bold w-40 flex items-center sm:text-sm ">{item.name}</h5>
              <h6 className="text-xs flex items-center  font-bold sm:text-sm">{item.price}</h6>
              <button
                className={`border-none p-0 ${
                  isZoomedArray[index] ? 'transform scale-125 text-orange-500' : ''
                }`}
                onClick={() => handleZoomClick(item)}
              >
                <span>
                  <FaPlus />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;
