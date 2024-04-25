import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-purple-300 flex gap-4 justify-between items-center w-[100vw] h-[6vh] px-4 fixed bottom-0">
      <div className="logo text-lg text-black italic">
          <span className="text-red-500">&lt;</span>
          Pass
          <span className="text-red-500">Manager/</span>
          <span className="text-red-500">&gt;</span>
        </div>
       <span className='flex items-center'> CopyRight<span className='text-2xl'> &#169; </span><span className='text-xs'>All Rights Reserved</span></span>
      </footer>
    </div>
  )
}

export default Footer
