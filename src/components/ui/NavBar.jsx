'use client'

import React, { useEffect } from 'react'
import { useAppContext } from '@/context'
import { auth, db } from '@/services/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import userImage from '../../../public/user.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logOutUser } from '@/services/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import CreateAccount from '../account/CreateAccount'
import LogIn from '../account/LogIn'

const themes = [
  'dark',
  'bumblebee',
  'corporate',
  'synthwave',
  'cyberpunk',
  'halloween',
  'forest',
  'lofi',
  'fantasy',
  'wireframe',
  'black',
  'dracula',
  'autumn',
  'acid',
  'night',
  'coffee',
  'winter',
  'nord',
  'sunset',
]

const NavBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { state, setState } = useAppContext()
  const { user } = state

  useEffect(() => {
    // This will unsubscribe from auth changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setState((prev) => ({ ...prev, user: user }))
        // Listen to changes in user data
        const unsubscribeData = onSnapshot(
          doc(db, 'users', user.uid),
          (doc) => {
            if (doc.exists()) {
              setState((prev) => ({ ...prev, userData: doc.data() }))
            } else {
              // Handle the case where there is no user data document
              setState((prev) => ({ ...prev, userData: null }))
            }
          },
          (error) => {
            console.error('Error fetching user data:', error)
          },
        )
        router.push('/tracker')

        // Clean up the data subscription when the user logs out
        return () => unsubscribeData()
      } else {
        //router.push('/')
        setState((prev) => ({
          ...prev,
          user: null,
          userData: null,
          employer: null,
          rate: null,
          startTime: null,
          endTime: null,
          note: null,
        }))
      }
    })

    // Clean up the auth subscription on component unmount
    return () => unsubscribeAuth()
  }, [])

  function closeDropdown() {
    document.getElementById('menu_dropdown').removeAttribute('open')
    document.getElementById('theme_controller').removeAttribute('open')
  }

  return (
    <div className="navbar bg-gradient-to-br from-primary to-accent shadow-lg shadow-accent/20 border-b border-secondary">
      <CreateAccount />
      <LogIn />
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl text-accent-content">
          🧑🏻‍💻 devTracker v1.0
        </Link>
        {/* <p>{pathname}</p> */}
      </div>
      <div className="flex flex-row items-center gap-1 me-2">
        {!user && (
          <button
            className="btn btn-base-300 text-white"
            onClick={() => document.getElementById('log_in').showModal()}
          >
            Sign In
          </button>
        )}
        {user && (
          <details id="menu_dropdown" className="dropdown dropdown-end">
            <summary className="m-1 btn btn-circle overflow-clip border border-accent hover:shadow-lg hover:shadow-primary/50">
              <img alt="User Icon" src={userImage.src} />
            </summary>
            <ul className="p-2 shadow-xl shadow-white/10 menu dropdown-content bg-base-100 rounded-box w-80  mt-4 border border-accent z-20">
              <p className="font-semibold my-2 bg-gradient-to-br from-primary to-accent from-10% to-90% text-transparent bg-clip-text uppercase mx-auto">
                {user?.email}
              </p>

              {pathname != '/tracker' && (
                <li onClick={() => closeDropdown()}>
                  <Link href="/tracker" className="justify-between">
                    Tracker
                  </Link>
                </li>
              )}
              {pathname != '/invoice' && (
                <li onClick={() => closeDropdown()}>
                  <Link href="/invoice" className="justify-between">
                    Generate Invoice
                  </Link>
                </li>
              )}
              {pathname != '/settings' && (
                <li onClick={() => closeDropdown()}>
                  <Link href="/settings" className="justify-between">
                    Settings
                  </Link>
                </li>
              )}
              <li onClick={() => closeDropdown()}>
                <button onClick={() => logOutUser()}>Logout</button>
              </li>
            </ul>
          </details>
        )}
        <details id="theme_controller" className="dropdown dropdown-end">
          <summary className="m-1 btn btn-ghost">
            {' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </summary>
          <ul className="p-2 mt-4 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <p className="px-3 py-2 font-semibold text-primary">
              Theme Controller
            </p>
            {themes?.map((theme) => (
              <li key={theme}>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start capitalize"
                  aria-label={theme}
                  value={theme}
                  onClick={() => closeDropdown()}
                />
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  )
}

export default NavBar
