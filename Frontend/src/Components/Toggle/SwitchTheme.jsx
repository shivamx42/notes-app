import React, { useState, useEffect, useRef } from 'react';
import * as Switch from '@radix-ui/react-switch';
import { IconMoon, IconSun } from './Icons';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentUser } from '../../redux/user/userSlice';


export default function SwitchTheme() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const [theme, setTheme] = useState(currentUser?.theme || "light");
  const ref = useRef(null);


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

    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(newTheme);
      changeInDb(newTheme);
      return;
    }

    document.startViewTransition( () => {
      setTheme(newTheme);
       changeInDb(newTheme);
    }).ready.then(() => {
      const { top, left, width, height } = ref.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const right = window.innerWidth - left;
      const bottom = window.innerHeight - top;
      const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 800,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  const changeInDb = async (newTheme) => {
    try {
      if (!currentUser) return;
      const id = currentUser._id;
      const res = await fetch(`/api/auth/setTheme/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: newTheme }),
      });


      const data = await res.json();
      if (res.status == 200) {
        dispatch(updateCurrentUser({ ...currentUser, theme: data.theme }));
      } else {
        console.log('Failed to update theme in database');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Switch.Root 
        className="w-[42px] h-[25px] border-[1.8px] border-black rounded-full data-[state=checked]:bg-slate-800 data-[state=checked]:border-slate-50" 
        onCheckedChange={switchTheme} 
        checked={theme === "dark"}
      >
        <Switch.Thumb 
          className="block w-[21px] h-[21px] translate-x-[2px] data-[state=checked]:translate-x-[19px] duration-300 transition-all"
          ref={ref}
        >
          {theme === "dark" ? <IconMoon /> : <IconSun />}
        </Switch.Thumb>
      </Switch.Root>
    </div>
  );
}
