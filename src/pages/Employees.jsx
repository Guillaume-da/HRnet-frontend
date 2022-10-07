import React, { useMemo, useEffect, useState, Suspense } from 'react'
import Loader from '../components/Loader/Loader'
import Table from '../components/Table/Table'
import axios from 'axios'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import NavLink from '../components/NavLink/NavLink'
import Title from '../components/Title/Title'

const apiBaseUrl = axios.create({
	baseURL: 'https://safe-oasis-98646.herokuapp.com/',
})

const Employees = () => {
	const getEmployees = async () => {
		try {
			const response = await apiBaseUrl.get('/employees')
			if (response.status === 200) {
				console.log('API working')
				return response
			}
		} catch (error) {
			console.log(error)
		}
		return
	}

	const [users, setUsers] = useState(null)
	const [, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const getUsersData = async () => {
		try {
			const response = await getEmployees()
			const users = response?.data 
			
			setUsers(users)
		} catch (err) {
			setError(true)
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getUsersData()
	}, [])

	const usersData = useMemo(() => users, [users])
	const columns = useMemo(() => ([
		{
			Header: 'First name',
			accessor: 'firstName',
		},
		{
			Header: 'lastname',
			accessor: 'lastName'
		},
		{
			Header: 'startdate',
			accessor: 'startDate'
		},
		{
			Header: 'Department',
			accessor: 'department'
		},
		{
			Header: 'Date of birth',
			accessor: 'birthdate'
		},
		{
			Header: 'Street',
			accessor: 'street'
		},
		{
			Header: 'City',
			accessor: 'city'
		},
		{
			Header: 'State',
			accessor: 'state'
		},
		{
			Header: 'Zipcode',
			accessor: 'zipcode'
		},
		{
			Header: '_id',
			accessor: '_id'
		},
	]), [])
		
	if(usersData) {
		return (
			<>
				<Title title="Current Employees"/>
				<Suspense fallback={<Loader/>}>	
					<NavLink page="Employees"/>
					<LazyMotion features={domAnimation}>
						<m.div
							initial={{ opacity: 0, x: '-20%', y: 0}}
							animate={{ opacity: 1, x: 0, y: 0}}
							exit={{ opacity: 0, x: '-20%', y: 0 }}
							transition={{ duration: 0.65, ease: [0.6, 0.01, -0.05, 0.95]}}
						>
							<div className="2xl:px-20 px-1 pt-2 dark:bg-zinc-800 w-full -mt-4">  
								<div className="mx-auto bg-white dark:bg-zinc-900 pb-0 shadow-xl rounded-2xl dark:text-white">
									<div className="flex flex-col">
										<div className="w-full">
											<div className="py-0 px-2 border-b border-gray-200 dark:border-zinc-700 shadow rounded-2xl overflow-visible">
												<div id="dataTable" className="p-2 mx-auto">	
													<Table columns={columns} data={usersData} />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</m.div>
					</LazyMotion>
				</Suspense>
			</>
		) 
	} else {
		<Loader />
	}
}

export default Employees