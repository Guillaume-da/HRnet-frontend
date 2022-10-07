import React from 'react'
import 'tw-elements'

const Loader = () => {
	return (
		<div className="flex justify-center items-center h-screen fixed inset-0">
			<div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-lime-600 bg-opacity-50" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	)
}

export default Loader