import React from 'react'
import { CSVLink } from 'react-csv'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import PropTypes from 'prop-types'
import 'tw-elements'

/**
* Dropdown allowing to export table in PDF or CSV 
*
* @return jsx
* 
* @version 1.0
* 
*/
const Dropdown = (props) => {
	const rowsTable = props?.rows

	/**
	* Export table in PDF format
	*
	* @return jsx - form
	* 
	* @version 1.0
	* 
	*/
	const exportPDF = (datas) => {
		const unit = 'pt'
		const size = 'A4' // Use A1, A2, A3 or A4
		const orientation = 'landscape' // portrait or landscape
		const marginLeft = 40
		const doc = new jsPDF(orientation, unit, size)
		doc.setFontSize(15)
		const title = 'HRnet employees'
		const headers = [['firstName', 'lastName', 'birthdate', 'street', 'city', 'state', 'zipcode', 'startDate', 'department']]
		const csvData = datas?.map(employee=> [employee.firstName, employee.lastName, employee.birthdate, employee.street, employee.city, employee.state, employee.zipcode, employee.startDate, employee.department])
		
		doc.text(title, marginLeft, 40)
		autoTable(doc, {
			startY: 50,
			head: headers,
			body: csvData,
			theme: 'grid',
		})
		
		doc.save('HRnet-employees.pdf')
	}

	const headers = [
		{ label: 'firstname', key: 'firstName' },
		{ label: 'lastName', key: 'lastName' },
		{ label: 'startDate', key: 'startDate' },
		{ label: 'street', key: 'street' },
		{ label: 'city', key: 'city' },
		{ label: 'state', key: 'state' },
		{ label: 'zipcode', key: 'zipcode' },
		{ label: 'birthdate', key: 'birthdate' },
		{ label: 'department', key: 'department' },
	]

	const searchResults = rowsTable?.map((item)=> item.values)
	function handlePdfExport() {
		exportPDF(searchResults)
	}

	return (
		<div className="flex justify-center">
			<div>
				<div className="dropdown relative">
					<a
						className="
									dropdown-toggle
									px-6
									py-2.5
									bg-lime-600
									dark:bg-lime-700
									text-white
									font-medium
									text-sm
									leading-tight
									rounded
									shadow-md
									hover:bg-lime-700 hover:shadow-lg
									focus:bg-lime-700 focus:shadow-lg focus:outline-none focus:ring-0
									active:bg-lime-800 active:shadow-lg active:text-white
									transition
									duration-150
									ease-in-out
									flex
									items-center
									whitespace-nowrap
									lg:ml-105
									"
						href="#"
						type="button"
						id="dropdownMenuButton2"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
								Export table
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							data-icon="caret-down"
							className="w-2 ml-2"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 320 512"
						>
							<path
								fill="currentColor"
								d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
							></path>
						</svg>
					</a>
					<ul
						className="
									dropdown-menu
									min-w-max
									absolute
									hidden
									bg-white
									dark:bg-zinc-800
									text-base
									z-50
									float-left
									py-2
									list-none
									text-left
									rounded-lg
									shadow-lg
									mt-1
									hidden
									m-0
									bg-clip-padding
									border-none
									"
						aria-labelledby="dropdownMenuButton2"
					>
						<li>
							<a
								className="
											dropdown-item
											text-xs
											py-2
											px-4
											font-normal
											block
											w-full
											whitespace-nowrap
											bg-transparent
											text-gray-700
											dark:text-white
											hover:bg-gray-100
											dark:hover:bg-zinc-900
											"
								onClick={() => handlePdfExport()}
								href="#"
							>Export as PDF</a
							>
						</li>
						<li>
							<CSVLink className="
											dropdown-item
											text-xs
											py-2
											px-4
											font-normal
											block
											w-full
											whitespace-nowrap
											bg-transparent
											text-gray-700
											dark:text-white
											hover:bg-gray-100
											dark:hover:bg-zinc-900
											"
							filename={'HRnet-employees.csv'}
							data={searchResults} headers={headers}>Export as CSV</CSVLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

Dropdown.propTypes = {
	rows: PropTypes.array
}

export default Dropdown