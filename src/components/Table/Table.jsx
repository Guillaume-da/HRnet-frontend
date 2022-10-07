/* eslint-disable no-unused-expressions */
import React, { useState, Suspense } from 'react'
import { SortDownIcon, SortUpIcon, SortIcon } from '../Icon/Icon'
import 'react-tailwind-flex-modal/dist/index.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { RiDeleteBinLine } from 'react-icons/ri'
import { RiEdit2Line } from 'react-icons/ri'
import statesList from '../../datas/states'
import departmentsList from '../../datas/departments'
import {useTable,useGlobalFilter,useAsyncDebounce,useFilters,useSortBy,usePagination} from 'react-table'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Modal } from 'react-tailwind-flex-modal'

const apiBaseUrl = axios.create({
	baseURL: 'https://safe-oasis-98646.herokuapp.com/employees',
})

const GlobalFilter = React.lazy(()=> import('./GlobalFilter'))
const Dropdown = React.lazy(()=> import('./Dropdown'))
const PageSizeHandler = React.lazy(()=> import('./PageSizeHandler'))
const Pagination = React.lazy(()=> import('./Pagination'))
const Toggle = React.lazy(()=> import('../Toggle/Toggle'))
const FormModal = React.lazy(()=> import('../Modal/FormModal'))

