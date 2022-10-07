import React from 'react'
import PropTypes from 'prop-types'

/**
* Table search function
*
* @return jsx
* 
* @version 1.0
* 
*/
const GlobalFilter = (props) => {
	const [value, setValue] = React.useState(props.globalFilter)
	const onChange = props.useAsyncDebounce((value) => {
		props.setGlobalFilter(value || undefined)
	}, 200)
  
	return (
		<div className="flex justify items-center mt-4 mr-4 w-full lg:w-auto">
			<div className="relative w-full lg:w-auto"> 
				<div className="absolute top-4 left-3">
					<i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
				</div>
				<input
					type="text"
					className="h-14 w-full lg:w-96 pl-10 pr-20 shadow rounded-lg z-0 focus:shadow focus:outline-none dark:bg-zinc-800"
					value={value || ''}
					onChange={(e) => {
						setValue(e.target.value)
						onChange(e.target.value)
					}}
					placeholder="Type here..."
				/>
				<div className="absolute top-2 right-2">
					<button className="h-10 w-20 text-white rounded-lg bg-lime-600 dark:bg-lime-700 dark:hover:bg-lime-800 hover:bg-lime-700">Search</button>
				</div>
			</div>
		</div>
	)
}

GlobalFilter.propTypes = {
	globalFilter: PropTypes.any,
	useAsyncDebounce: PropTypes.func.isRequired,
	setGlobalFilter: PropTypes.func.isRequired,
}

export default GlobalFilter