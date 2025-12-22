import { useEffect } from "react";

export const useScrollPosition = (key: string) => {
  useEffect(() => {
    const savedPosition = sessionStorage.getItem(key);

    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
    }

    const handleScroll = () => {
      sessionStorage.setItem(key, window.scrollY.toString());
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [key]);
};
