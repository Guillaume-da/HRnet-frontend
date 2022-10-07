import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { MdLastPage } from 'react-icons/md'
import { MdFirstPage } from 'react-icons/md'
import { MdChevronLeft } from 'react-icons/md'
import { MdChevronRight } from 'react-icons/md'

const Pagination = (props) => {
	const dispatch = useDispatch()
	function handlePrevButton(){
		if(props.state?.pageIndex) {
			dispatch({type: 'tablePaginationIndex/tablePaginationIndex', payload: props.state.pageIndex - 1})
		}
		props.previousPage?.()
	}
	function handleNextButton(){
		if(props.state?.pageIndex) {
			dispatch({type: 'tablePaginationIndex/tablePaginationIndex', payload: props.state.pageIndex + 1})
		}
		props.nextPage?.()
	}
	function handleGoToPage(item) {
		dispatch({type: 'tablePaginationIndex/tablePaginationIndex', payload: item})
		props.gotoPage?.(item)
	}
	
	const pageIndex = props?.state?.pageIndex
	
	return (
		<>
			{props.pageOptions.length >= 10 ?
				<nav
					className="flex rounded-md shadow-sm justify-between"
					aria-label="Pagination"
				>
					{props.canPreviousPage ? 
						<>
							<button
								type="button"
								className="inline-flex items-center py-2 text-sm font-medium text-gray-500 -mr-2"
								onClick={() => handleGoToPage(0)}
							>
								<span className="sr-only">First</span>
								<MdFirstPage className="h-6 w-6 bg-white dark:bg-zinc-900 text-gray-400"/>
							</button> 
							<button
								type="button"
								className="inline-flex items-center py-2 text-sm font-medium text-gray-500 -mr-2"
								onClick={() => handlePrevButton()}
							>
								<span className="sr-only">Previous</span>
								<MdChevronLeft className="h-7 w-7 bg-white dark:bg-zinc-900"/>
							</button>
						</>
						:
						<div></div>
					}
					{pageIndex > ((props.pageOptions.length / 2) - 1) ? <div className="h-7 py-7 flex items-center justify-center ml-2"> ... </div> : <></>}
					{pageIndex < ((props.pageOptions.length / 2) - 1) ?
						(props.pageOptions.slice(0, props.pageOptions.length / 2 )).map((item) => {if(Number(item) === props.state?.pageIndex) {
							return <div className="h-9 w-9 text-black flex rounded-lg justify-center align-middle bg-stone-300 dark:bg-zinc-800 dark:text-white pt-1 mt-2 ml-2" key={`${item}`}>{Number(item) + 1}</div>
						} else {
							return <div onClick={() => handleGoToPage(Number(item))} className="h-9 w-9 text-white flex rounded-lg justify-center align-middle bg-lime-600 dark:bg-lime-700 pt-1 mt-2 ml-2 cursor-pointer" key={`${item}`}>{Number(item) + 1}</div>
						}})
						:
						(props.pageOptions.slice(-((props.pageOptions.length / 2 ))-1)).map((item) => {
							if(Number(item) === props.state?.pageIndex) {
								return <div className="h-9 w-9 text-black flex rounded-lg justify-center align-middle bg-stone-300 dark:bg-zinc-800 dark:text-white pt-1 mt-2 ml-2" key={`${item}`}>{Number(item) + 1}</div>
							} else {
								return <div onClick={() => handleGoToPage(Number(item))} className="h-9 w-9 text-white flex rounded-lg justify-center align-middle bg-lime-600 dark:bg-lime-700 pt-1 mt-2 ml-2 cursor-pointer" key={`${item}`}>{Number(item) + 1}</div>
							}})
					}
					
					{pageIndex < ((props.pageOptions.length / 2) - 1) ? <div className="h-7 py-7 flex items-center justify-start ml-2"> ... </div> : <></>}
					{props.canNextPage ? 
						<>
							<button
								type="button"
								className="inline-flex items-center py-2 text-sm font-medium text-gray-500 -mr-2"
								onClick={() => handleNextButton()}
							>
								<span className="sr-only">Next</span>
								<MdChevronRight className="h-7 w-7 bg-white dark:bg-zinc-900"/>
							</button> 
							<button
								type="button"
								className="inline-flex items-center py-2 text-sm font-medium text-gray-500 -mr-2"
								onClick={() => handleGoToPage((props.pageOptions.length) - 1)}
							>
								<span className="sr-only">Last</span>
								<MdLastPage className="h-6 w-6 bg-white dark:bg-zinc-900 text-gray-400"/>
							</button> 
						</>
						:
						''
					}
				</nav>
			
				:
				<nav
					className="relative z-0 inline-flex rounded-md shadow-sm justify-between"
					aria-label="Pagination"
				>
					{props.canPreviousPage ? 
						<button
							type="button"
							className="inline-flex items-center py-2 text-sm font-medium text-gray-500 -mr-2"
							onClick={() => handlePrevButton()}
						>
							<span className="sr-only">Previous</span>
							<MdChevronLeft className="h-8 w-8 bg-white dark:bg-zinc-900"/>
						</button>
						:
						''
					}
					{props.pageOptions?.map((item) => {
						if(Number(item) === props.state?.pageIndex) {
							return <div className="h-8 w-8 text-black flex rounded-lg justify-center align-middle bg-stone-300 dark:bg-zinc-800 dark:text-white pt-1 mt-2 ml-2" key={`${item}`}>{Number(item) + 1}</div>
						} else {
							return <div onClick={() => handleGoToPage(Number(item))} className="h-8 w-9 text-white flex rounded-lg justify-center align-middle bg-lime-600 dark:bg-lime-700 pt-1 mt-2 ml-2 cursor-pointer" key={`${item}`}>{Number(item) + 1}</div>
						}})}
					{props.canNextPage ? 
						<button
							type="button"
							className="inline-flex items-center py-2 text-sm font-medium text-gray-500 -mr-2"
							onClick={() => handleNextButton()}
						>
							<span className="sr-only">Next</span>
							<MdChevronRight className="h-8 w-8 bg-white dark:bg-zinc-900"/>
						</button> 
						:
						''
					}
				</nav>
			}
		</>
 
	)
}

Pagination.propTypes = {
	previousPage: PropTypes.func.isRequired,
	canNextPage: PropTypes.bool,
	canPreviousPage: PropTypes.bool,
	pageOptions: PropTypes.array.isRequired,
	nextPage: PropTypes.func.isRequired,
	gotoPage: PropTypes.func.isRequired,
	state: PropTypes.shape({
		pageIndex: PropTypes.number.isRequired
	})
}

export default Pagination
