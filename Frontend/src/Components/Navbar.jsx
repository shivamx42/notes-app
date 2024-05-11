import React from 'react'
import SwitchTheme from './Toggle/SwitchTheme';
export default function Navbar({title}) {

  return (
    <>
            <div className='bg-white dark:bg-slate-950 flex justify-center p-4 border-b-2 border-black dark:border-white dark:border-b font-bold h-[100px]'>
                <div className='text-black text-center text-xl items-center flex-grow dark:text-white mt-4'>{title}</div>
                <div className='ml-auto'>
                    <SwitchTheme/>
                </div>
            </div>
    </>
  )
}
