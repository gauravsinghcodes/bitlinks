import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='h-16 lg:h-20 bg-midnight sticky top-0 z-50 flex justify-between px-6 lg:px-16 items-center border-b border-white/5 shadow-2xl'>
      <div className="logo font-black text-xl lg:text-2xl tracking-tighter text-white flex items-center gap-2"> 
        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg lg:rounded-xl flex items-center justify-center text-white text-lg shadow-lg shadow-primary/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <Link href="/">BitLinks</Link>
      </div>
      <ul className='hidden md:flex justify-center gap-8 lg:gap-12 items-center font-bold text-slate-400 text-sm tracking-wide'>
        <Link href="/"><li className='hover:text-primary transition-all cursor-pointer'>Home</li></Link>
        <Link href="/#features"><li className='hover:text-primary transition-all cursor-pointer'>About</li></Link>
        <li className='flex gap-4 ml-6'>
          <Link href="/shorten">
            <button className='bg-primary hover:bg-primary/90 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl lg:rounded-2xl font-black text-xs lg:text-sm shadow-xl shadow-primary/20 active:scale-95 transition-all'>
              Get Started
            </button>
          </Link>
        </li>
      </ul>
      {/* Mobile Menu Icon (Simplified for now) */}
      <div className="md:hidden flex items-center gap-4">
        <Link href="/shorten">
          <button className='bg-primary text-white px-4 py-2 rounded-lg font-black text-[10px] shadow-lg'>
            Start Free
          </button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar