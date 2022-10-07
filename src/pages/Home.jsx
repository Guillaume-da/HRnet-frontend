/* eslint-disable react/no-unknown-property */
import React from 'react'
import { m, LazyMotion, domAnimation } from 'framer-motion'

const Title = React.lazy(() => import('../components/Title/Title'))
const NavLink = React.lazy(() => import('../components/NavLink/NavLink'))
const Form = React.lazy(() => import('../components/Form/Form'))

const Home = () => { 
	return (
		<>
			<Title title="Create Employee"/>
			<NavLink page="Home"/>
			<LazyMotion features={domAnimation}>
				<m.div
					initial={{ opacity: 0, x: '-60%'}}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: '-20%'}}
					transition={{ duration: 0.65, ease: [0.6, 0.01, -0.05, 0.95] }}
				>	
					<div className="min-h-full lg:h-auto mx-auto rounded-2xl bg-white pb-2 shadow-xl max-w-screen-xl dark:bg-zinc-900">
						<div className="horizontal xl:container mt-5">
							<div className="my-10 p-2 lg:p-10">
								<Form />
							</div>
						</div>
					</div>
					
				</m.div>
			</LazyMotion>
		</>
	)
}

export default Home