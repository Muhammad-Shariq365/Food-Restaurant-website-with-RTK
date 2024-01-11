import React, {useState} from 'react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose, AiFillTag } from 'react-icons/ai';
import { BsFillCartFill,BsFillSaveFill } from 'react-icons/bs';
import {TbTruckDelivery} from 'react-icons/tb'
import {FaUserFriends, FaWallet} from 'react-icons/fa'
import {MdFavorite, MdHelp} from 'react-icons/md'
import {useDispatch,useSelector} from 'react-redux';
import {setSearchQuery} from "../components/cartSlice";
import {Link} from "react-router-dom";
import {getCartTotal} from './cartSlice';
import { useEffect } from 'react';

const Navbar = () => {
const [nav, setNav] = useState(false)
const dispatch = useDispatch();
const searchQuery = useSelector((state) => state.search.searchQuery);
const {totalQuantity } = useSelector(
  (state) => state.yourSlice
);

const handleSearch = (e) => {
  dispatch(setSearchQuery(e.target.value));
}

const zoomedItems = useSelector((state) => state.yourSlice.zoomedItems);

useEffect(() => {
  dispatch(getCartTotal());
}, [zoomedItems,]);
  return (
    <div className='sm:mx-8 max-w-[1640px] mx-auto flex justify-between items-center p-4'>
      {/* Left side */}
      <div className='flex items-center '>
        <div onClick={()=> setNav(!nav)} className='cursor-pointer'>
          <AiOutlineMenu size={30} />
        </div>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl '>
          Best <span className='font-bold'>Eats</span>
        </h1>
      
      </div>

      {/* Search Input */}
      <div className='bg-gray-200 rounded-full flex items-center px-2 sm:w-[600px] mr-2'>
        <AiOutlineSearch size={25} />
        <input
          className='bg-transparent p-2 w-full focus:outline-none'
          type='text'
          placeholder='Search foods'
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {/* Cart button */}
      <button className='bg-black text-white md:flex items-center py-2 rounded-full px-2'>
  {/* Conditionally render the div based on totalQuantity */}
  <div>
  
  <Link to="/cart"><BsFillCartFill size={20} /></Link>
  <sup>
  {totalQuantity !== 0 && (
     <div class="absolute  bottom-4 left-1  bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
     <span class="text-xs font-bold">3</span>
   </div>
  )}
  </sup>
  </div>
</button>


      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ''}
      

      {/* Side drawer menu */}
      <div className={nav ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300' : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300' }>
        <AiOutlineClose
            onClick={()=> setNav(!nav)}
          size={30}
          className='absolute right-4 top-4 cursor-pointer'
        />
        <h2 className='text-2xl p-4'>
          Best <span className='font-bold'>Eats</span>
        </h2>
        <nav>
            <ul className='flex flex-col p-4 text-gray-800'>
                <li className='text-xl py-4 flex'><TbTruckDelivery size={25} className='mr-4' /> Orders</li>
                <li className='text-xl py-4 flex'><MdFavorite size={25} className='mr-4' /> Favorites</li>
                <li className='text-xl py-4 flex'><FaWallet size={25} className='mr-4' /> Wallet</li>
                <li className='text-xl py-4 flex'><MdHelp size={25} className='mr-4' /> Help</li>
                <li className='text-xl py-4 flex'><AiFillTag size={25} className='mr-4' /> Promotions</li>
                <li className='text-xl py-4 flex'><BsFillSaveFill size={25} className='mr-4' /> Best Ones</li>
                <li className='text-xl py-4 flex'><FaUserFriends size={25} className='mr-4' /> Invite Friends</li>
            </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
