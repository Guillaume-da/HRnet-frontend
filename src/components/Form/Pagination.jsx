import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Toggle from '../Toggle/Toggle'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const Pagination = (props) => {

	const currentPage = props.currentPage
	const handleClick = props.handleClick
	const setCurrentModal = props.setCurrentModal
	const setShowModal = props.setShowModal

	const dispatch = useDispatch()
	const apiBaseUrl = axios.create({
		baseURL: 'https://safe-oasis-98646.herokuapp.com/',
	})

	const form = useSelector(state => state.form)
	const firstName = useSelector(state => state.form?.firstName)
	const lastName = useSelector(state => state.form?.lastName)
	const birthdate = useSelector(state => state.form?.birthdate)
	const street = useSelector(state => state.form?.street)
	const city = useSelector(state => state.form?.city)
	const state = useSelector(state => state.form?.state)
	const zipcode = useSelector(state => state.form?.zipcode)
	const startDate = useSelector(state => state.form?.startDate)
	const department = useSelector(state => state.form?.department)

	const createEmployee = async (form) => {
		try {
			const response = await apiBaseUrl.post('/employees', form)
			if (response.status === 200) {
				console.log('Employee created')
				props.handleClick('next')
				setCurrentModal('simpleModal')
				setShowModal(true)
				dispatch({type: 'form/reset'}) 
			}
		} catch (error) {
			console.log(error)
			toast.error('Error', {toastErrorId: 'error'})
		}
	}

	const validation = (e) => {
		e.preventDefault
		if(props && props.currentPage === 1) {
			if(firstName === '') {
				toast.error('Please enter a first name', {toastId: 'firstnameError'})
			}
			else if(lastName === '') {
				toast.error('Please enter a last name', {toastId: 'lastnameError'})
			}
			else if(birthdate === '') {
				toast.error('Please enter a date of birth', {toastId: 'birthdateError'})
			}
			else {
				props.handleClick('next')
			} 
		} else if(props.currentPage === 2) {
			if(street === '') {
				toast.error('Please enter a street', {toastId: 'streetError'})
			}
			else if(city === '') {
				toast.error('Please enter a city', {toastId: 'cityError'})
			}
			else if(state === '') {
				toast.error('Please enter a state', {toastId: 'stateError'})
			}
			else if(zipcode === '') {
				toast.error('Please enter a zipcode', {toastId: 'zipcodeError'})
			}
			else {
				props.handleClick('next')
			} 
		} else if(props.currentPage === 3) {
			if(startDate === ''){
				toast.error('Please enter a date', {toastId: 'startDateError'})
			}
			else if(department === '') {
				toast.error('Please enter a department', {toastId: 'departmentError'})
			}
			else {
				createEmployee(form)
			} 
		}
	}

	return (
		<div className="relative">
			<div className="container mb-4 flex justify-around">
				{ currentPage === 1 || currentPage === 4 ? 
					<div></div> 
					: 
					<motion.div
						initial={{ opacity: 0, scale: 0.5}}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.75}}
						transition={{ duration: 0.35, delay: 0.65 }}
					>
						<button 
							onClick={() => handleClick()} 
							aria-label="Back"
							className= "cursor-pointer rounded-xl border-2 border-slate-300 bg-white dark:bg-zinc-800 py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-lime-700 hover:text-white" 
						>
						Back
						</button>
					</motion.div>
				}
				{ currentPage === 4 ? 
					<div></div>
					:
					<motion.div
						initial={{ opacity: 0, scale: 0.5}}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.75}}
						transition={{ duration: 0.35, delay: 0.45 }}
					>
						<button 
							onClick={(e) => validation(e)}
							aria-label="Next"
							className="cursor-pointer rounded-lg bg-lime-600 dark:bg-zinc-800 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out dark:hover:bg-lime-800 hover:bg-lime-700 hover:text-white" 
						>
							{currentPage === 3 ? 'Submit' : 'Next'}
						</button>
					</motion.div>
				}
			</div>
			<div className="absolute -bottom-16 left-2">
				<Toggle />
			</div>
		</div>
	)
}

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	handleClick: PropTypes.func.isRequired,
	setCurrentModal: PropTypes.func.isRequired,
	setShowModal: PropTypes.func.isRequired
}

export default Pagination