import React  from 'react'
import { Link } from 'react-router-dom'
import { CgArrowRightR } from 'react-icons/cg'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

/**
* Displays a link in header
*
* @return jsx
* 
* @version 1.0
* 
*/
const NavLink =(props) => {
	const page = props.page
	if(page === 'Home') {
		return (
			<motion.div
				initial={{ opacity: 0}}
				animate={{ opacity: 1}}
				exit={{ opacity: 0}}
				transition={{ duration: 0.45, delay: 0.25 }}
			>
				<div className="absolute top-1.5 right-4 lg:right-28 flex flex-col justify-between mt-2 lg:mt-14 items-center hover:text-lime-600 h-16 dark:text-white">
					<div className="flex">
						<CgArrowRightR className="mt-1" />
						<Link to="/employees" aria-label="View employees">
							<span className="w-72 underline ml-4">View Current Employees</span>
						</Link>
					</div>
				</div>
			</motion.div>
		)
	} else {
		return (
			<motion.div
				initial={{ opacity: 0}}
				animate={{ opacity: 1}}
				exit={{ opacity: 0}}
				transition={{ duration: 0.45 }}
			>
				<div className="absolute top-1.5 right-4 lg:right-28 flex flex-col justify-between mt-2 lg:mt-14 items-center hover:text-lime-600 h-16 dark:text-white">
					<div className="flex">
						<CgArrowRightR className="mt-1" />
						<Link to="/" aria-label="Add employee">
							<span className="w-72 underline ml-4">Add a new Employee</span>
						</Link>
					</div>
				</div>
			</motion.div>
		)
	} 
}

NavLink.propTypes = {
	page: PropTypes.string.isRequired,
}

export default NavLink