/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,jsx}', 
		'./node_modules/tw-elements/dist/js/**/*.js', 
		'./node_modules/react-tailwind-flex-modal/dist/js/**/*.js'
	],
	darkMode: 'class',
	
	theme: {
		extend: {
			spacing: {
				'105': '105px',
				'90': '70px'
			},
			animation: {
				'fade-in-down': 'fade-in-down 0.5s ease-out',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
				'fade-in': 'fade-in 0.5s cubic-bezier(.3,.89,.44,1)'
			},
			keyframes: {
				'fade-in-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-25px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(25px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
				},
				'fade-in': {
					'0%': {
						opacity: '0',
					},
					'100%': {
						opacity: '1',
					},
				}
			},
			minHeight: {
				'500px': '500px',
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class',
		}),
		require('tw-elements/dist/plugin')
	],
	variants: {
		extend: {
			backgroundColor: ['even'],
		}
	},
}
