'use client'

import { createContext, useContext, useState } from 'react'

const AppContext = createContext({
  user: null, // firebase auth user info
  userData: {
    uid: '',
    role: '',
    settings: {},
    email: '',
    photoURL: '',
    employersList: [],
    workHistory: [],
    invoiceList: [],
  }, // user's app data
  employer: null, // Object { name, defaultRate, }
  rate: 0, // Number
  startTime: null, // Date object
  endTime: null, // Date object
  note: '', // String
  invoiceEvents: [],
  manualEntry: false,
})

export function AppWrapper({ children }) {
  const [state, setState] = useState({
    user: null,
    userData: {
      uid: '',
      role: '',
      settings: {},
      email: '',
      photoURL: '',
      employersList: [],
      workHistory: [],
      invoiceList: [],
    },
    employer: null,
    rate: 0,
    startTime: null,
    endTime: null,
    note: '',
    invoiceEvents: [],
    manualEntry: false,
  })

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
