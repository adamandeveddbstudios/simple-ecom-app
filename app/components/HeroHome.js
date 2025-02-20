
import Image from 'next/image'
import React from 'react'


const HeroHome = () => {
  return (
    <div className="container mx-auto px-4 py-3 relative">
    <Image 
        src="/hero-home.jpg" 
        width={1713} 
        height={622} 
        quality={100} 
        className="w-full rounded-lg shadow-md" 
        alt="homepage banner" 
    />
    <h1 className="absolute top-0 bottom-0 left-10 right-0 flex items-center text-white text-5xl font-bold drop-shadow-xl">
        Welcome to the website
    </h1>
</div>
  )
}

export default HeroHome