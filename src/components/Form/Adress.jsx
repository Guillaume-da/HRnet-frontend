import React, {useMemo} from 'react'
import  states from '../../datas/states'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

/**
* Displays form of second step 
*
* @return jsx - form
* 
* @version 1.0
* 
*/
const Adress = () => {
	const dispatch = useDispatch()
	const form = useSelector(state => state.form)
	const street = useSelector(state => state.form?.street)
	const city = useSelector(state => state.form?.city)
	const state = useSelector(state => state.form?.state)
	const zipcode = useSelector(state => state.form?.zipcode)

	const statesList = useMemo(() => states, [states])
	
	return (
		<div className="mt-10 p-10">
			<div className="flex flex-col ">
				<div className="mx-2 w-full flex-1">
					<label htmlFor="street" className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
						Street
					</label>
					<div className="my-2 flex rounded border border-gray-200 dark:border-zinc-800 bg-white p-1 dark:bg-zinc-800 p-1">
						<input
							defaultValue={street ? street : ''}
							onChange={(event) => dispatch({type: 'form/addEmployee', payload: {...form, street: event.target.value}}) }
							name="street"
							placeholder="Enter the Adress"
							className="w-full appearance-none p-1 px-2 text-gray-800 outline-none dark:bg-zinc-800 dark:text-gray-400"
						/>
					</div>
				</div>
				<div className="mx-2 w-full flex-1">
					<label htmlFor="city" className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
						City
					</label>
					<div className="my-2 flex rounded border border-gray-200 bg-white p-1 dark:bg-zinc-800 p-1 dark:border-zinc-800">
						<input
							defaultValue={city ? city : ''}
							onChange={(event) => dispatch({type: 'form/addEmployee', payload: {...form, city: event.target.value}}) }
							name="city"
							placeholder="Enter the city"
							className="w-full appearance-none p-1 px-2 text-gray-800 outline-none dark:bg-zinc-800 dark:text-gray-400"
						/>
					</div>
				</div>
				<div className="mx-2 w-full flex-1">
					<label htmlFor="state" className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
						State
					</label>
					<div className="my-2 flex rounded border border-gray-200 bg-white p-1 dark:bg-zinc-800 dark:border-zinc-800">
						<select className="form-select appearance-none dark:bg-zinc-800 dark:text-gray-400
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
						dark:border-zinc-800
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-zinc-100 focus:border-none active:border-stone-700 focus:outline-none" aria-label="State selector"
						name="state"
						defaultValue={state ? state: ''}
						onChange={(event) => dispatch({type: 'form/addEmployee', payload: {...form, state: event.target.value}}) }
						>
							{statesList?.map((state, index) => {
								return <option value={state.name} key={index}>{state.name}</option>
							})}
						</select>
					</div>
				</div>
				<div className="mx-2 w-full flex-1">
					<label htmlFor="zipcode" className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
						Zipcode
					</label>
					<div className="my-2 flex rounded border border-gray-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-800 ">
						<input
							defaultValue={zipcode ? zipcode : ''}
							onChange={(event) => dispatch({type: 'form/addEmployee', payload: {...form, zipcode: event.target.value}}) }
							name="zipcode"
							type="multiple"
							placeholder="Enter the zipcode"
							className="w-full appearance-none p-1 px-2 text-gray-400 outline-none dark:bg-zinc-800 dark:text-gray-400"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Adress