const Table = ({ columns, data }) => {
	
	const pageIndex = useSelector(state => state.tablePaginationIndex)
	const [showModal, setShowModal] = useState(false)
	const [currentModal, setCurrentModal] = useState('')

	const [warningTitle, setWarningTitle] = useState('')
	const [warningMessage, setWarningMessage] = useState('')
	const [closeMessage, setCloseMessage] = useState('')
	const [aprovalMessage, setAprovalMessage] = useState('')
	const [idToDelete, setIdToDelete] = useState(null)

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [birthdate, setBirthdate] = useState('')
	const [department, setDepartment] = useState('')
	const [city, setCity] = useState('')
	const [startDate, setStartDate] = useState('')
	const [street, setStreet] = useState('')
	const [employeeState, setEmployeeState] = useState('')
	const [zipcode, setZipcode] = useState('')
	const [id, setId] = useState('')

	const formComponent = 
	<FormModal 
		setShowModal={setShowModal} 
		setFirstName={setFirstName} 
		firstName={firstName} 
		lastName={lastName} 
		setLastName={setLastName} 
		startDate={startDate} 
		birthdate={birthdate} 
		department={department} 
		city={city} 
		departmentsList={departmentsList} 
		street={street} 
		zipcode={zipcode} 
		statesList={statesList} 
		employeeState={employeeState}
		setStartDate={setStartDate}
		setBirthdate={setBirthdate}
		setCity={setCity}
		setStreet={setStreet}
		setZipcode={setZipcode}
		setEmployeeState={setEmployeeState}
		setDepartment={setDepartment}
		id={id}
	/>

	function handleDelete(row) {
		const warningMessage = 'Warning!'
		const message = row.values.firstName + ' ' + row.values.lastName + ' will be deleted. Are you sure ?'
		const closeButtonMessage= 'Cancel'
		const aproval = 'Yes, do it!'
		setCurrentModal('aprovalModal')
		setShowModal(true),
		setWarningTitle(warningMessage)
		setCloseMessage(closeButtonMessage)
		setAprovalMessage(aproval)
		setIdToDelete(row.values._id)
		setWarningMessage(message)
	}

	function handleModify(row) {
		setCurrentModal('formModal')
		setShowModal(true),
		setId(row.values._id)
		setFirstName(row.values.firstName)
		setLastName(row.values.lastName)
		setBirthdate(row.values.birthdate)
		setDepartment(row.values.department)
		setCity(row.values.city)
		setStartDate(row.values.startDate)
		setStreet(row.values.street)
		setEmployeeState(row.values.state)
		setZipcode(row.values.zipcode)
	}

	const deleteEmployee = async (id) => {
		try {
			const response = await apiBaseUrl.delete('/' + id)
			if (response.status === 200) {
				toast.success('Employee deleted', {toastId: 'deleteError'})
				window.location.reload()
				return response
			}
		} catch (error) {
			console.log(error)
		}
	}

	function handleAproval(e) {
		e.preventDefault()
		e.stopPropagation()
		setShowModal(false)
		setCurrentModal('')
		deleteEmployee(idToDelete)
	}

	function handleClose(e) {
		e.preventDefault()
		e.stopPropagation()
		setShowModal(false)
		setCurrentModal('')
	}

	function handleCloseAproval(e) {
		e.preventDefault()
		e.stopPropagation()
		setShowModal(false)
		setCurrentModal('')
	}

	/**
	* Add two columns with buttons allowing to delete or modify a row
	*
	* @return void
	* 
	* @version 1.0
	* 
	*/
	const tableHooks = (hooks) => {
		
		hooks.visibleColumns.push((columns) => [
			{
				id: 'Edit',
				Header: 'Edit',
				Cell: ({ row }) => (
					<button onClick={() => handleModify(row)} className="bg-lime-700 hover:bg-lime-800 text-gray-100 text-xs py-1 px-3 rounded inline-flex items-center" aria-label="Edit">
						<RiEdit2Line className="text-base" />
					</button>
				),
			},
			...columns,
		])
		
		hooks.visibleColumns.push((columns) => [
			{
				id: 'Remove',
				Header: 'Remove',
				Cell: ({ row }) => (
					<button onClick={() => handleDelete(row)} className="bg-rose-700 dark:bg-red-400 hover:bg-red-900 text-gray-100 text-xs py-1 px-3 rounded inline-flex items-center" aria-label="Remove">
						<RiDeleteBinLine className="text-base" />
					</button>
				),
			},
			...columns,
		])
		
	}

	const pageSize = useSelector(state => state.entriesByPage)
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		rows, // search results, sorted results
		canPreviousPage,
		canNextPage,
		nextPage,
		pageOptions,
		previousPage,
		setPageSize,
		gotoPage,
		state,
		preGlobalFilteredRows,
		setGlobalFilter
	} = useTable({
		columns,
		data,
		initialState: { sortBy: [{id:'firstName', desc: false}], pageIndex: pageIndex, pageSize: pageSize,hiddenColumns: ['_id'] },
	},
	useFilters,
	useGlobalFilter,
	useSortBy,
	usePagination,
	tableHooks
	)

	return (
		<>
			{showModal ?
				<Modal 
					currentModal={currentModal}
					warningTitle={warningTitle} 
					closeMessage={closeMessage} 
					aprovalMessage={aprovalMessage} 
					setShowModal={setShowModal} 
					idToDelete={idToDelete} 
					deleteEmployee={deleteEmployee} 
					warningMessage={warningMessage}
					firstName={firstName}
					lastName={lastName}
					birthdate={birthdate}
					department={department}
					city={city}
					startDate={startDate}
					street={street}
					employeeState={employeeState}
					zipcode={zipcode}
					statesList={statesList}
					departmentsList={departmentsList}
					setFirstName={setFirstName}
					setLastName={setLastName}
					setBirthdate={setBirthdate}
					setDepartment={setDepartment}
					setCity={setCity}
					setStartDate={setStartDate}
					setStreet={setStreet}
					setEmployeeState={setEmployeeState}
					setZipcode={setZipcode}
					formComponent={formComponent}
					handleClose={handleClose}
					handleCloseAproval={handleCloseAproval}
					handleAproval={handleAproval}
				/>
				: 
				<div></div>
			}
			
			<div className="flex flex-col-reverse items-start lg:items-center lg:flex-row justify-between dark:bg-zinc-900 w-auto ml-4 gap-y-3.5"> 
				
				<PageSizeHandler state={state} setPageSize={setPageSize} />
				<Dropdown drag rows={rows} />
				
				<Suspense>	
					<GlobalFilter
						useAsyncDebounce={useAsyncDebounce}
						preGlobalFilteredRows={preGlobalFilteredRows}
						globalFilter={state.globalFilter}
						setGlobalFilter={setGlobalFilter}
					/>
				</Suspense>
				{headerGroups.map((headerGroup) =>
					headerGroup.headers.map((column, index) =>
						column.Filter ? (
							<div key={`${column}-${index}`}>{column.render('Filter')}</div>
						) : null
					)
				)}
			</div>
			<div className="flex flex-col">
				<div className="my-2 overflow-x-auto min-w-full -mx-4 lg:-mx-auto">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 dark:border-stone-700 sm:rounded-lg px-4 pb-2 pt-3 dark:bg-zinc-800">
							<table
								{...getTableProps()}
								className="min-w-full divide-y divide-gray-200 dark:divide-zinc-900"
							>
								<thead className="bg-yellow-50">
									{headerGroups.map((headerGroup, index) => (
										<tr {...headerGroup.getHeaderGroupProps()} key={`${headerGroup}-${index}`}>
											{headerGroup.headers.map((column, index) => (
											
												<th
													key={`${column}-${index}`}
													scope="col"
													className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:bg-neutral-600 dark:text-white"
													{...column.getHeaderProps(
														column.getSortByToggleProps()
													)} 
												>
													<div className="flex items-center justify-between">
														{column.render('Header')}
														<span>
															{column.isSorted && column.id != 'Remove' && column.id != 'Edit' ? (
																column.isSortedDesc ? (
																	<SortDownIcon className="w-4 h-4 text-lime-600" />
																) : (
																	<SortUpIcon className="w-4 h-4 text-lime-600" />
																)
															) : (
																column.id != 'Remove' && column.id != 'Edit' ? <SortIcon className="w-4 h-4 text-gray-300 " /> : <div></div> 
															)}
														</span>
													</div>
												</th>
														
											))}
										</tr>
									))}
								</thead>
								<tbody
									{...getTableBodyProps()}
									className="bg-white divide-y divide-gray-200 dark:divide-stone-600"
								>
									{data && data.length === 0 ? <p>No data available in table</p> : <></>}
									{rows.length === 0 ? <div className="py-8"><p>There is no result, sorry.</p></div> : <></>}
									{page.map((row, index) => {
										prepareRow(row)
										return (
											<tr {...row.getRowProps()} key={`${row}-${index}`} className="even:bg-stone-100 dark:bg-zinc-800 dark:text-white ">
												{row.cells.map((cell, index) => {
													return (
														<td
															key={`${cell}-${index}`}
															{...cell.getCellProps()}
															className="px-6 py-4 whitespace-nowrap font-normal text-sm text-slate-500 dark:text-white dark:odd:bg-zinc-900"
														>
															{cell.render('Cell')}
														</td>	
													)
												})}
											</tr>	
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			
			<div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between w-full px-4">
				<div >
					<Toggle/>
				</div>
				<div className="lg:ml-40 text-center mb-6 mt-4">
					<span >Showing {state.pageIndex === 0 ? + 1 : (state.pageIndex * state.pageSize) + 1} to {state.pageIndex === 0 ? state.pageSize : (state.pageSize * (state.pageIndex + 1))} of <span className="text-lime-600 font-semibold ml-1">{ data?.length } entries</span></span>
				</div>
					
				<Pagination 
					state={state} 
					previousPage={previousPage} 
					canPreviousPage={canPreviousPage}
					pageOptions={pageOptions}
					nextPage={nextPage}
					canNextPage={canNextPage}
					gotoPage={gotoPage}
				/>
					
			</div>
			
		</>
	)
}

Table.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	row: PropTypes.object
}

export default Table