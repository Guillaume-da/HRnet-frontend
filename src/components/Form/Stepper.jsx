import React from 'react'
import PropTypes from 'prop-types'

const Stepper = (props) => {
	const currentPage = props.currentPage
	return (
		<div className="mx-4 p-4 flex justify-between items-center">
			<div className="w-full flex items-center">
				<div className="relative flex flex-col items-center text-teal-600 dark:text-white">
					<div
						className="rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 bg-lime-600 text-white font-bold border border-lime-600"
					>  
						{ currentPage === 2 || currentPage === 3 || currentPage === 4 ? <span className="text-white font-bold text-xl">&#10003;</span> : 1}
					</div>
					<div
						className="text-gray-900 dark:text-white absolute top-0  text-center mt-16 w-32 text-xs font-medium uppercase"
					>
						Personal information
					</div>
				</div>
				<div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${props.currentPage === 2 ? 'border-lime-600' : 'border-gray-300'}`}></div>
			</div>
			<div className="w-full flex items-center">
				<div className="relative flex flex-col items-center text-teal-600">
					<div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${props.currentPage === 2 || props.currentPage === 3 || props.currentPage === 4 ? 'bg-lime-600 text-white font-bold border border-lime-600' : ''}`} >   
						{ currentPage === 3 || currentPage === 4 ? <span className="text-white font-bold text-xl">&#10003;</span> : 2} 
					</div>
					<div
						className={`absolute top-0 dark:text-white text-center mt-16 w-32 text-xs font-medium uppercase ${props.currentPage === 2 || props.currentPage === 3 ? 'text-gray-900' : 'text-gray-400' }`}
					>
						Adress
					</div>
				</div>
				<div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
			</div>
			<div className="w-full flex items-center">
				<div className="relative flex flex-col items-center text-teal-600">
					<div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${props.currentPage === 3 || props.currentPage === 4 ? 'bg-lime-600 text-white font-bold border border-lime-600' : ''}`} >   
						{ currentPage === 4 ? <span className="text-white font-bold text-xl">&#10003;</span> : 3} 
					</div>
					
					<div className={`absolute top-0 dark:text-white text-center mt-16 w-32 text-xs font-medium uppercase ${props.currentPage === 3 ? 'text-gray-900' : 'text-gray-400' }`} >
						Professional information
					</div>
				</div>
				<div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
			</div>
			<div className="flex items-center">
				<div className="relative flex flex-col items-center text-teal-600">
					<div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${props.currentPage === 4 ? 'bg-lime-600 text-white font-bold border border-lime-600' : ''}`} >   
						{ currentPage === 4 ? <span className="text-white font-bold text-xl">&#10003;</span> : 4} 
					</div>
					<div className={`absolute top-0 dark:text-white text-center mt-16 w-32 text-xs font-medium uppercase ${props.currentPage === 4 ? 'text-gray-900' : 'text-gray-400' }`} >
						Complete
					</div>
				</div>
				<div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
			</div>
		</div>
	)
}

Stepper.propTypes = {
	currentPage: PropTypes.number.isRequired
}

export default Stepper