import React, {useState, Suspense} from 'react'
import FormLoader from '../Loader/Loader'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Modal } from 'react-tailwind-flex-modal'
import 'react-tailwind-flex-modal/dist/index.css'
import PropTypes from 'prop-types'

const Form = () => {
	const dispatch = useDispatch()
	function resetStepper() {
		dispatch({type: 'formPage/formPageHandler', payload: 1})
	}
	
	const currentPage = useSelector(state => state.page)
	const [showModal, setShowModal] = useState(false)
	const [currentModal, setCurrentModal] = useState('')

	/**
 	* Handles navigation direction of forms
 	*
 	* @return void
 	* 
 	* @version 1.0
 	* 
 	*/
	function handleClick(direction) {
		direction === 'next' ? 
			dispatch({type: 'formPage/formPageHandler', payload: currentPage + 1}) 
			: 
			dispatch({type: 'formPage/formPageHandler', payload: currentPage - 1})
	}

	/**
 	* Displays forms related to current step
 	*
 	* @return jsx
 	* 
 	* @version 1.0
 	* 
 	*/
	const FormDisplay = () => {
		if (currentPage === 1) {
			return <PersonalDetails />
		} else if (currentPage === 2){
			return <Adress />
		} else if (currentPage === 3){
			return <ProfessionalDetails />
		} else if (currentPage === 4){
			return <Complete />
		}
		return
	}

	const modalTitle = 'CONGRATULATIONS!'
	const message = 'A new employee has been created.'
	const closeMessage = 'Close'

	function handleClose(e) {
		e.preventDefault()
		e.stopPropagation()
		resetStepper()
		setShowModal(false)
		setCurrentModal('')
	}

	const PersonalDetails = React.lazy(()=> import('./PersonalDetails'))
	const Pagination = React.lazy(()=> import('./Pagination'))
	const Stepper = React.lazy(()=> import('./Stepper'))
	const ProfessionalDetails = React.lazy(()=> import('./ProfessionalDetails'))
	const Adress = React.lazy(()=> import('./Adress'))
	const Complete = React.lazy(()=> import('./Complete'))
	
	return (
		<>
			<Suspense fallback={<FormLoader/>}>	
				<Stepper currentPage={currentPage}/>
				{FormDisplay()}
				<Pagination 
					currentPage={currentPage} 
					handleClick={handleClick} 
					setShowModal={setShowModal} 
					setCurrentModal={setCurrentModal}
				/>
			
				{showModal ? 
					<Modal 
						setShowModal={setShowModal} 
						successTitle={modalTitle} 
						message={message} 
						closeMessage={closeMessage} 
						resetStepper={resetStepper}
						handleClose={handleClose}
						currentModal={currentModal}
					/> 
					: 
					<div></div>  }
			</Suspense>
		</>
	)
}

Form.propTypes = {
	currentPage: PropTypes.number,
	handleClick: PropTypes.func,
	setShowModal: PropTypes.func,
	setCurrentModal: PropTypes.func
}

export default Form