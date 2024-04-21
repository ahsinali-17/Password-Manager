import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-purple-300 flex justify-between items-center w-[100vw] h-[6vh] px-8">
      <div className="logo font-bold text-2xl text-white italic">
        <span className="text-red-500">&lt;</span>
        Pass
        <span className="text-red-500">Manager/</span>
        <span className="text-red-500">&gt;</span>
      </div>

          <a className="flex items-center cursor-pointer font-semibold" href="https://github.com/ahsinali-17" target="_blank">
             <img src="github.svg" alt="GitHub"/>GitHub
          </a> 
       
    </nav>
  );
};

export default Navbar;
