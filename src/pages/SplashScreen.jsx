import { useEffect, useState } from "react";
import { GoChecklist } from "react-icons/go";
import { useNavigate } from "react-router-dom";

useNavigate
export const SplashScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate('/home')

      return clearTimeout(timer);
    }, 3000)
  }, [navigate]);

  return (
    <div className=" w-screen h-screen bg-editColor-2 flex flex-col justify-center items-center text-5xl sm:text-6xl md:text-7xl text-amber-50">
      <GoChecklist className="text-9xl mb-3" />
      <h1 className="mb-3">Shopping</h1>
      <h1>List</h1>
    </div>
  )
};