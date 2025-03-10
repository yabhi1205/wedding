import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <div className='relative h-[100dvh] w-[100vw] flex justify-center items-center'>
            {/* <div className='w-full h-[50vh] bg-[#86A788]' /> */}
            <img src="/images/t.png" className='absolute -bottom-10 -z-10' alt="" />
            <img src="/images/q.png" className='absolute bottom-[20%] w-[60%] right-0 left-10 m-auto ' alt="" />
            <div className='absolute top-[30%] text-center'>
                <h1 className='font-semibold text-[#86A788] text-4xl italicgit remote add origin https://github.com/Abhimrt/wedding.git '>ABHISHEK</h1>
                <h2 className='text-2xl'>weds</h2>
                <h1 className='font-semibold text-4xl text-[#86A788] italic '>PRACHI</h1>
            </div>
        </div>
    )
}

export default Hero