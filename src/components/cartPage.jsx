import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { increaseItemQuantity, decreaseItemQuantity, getCartTotal, removeItem } from './cartSlice';

const ZoomedItemsPage = () => {
  const zoomedItems = useSelector((state) => state.yourSlice.zoomedItems);
  const totalPrice = useSelector((state) => state.yourSlice.totalPrice);
  const { totalQuantity } = useSelector((state) => state.yourSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [zoomedItems]);

  return (
    <div>
      <div className='sticky top-0'><h1 className='flex justify-center align-center py-3  text-4xl font-mono font-bold backdrop-blur-md '>Shopping Cart</h1></div>
    <div className="bg-gray-100 min-h-screen py-8">
     
      <div className="container mx-auto px-4 ">
      
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            {zoomedItems?.map((data) => (
              <div
                key={data.id}
                className=" mt-6 rounded-lg shadow-md p-6 mb-4 bg-white flex flex-col md:flex-row items-center justify-center md:items-start text-center"
              >
                <div className="flex flex-col items-center md:mb-0  ">
                  
                  <img className='h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-36 rounded-full'
                    
                    src={data.image}
                    alt="Product image"
                  />
            
                  <span className="font-semibold flex flex-wrap">{data.name}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-around items-center w-full">
                  <div className=" flex items-center ">
                    <span className="mr-2">Price: {data.price}</span>
                    <div className="flex items-center">
                      <button
                           className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md"
                        onClick={() => dispatch(decreaseItemQuantity(data.id))}
                      >
                        −
                      </button>
                      <span className="text-center w-8">{data.quantity}</span>
                      <button
                        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md"
                        onClick={() => dispatch(increaseItemQuantity(data.id))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">Total: {data.quantity * data.price}</span>
                    <button
                       className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md"
                      onClick={() => dispatch(removeItem(data.id))}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-1/4  md:fixed md:right-0 md:mt-6">
            <div className=" rounded-lg shadow-md p-6 flex flex-col items-stretch">
              <h2 className="text-lg font-semibold mb-4 text-center">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{totalPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>$1.99</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{totalPrice}</span>
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full hover:bg-blue-600"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ZoomedItemsPage;
