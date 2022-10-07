import React from 'react'
import Loader from './components/Loader/Loader'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import { ToastContainer} from 'react-toastify'
import {AnimatePresence} from 'framer-motion'

const Home = React.lazy(() => import('./pages/Home'))
const Employees = React.lazy(() => import('./pages/Employees'))

const App = () => {
	const location = useLocation()
	return (
		<div className="dark:bg-zinc-800 min-h-screen overflow-hidden">
			<Header/>
			<AnimatePresence mode='wait'>
				<Routes location={location} key={location.pathname} >
					<Route path="/" element={<React.Suspense fallback={<Loader />}><Home /></React.Suspense>} />
					<Route path="/employees" element={<React.Suspense fallback={<Loader />}><Employees /></React.Suspense>} />
				</Routes>
			</AnimatePresence>
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div> 
	)
}

export default App