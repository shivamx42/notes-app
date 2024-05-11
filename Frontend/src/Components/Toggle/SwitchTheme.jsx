import React from 'react'
import { useState,useEffect } from 'react';
import * as Switch from '@radix-ui/react-switch';
import { IconMoon,IconSun } from './Icons';

export default function SwitchTheme() {

  const [theme,setTheme]=useState("light");

  useEffect(()=>{
      if(theme==="dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
  },[theme])

  const switchTheme=()=>{
      setTheme(theme==="dark"?"light":"dark");
  }

  return (
    
    <div>
      <Switch.Root className="w-[42px] h-[25px] border-[1.8px] border-black rounded-full data-[state=checked]:bg-slate-800 data-[state=checked]:border-slate-50" onClick={switchTheme}>
        <Switch.Thumb className="block w-[21px] h-[21px] translate-x-[2px] data-[state=checked]:translate-x-[19px] duration-300 transition-all">
          {theme==="dark"?<IconMoon/>:<IconSun/>}
        </Switch.Thumb>
      </Switch.Root>
    </div>
  

  )
}
