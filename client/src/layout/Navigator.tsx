import React from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { HiOutlineChatBubbleLeftEllipsis, HiOutlineHome } from 'react-icons/hi2'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { RxAvatar } from 'react-icons/rx'
import { NavLink } from 'react-router-dom'

const active = "text-button-grad1";
const base = "flex hover:text-button-grad2 transition-colors duration-150"



const Navigator = () => {
  return (
    <div className='flex flex-col justify-between w-80 '>
      <nav>
        <NavLink to={"/"} className={({isActive})=> isActive ?[base,active].join(" ") : base  }>
          <HiOutlineHome className='w-8 h-8'/>
          <span className='text-2xl font-medium'>KDFKLFJ</span>
        </NavLink>
        <NavLink to={"/my-profile"} className={({isActive})=> isActive ?[base,active].join(" ") : base  }>
          <RxAvatar className='w-8 h-8'/>
          <span className='text-2xl font-medium'>KDFKLFJ</span>
        </NavLink>
        <NavLink to={"/setting"} className={({isActive})=> isActive ?[base,active].join(" ") : base  }>
          <AiOutlineSetting className='w-8 h-8'/>
          <span className='text-2xl font-medium'>KDFKLFJ</span> 
        </NavLink>
        <NavLink to={"/notification"} className={({isActive})=> isActive ?[base,active].join(" ") : base  }>
          <IoMdNotificationsOutline className='w-8 h-8'/>
          <span className='text-2xl font-medium'>KDFKLFJ</span>
        </NavLink>
        <NavLink to={"/chat"}  className={({isActive})=> isActive ?[base,active].join(" ") : base  }>
          <HiOutlineChatBubbleLeftEllipsis className='w-8 h-8'/>
          <span className='text-2xl font-medium'>KDFKLFJ</span> 
        </NavLink>
      </nav>
    </div>
  )
}

export default Navigator