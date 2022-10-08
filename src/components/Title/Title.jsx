import React from 'react'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import PropTypes from 'prop-types'

/**
* Title of pages
*
* @return jsx
* 
* @version 1.0
* 
*/
function Title(props) {
	return (
		<LazyMotion features={domAnimation}>
			<m.div
				initial={{ opacity: 0, scale: 0.25, y: '-100%'}}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.75}}
				transition={{ duration: 0.35, ease: [0.6, 0.01, -0.05, 0.95] }}
			>
				<h1 className="text-center -mt-12 mb-4 text-lg dark:text-white">{props.title}</h1>
			</m.div>
		</LazyMotion>
	)
}

Title.propTypes = {
	title: PropTypes.string.isRequired
}

export default Title