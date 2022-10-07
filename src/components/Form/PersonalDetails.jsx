import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

/**
* Displays form of first step 
*
* @return jsx - form
* 
* @version 1.0
* 
*/
const PersonalDetails = () => {
	const dispatch = useDispatch()
	const form = useSelector(state => state.form)
	const firstName = useSelector(state => state.form?.firstName)
	const lastName = useSelector(state => state.form?.lastName)
	const birthdate = useSelector(state => state.form?.birthdate)
	
	return (
		<div className="my-10 p-10">
			<div className="flex flex-col">
				<div className="mx-2 w-full flex-1">
					<label htmlFor="firstname" className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500" >
						First name
					</label>
					<div className="my-2 flex rounded border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 p-1" >
						<input
							defaultValue={firstName ? firstName : ''}
							onChange={(event) => dispatch({type: 'form/addEmployee', payload: {...form, firstName: event.target.value}}) }
							name="firstname"
							placeholder="Enter the First Name"
							className="w-full appearance-none p-1 bg-white px-2 text-gray-400 dark:text-gray-400 outline-none dark:bg-zinc-800"
						/>
					</div>
				</div>
				<div className="mx-2 w-full flex-1">
					<label htmlFor="lastname" className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500" >
						Last name
					</label>
					<div className="my-2 flex rounded border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 p-1" >
						<input
							defaultValue={lastName ? lastName : ''}
							onChange={(event) => dispatch({type: 'form/addEmployee', payload: {...form, lastName: event.target.value}}) }
							name="lastname"
							placeholder="Enter the Last Name"
							className="w-full appearance-none p-1 px-2 text-gray-400 dark:text-gray-400 outline-none dark:bg-zinc-800 dark:focus:bg-zinc-800 dark:active:bg-zinc-600"
						/>
					</div>
				</div>
				<div className="mx-2 w-full flex-1">
					<label htmlFor="birthdate" className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500" >
						Date of birth
					</label>
					<div className="my-2 flex rounded border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 p-1" >
						<input
							defaultValue={birthdate ? birthdate : ''}
							onChange={(event) => dispatch({type: 'form/addEmployee', payload: {...form, birthdate: event.target.value}}) }
							name="birthdate"
							type="date"
							className="w-full appearance-none p-1 px-2 text-gray-400 outline-none dark:bg-zinc-800"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PersonalDetails