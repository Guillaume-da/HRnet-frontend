/* eslint-disable no-undef */
export const plugins = {
	tailwindcss: {},
	autoprefixer: {},
	...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
}
