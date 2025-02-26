import React from "react";
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isVisibleHandler } from "../store/slices/headerSlice";
import { handleLogout } from "../store/slices/authSlice";
import axios from "axios";

const Sidebar = ({ children }) => {

  const isVisible = useSelector(state => state.header.isVisible);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const onLogout = async () => {

    try {
      const result = await axios.get("http://localhost:4000/logout", {
        withCredentials: true
      });

      if(result.status === 200){
        dispatch(handleLogout());
      }
      console.log("successfully logged out");
      
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <>
      <aside
        className={`h-screen border-r-2 z-20 fixed screen-max-7:fixed overflow-hidden transition-all duration-300 ${
          isVisible ? "w-64" : "w-[78px] screen-max-7:w-0"
        } bg-white`}
      >
        <nav className="h-full flex flex-col ">
          <div className="w-full flex justify-end h-fit mt-5">
            <Menu
              size={40}
              className="cursor-pointer mr-3"
              onClick={() => {
                dispatch(isVisibleHandler());
              }}
            />
          </div>
          <ul className={`flex-1 p-3 mt-5`}>{children}</ul>
          {isLoggedIn && (
            <>
              <hr className="mx-3 my-3 " />
              <button onClick={onLogout} className="flex gap-3 px-3 pb-3 hover:bg-gray-200 mb-3 items-center py-2 font-medium rounded-md cursor-pointer bg-white mx-2">
                <LogOut className="mt-1" />
                {isVisible && <p className="text-xl">Logout</p>}
              </button>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

// this component will hold all the list items which we'll use to filter
// out the videos
export const SidebarItem = ({ icon, text, active }) => {

  const navigate = useNavigate();
  const isVisible = useSelector(state => state.header.isVisible);

  const sidebarClickHandler = (text) => {
      if(text == "Home"){
        navigate("/");
      }
  };

  return (
    <li
      className={`mb-3 flex gap-3 items-center py-2 px-3 font-medium rounded-md cursor-pointer transition ${
        active ? "bg-gray-400" : "bg-white hover:bg-gray-200"
      } `}

      onClick={() => sidebarClickHandler(text)}
    >
      {icon}
      {/* conditionally rendering the text based on the isOpen prop */}
      {isVisible && <span>{text}</span>}
    </li>
  );
};