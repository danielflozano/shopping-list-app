import { FaPlus } from "react-icons/fa6";
export const AddButton = ({ onClick }) => {
  return (
    <button
    onClick={onClick}
    className="flex justify-center items-center fixed bottom-5 right-5 bg-editColor-1 text-3xl text-editColor-5 rounded-full w-14 h-14"
  >
    <FaPlus />
  </button>
  );
};