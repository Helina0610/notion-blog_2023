import Link from 'next/link';
import React from 'react'

export const HeroSection = () => {
  return (
		<section>
			<div className='flex flex-col md:items-start gap-8 py-16 w-4/5 mx-auto text-center md:text-left max-w-5xl'>
				<div className='relative' >
					<span className='absolute left-1/2 -bottom-2 -translate-x-1/2 rotate-45 bg-black w-6 h-6'></span>
					<span className='font-bold text-white bg-black py-2 px-2 rounded-lg relative'>WOW</span>
				</div>
				<h2 className='font-black text-6xl leading-[1.2] break-keep'>Hello, World! 아름다운 세상</h2>
				<p className='font-light text-xl text-gray-400 md:max-w-xl'>Be a Colorful Girl</p>
				<div>
					<Link href={"/about"}>
						<button className='px-4 py-2 border border-black rounded-3xl font-semibold hover:bg-black hover:text-white'>About Me</button>
					</Link>
				</div>
			</div>
		</section>
  )
}

export default HeroSection;
