import React from 'react'
import { useState, useEffect } from 'react';
import * as Switch from '@radix-ui/react-switch';
import { IconMoon, IconSun } from './Icons';
import { useSelector } from 'react-redux';

export default function SwitchTheme() {

  const { currentUser } = useSelector(state => state.user);
  const [theme, setTheme] = useState(currentUser?.theme || "light");

  useEffect(() => {
    if (currentUser) {
      setTheme(currentUser.theme);
    }
  }, [currentUser]);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    changeInDb(newTheme);
  }

  const changeInDb = async (newTheme) => {
    try {
      if(!currentUser) return;
      const id = currentUser._id;
      const res = await fetch(`/api/auth/setTheme/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: newTheme }),
      });
      const data = await res.json();
      if (res.ok) {
        setTheme(data.theme);
      } else {
        console.log("Failed to update theme in database");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Switch.Root 
        className="w-[42px] h-[25px] border-[1.8px] border-black rounded-full data-[state=checked]:bg-slate-800 data-[state=checked]:border-slate-50" 
        onCheckedChange={switchTheme} 
        checked={theme === "dark"}
      >
        <Switch.Thumb className="block w-[21px] h-[21px] translate-x-[2px] data-[state=checked]:translate-x-[19px] duration-300 transition-all">
          {theme === "dark" ? <IconMoon /> : <IconSun />}
        </Switch.Thumb>
      </Switch.Root>
    </div>
  );
}
