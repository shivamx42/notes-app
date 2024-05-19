import React, { useEffect, useState } from 'react'
import SwitchTheme from './Toggle/SwitchTheme';

export default function Navbar({title}) {

  return (
    <>
            <div className='bg-white dark:bg-[#101110] flex justify-center p-4 border-b-[1.5px] border-black dark:border-[#f3ead3] font-bold h-[100px]'>
                <div className='text-black text-center text-xl items-center flex-grow dark:text-white mt-4'>{title}</div>
                <div className='ml-auto'>
                    <SwitchTheme/>
                </div>
            </div>
    </>
  )
}
