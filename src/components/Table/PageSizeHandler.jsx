import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

/**
* Allows to handle per page rows number
*
* @return jsx
* 
* @version 1.0
* 
*/
const PageSizeHandler = (props) => {
	const dispatch = useDispatch()
	const initialValue = useSelector(state => state.entriesByPage)
	function handlePageSize(e) {
		dispatch({type: 'entriesByPage/entriesByPage', payload: Number(e.target.value)})
		dispatch({type: 'tablePaginationIndex/tablePaginationIndex', payload: 0})
		props.setPageSize(Number(e.target.value))
	}

	return (
		<label>
			<div className="flex items-baseline">
				<span>Show</span>
				<select
					className="h-14 w-66 pl-10 pr-20 bg-white shadow rounded-lg z-0 focus:shadow focus:outline-none mx-4 mt-4 dark:bg-zinc-800"
					value={initialValue}
					onChange={(e) => {
						handlePageSize(e)
					}}
				>
					{[5, 10, 20].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							{pageSize}
						</option>
					))}
				</select>
				<span>Entries</span>
			</div>
		</label>
	)
}

PageSizeHandler.propTypes = {
	setPageSize: PropTypes.func.isRequired
}

export default PageSizeHandler