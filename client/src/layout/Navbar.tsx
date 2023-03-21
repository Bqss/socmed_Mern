  import React from 'react'
import { NavLink } from 'react-router-dom'
import { Search } from '../components/mollecules'
import {AiOutlineSetting} from "react-icons/ai";
import {IoMdNotificationsOutline} from "react-icons/io";
import {HiOutlineChatBubbleLeftEllipsis,HiOutlineHome} from "react-icons/hi2";
import {RxAvatar} from "react-icons/rx";
import { useSelector } from 'react-redux';
import { getUserState } from '../slices/UserSlice';



const active = "text-button-grad1";
const base = "hover:text-button-grad2 transition-colors duration-150"



const Navbar = () => {
  const {crediental} = useSelector(getUserState);
  return (
    <div className='flex mx-5 justify-between items-center  py-4 '>
      <Search className='basis-80'/>
      <div className='flex justify-between w-80 '>
        <NavLink to={"/"} className={({isActive})=> isActive ?[base,active].join(" ") : base  }>
          <HiOutlineHome className='w-6 h-6'/>
        </NavLink>
        <NavLink to={"/"+crediental._id} className={({isActive})=> isActive ?[base,active].join(" ") : base  }>
          <RxAvatar className='w-6 h-6'/>
        </NavLink>
        <NavLink to={"/setting"} className={({isActive})=> isActive ?[base,active].join(" ") : base  }>
          <AiOutlineSetting className='w-6 h-6'/> 
        </NavLink>
        <NavLink to={"/notification"} className={({isActive})=> isActive ?[base,active].join(" ") : base  }>
          <IoMdNotificationsOutline className='w-6 h-6'/>
        </NavLink>
        <NavLink to={"/chat"}  className={({isActive})=> isActive ?[base,active].join(" ") : base  }>
          <HiOutlineChatBubbleLeftEllipsis className='w-6 h-6'/> 
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar