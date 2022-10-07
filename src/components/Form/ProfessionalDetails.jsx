import React, {useMemo} from 'react'
import departments from '../../datas/departments'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

/**
* Displays form of third step 
*
* @return jsx - form
* 
* @version 1.0
* 
*/
const ProfessionalDetails = () => {
	const dispatch = useDispatch()
	const form = useSelector(state => state.form)
	const startdate = useSelector(state => state.form?.startDate)
	const department = useSelector(state => state.form?.department)

	const departmentsList = useMemo(() => departments, [departments])

	return (
		<div className="my-10 p-10">
			<div className="flex flex-col ">
				<div className="mx-2 w-full flex-1">
					<label htmlFor="startdate" className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
						Start date
					</label>
					<div className="my-2 flex rounded border border-gray-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-800">
						<input
							defaultValue={startdate ? startdate : ''}
							onChange={(event) => dispatch({type: 'form/addEmployee', payload: {...form, startDate: event.target.value}}) }
							name="startdate"
							type="date"
							className="w-full appearance-none p-1 px-2 text-gray-800 dark:text-gray-400 outline-none dark:bg-zinc-800 dark:border-zinc-800"
						/>
					</div>
				</div>
				<div className="mx-2 w-full flex-1">
					<label htmlFor="department" className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
						Department
					</label>
					<div className="my-2 flex rounded border border-gray-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-800">
						<select className="form-select appearance-none dark:bg-zinc-800 dark:border-zinc-800
						block
						w-full
						px-3
						py-1.5
						text-base
						font-normal
						text-gray-700
						dark:text-gray-400
						bg-white bg-clip-padding bg-no-repeat
						border border-solid border-gray-300
						rounded
						transition
						ease-in-out
						m-0
						focus:text-gray-700 focus:bg-white focus:border-lime-600 focus:outline-none" 
						aria-label="Select"
						name="department"
						defaultValue={department ? department : ''}
						onChange={(event) => dispatch({type: 'form/addEmployee', payload: {...form, department: event.target.value}}) }
						>
							{departmentsList?.map((department, index) => {
								return <option key={index} value={department.name} >{department.name} </option>
							})}
						</select>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfessionalDetails