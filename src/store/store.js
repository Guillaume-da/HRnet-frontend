import { createSlice, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' 
import {combineReducers} from 'redux'
import { persistReducer, persistStore } from 'redux-persist'

const darkModeSlice = createSlice({
	name: 'darkMode',
	initialState: false,
	reducers: {
		darkModeToggle: (darkMode) => {
			return darkMode = !darkMode
		},
	}
})

const entriesByPageSlice = createSlice({
	name: 'entriesByPage',
	initialState: 10,
	reducers: {
		entriesByPage: (state, action) => {
			return action.payload
		},
	}
})

const tablePaginationSlice = createSlice({
	name: 'tablePaginationIndex',
	initialState: 0,
	reducers: {
		tablePaginationIndex: (state, action) => {
			return action.payload
		},
	}
})

const formPageSlice = createSlice({
	name: 'formPage',
	initialState: 1,
	reducers: {
		formPageHandler: (state, action) => {
			return action.payload
		},
	}
})

const formSlice = createSlice({
	name: 'form',
	initialState: {
		'firstName': '',
		'lastName': '',
		'birthdate': '',
		'street': '',
		'city': '',
		'state': '',
		'zipcode': '',
		'startDate': '',
		'department': ''

	},
	reducers: {
		addEmployee: (state,action) => {
			return action.payload
		},
		reset() {
			return {
				'firstName': '',
				'lastName': '',
				'birthdate': '',
				'street': '',
				'city': '',
				'state': '',
				'zipcode': '',
				'startDate': '',
				'department': ''
			}
		}
	},
	
})

const reducers = combineReducers({
	form: formSlice.reducer,
	darkMode: darkModeSlice.reducer,
	page: formPageSlice.reducer,
	tablePaginationIndex: tablePaginationSlice.reducer,
	entriesByPage: entriesByPageSlice.reducer
})

const persistedConfig = {
	key: 'root',
	storage
}

const persistedReducer = persistReducer(persistedConfig, reducers)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})

export const persistor = persistStore(store)