import React from 'react'
import { Link } from 'react-router-dom'
import '../../index.css'
import { useSelector } from 'react-redux'
import { m, LazyMotion, domAnimation } from 'framer-motion'

const Header = () => {
	const darkMode = useSelector(state => state.darkMode)
	
	return (
		<div className="relative h-20 sm:h-32 flex justify-between items-center bg:white dark:bg-zinc-800 mb-20  mx-2 md:mb-2 2xl:mx-20 px-4 dark:border-zinc-800 rounded dark:text-white">
			<Link to="/" className="dark:hidden"><img src='https://ik.imagekit.io/edukqfgq5/logo_Oy91PfjehE.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1664545359607' width="112" height="103" alt="" aria-label="Add employee" className="w-28 inline-block dark:hidden absolute top-2 left-2"/></Link>
			{darkMode ? <Link to="/"><h1 className="absolute left-0">Weather Health</h1></Link> : ''}
			{darkMode ? <Link to="/" data-mdb-ripple="true" className="dark:hidden"><h1>Weather Health</h1></Link> : <div></div>}
			<div className="absolute left-1/2 -translate-x-1/2 mt-28 md:-mt-6 flex flex-col h-36 items-center justify-center">
				<LazyMotion features={domAnimation}>
					<m.div
						initial={{ opacity: 0, y: '-100%'}}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: '100%'}}
						transition={{ duration: 0.35, delay: 0.35 }}
					>
						<h1 className="text-4xl lg:text-5xl font-bold underline p-0">
							HRnet
						</h1>   
					</m.div>
				</LazyMotion>
			</div>
		</div>
	)
}

export default Header