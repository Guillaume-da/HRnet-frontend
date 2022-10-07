import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const Toggle = () => {
	const dispatch = useDispatch()
	const darkMode = useSelector(state => state.darkMode)
	const root = window.document.documentElement

	if(darkMode){
		root.classList.add('dark')
	} else if (root.classList.contains('dark')) {
		root.classList.remove('dark')
	}

	return (
		<div className="relative flex flex-col items-center justify-center">
			<div className="flex">
				<div className="inline-flex relative items-center cursor-pointer">
					<label className="visually-hidden">Dark Mode</label>
					<input
						type="checkbox"
						className="sr-only peer"
						checked={darkMode}
						readOnly
					/>
					<div
						onClick={() => {
							dispatch({type: 'darkMode/darkModeToggle'}) 
						}}
						className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-600 dark:peer-checked:bg-lime-700"
					></div>
					<span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
						Dark Mode
					</span>
				</div>
			</div>
		</div>
	)
}

export default Toggle