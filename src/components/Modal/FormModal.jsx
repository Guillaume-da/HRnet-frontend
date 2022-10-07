import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

/**
 * Allows to modify an employee in db
 *
 * @param {object} props - contains all datas related to employee (id, firstName, lastName, startDate, department, birthdate, street, city, state, zipcode )
 *
 * @return void
 * 
 * @version 1.0
 * 
 */
const FormModal = (props) => {
	const firstName = props.firstName
	const lastName = props.lastName
	const id = props.id
	const startDate = props.startDate
	const department = props.department
	const birthdate = props.birthdate
	const street = props.street
	const city = props.city
	const zipcode = props.zipcode
	const employeeState = props.employeeState
	const setShowModal = props.setShowModal
	const setFirstName = props.setFirstName
	const setLastName = props.setLastName
	const setBirthdate = props.setBirthdate
	const setDepartment = props.setDepartment
	const setCity = props.setCity
	const setStartDate = props.setStartDate
	const setStreet = props.setStreet
	const setEmployeeState = props.setEmployeeState
	const setZipcode = props.setZipcode
	const departmentsList = props.departmentsList
	const statesList = props.statesList
	
	const apiBaseUrl = axios.create({
		baseURL: 'https://safe-oasis-98646.herokuapp.com/',
	})

	const form = {
		_id: id,
		firstName: firstName,
		lastName: props.lastName,
		startDate: props.startDate,
		department: props.department,
		birthdate: props.birthdate,
		street: props.street,
		city: props.city,
		state: props.employeeState,
		zipcode: props.zipcode
	}

	/**
 	* Allows to add an employee in db
 	*
 	* @param {object} form - contains all datas related to employee (id, firstName, lastName, startDate, department, birthdate, street, city, state, zipcode )
 	*
 	* @return void
 	* 
 	* @version 1.0
 	* 
 	*/
	const createEmployee = async (form) => {
		try {
			const response = await apiBaseUrl.put('/employees/' + id, form)
			if (response.status === 200) {
				console.log('Employee created')
				console.log(response)
				window.location.reload()
			}
		} catch (error) {
			console.log(error)
		}
	}

	function handleFormSending(e) {
		// eslint-disable-next-line no-unused-expressions
		e.preventDefault
		createEmployee(form) 
		props.setShowModal(false)
	}

	return (
		<div className="w-full max-w-lg">
			<div className="flex flex-wrap -mx-3 mb-2">
				<div className="w-full md:w-1/2 px-3 ">
					<label className="block uppercase tracking-wide text-gray-600 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="grid-first-name">
                    First Name
					</label>
					<input 
						className="appearance-none block w-full bg-gray-200 text-gray-600 dark:text-gray-400 rounded py-3 px-4 leading-tight border border-gray-200 dark:border-zinc-800 focus:outline-none focus:bg-white dark:bg-neutral-700" 
						id="grid-first-name" 
						defaultValue={firstName}
						type="text" 
						placeholder={firstName} 
						onChange={(e) => setFirstName?.(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-1/2 px-3">
					<label className="block uppercase tracking-wide text-gray-600 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Last Name
					</label>
					<input 
						className="appearance-none block w-full bg-gray-200 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-800 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-neutral-700" 
						id="grid-last-name" 
						type="text" 
						defaultValue={lastName}
						placeholder={lastName} 
						onChange={(e) => setLastName?.(e.target.value)}
					/>
				</div>
			</div>
			<div className="w-full flex-1">
				<div className="h-6 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase leading-8 mb-2" >
                Date of birth
				</div>
				<div className="my-2 flex rounded border border-gray-200 dark:border-zinc-800 bg-gray-200 text-gray-700 dark:bg-neutral-700 p-1" >
					<input
						defaultValue={birthdate}
						placeholder={birthdate}
						onChange={(e) => setBirthdate?.(e.target.value)}
						name="birthdate"
						type="date"
						className="w-full appearance-none p-1 px-2 bg-gray-200 text-gray-600 dark:text-gray-400 outline-none dark:bg-neutral-700"
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3 mt-4">
				<div className="w-full md:w-1/2 px-3 mb-2">
					<label className="block uppercase tracking-wide text-gray-600 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="grid-state">
                    Department
					</label>
					<div className="relative">
						<select 
							aria-label="Select"
							className="block appearance-none w-full bg-gray-200 dark:bg-neutral-700 border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
							id="grid-state"
							name="employeeState"
							value={department}
							placeholder={department} 
							onChange={(e) => setDepartment?.(e.target.value)}
						>
							{departmentsList?.map((department, index) => {
								return <option key={index} value={department.name} >{department.name} </option>
							})}
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
							<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
						</div>
					</div>
				</div>
				<div className="w-full md:w-1/2 px-3">
					<label className="block uppercase tracking-wide text-gray-600 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    City
					</label>
					<input 
						className="appearance-none block w-full bg-gray-200 dark:bg-neutral-700 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-800 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
						id="grid-last-name" 
						type="text" 
						defaultValue={city}
						placeholder={city} 
						onChange={(e) => setCity?.(e.target.value)}
					/>
				</div>
			</div>
			<div className="w-full flex-1">
				<div className="h-6 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase leading-8" >
                Start Date
				</div>
				<div className="my-2 flex rounded border border-gray-200 dark:border-zinc-800 bg-gray-200 dark:bg-neutral-700 p-1" >
					<input
						defaultValue={startDate}
						name="birthdate"
						type="date"
						onChange={(e) => setStartDate?.(e.target.value)}
						className="w-full appearance-none p-1 px-2 bg-gray-200 text-gray-600 dark:text-gray-400 outline-none dark:bg-neutral-700"
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3 mb-3 mt-4">
				<div className="w-full px-3">
					<label className="block uppercase tracking-wide text-gray-600 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="grid-password">
                    Street
					</label>
					<input 
						className="appearance-none block w-full bg-gray-200 dark:bg-neutral-700 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-800 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
						id="grid-password" 
						type="text" 
						defaultValue={street}
						placeholder={street}
						onChange={(e) => setStreet?.(e.target.value)}
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3 mb-2">
				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<label className="block uppercase tracking-wide text-gray-600 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="grid-state">
                    State
					</label>
					<div className="relative">
						<select 
							aria-label="Select"
							className="block appearance-none w-full bg-gray-200 dark:bg-neutral-700 border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
							id="grid-state"
							name="employeeState"
							value={employeeState}
							placeholder={employeeState} 
							onChange={(e) => setEmployeeState?.(e.target.value)}
						>
							{statesList?.map((state, index) => {
								return <option key={index} value={state.name} >{state.name} </option>
							})}
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
							<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
						</div>
					</div>
				</div>
				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<label className="block uppercase tracking-wide text-gray-600 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="grid-zip">
                    Zip
					</label>
					<input 
						className="appearance-none block w-full bg-gray-200 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-zinc-800 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
						id="grid-zip" 
						type="text" 
						defaultValue={zipcode}
						placeholder={zipcode} 
						onChange={(e) => setZipcode?.(e.target.value)}
					/>
				</div>
            
			</div>
			<div className="flex flex-wrap -mx-3 mt-6 mb-2">
				<div className="w-full flex justify-between px-3">
					<button 
						className="w-5/12 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => {setShowModal(false)}}
					>
                    Cancel
					</button>
					<button 
						className="w-5/12 bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
						onClick={(e) => handleFormSending(e)}
					>
                    Save
					</button>
				</div>
			</div>
		</div>
	)
}

FormModal.propTypes = {
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	id: PropTypes.string,
	startDate: PropTypes.string.isRequired,
	department: PropTypes.string.isRequired,
	birthdate: PropTypes.string.isRequired,
	street: PropTypes.string.isRequired,
	city: PropTypes.string.isRequired,
	employeeState: PropTypes.string.isRequired,
	zipcode: PropTypes.string.isRequired,
	setShowModal: PropTypes.func.isRequired,
	setFirstName: PropTypes.func.isRequired,
	setLastName: PropTypes.func.isRequired,
	setBirthdate: PropTypes.func.isRequired,
	setDepartment: PropTypes.func.isRequired,
	setCity: PropTypes.func.isRequired,
	setStartDate: PropTypes.func.isRequired,
	setStreet: PropTypes.func.isRequired,
	setZipcode: PropTypes.func.isRequired,
	setEmployeeState: PropTypes.func.isRequired,
	departmentsList: PropTypes.array,
	statesList: PropTypes.arrayOf( 
		PropTypes.shape({
			name: PropTypes.string
		}),
	),
}

export default FormModal