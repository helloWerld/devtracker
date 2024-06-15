'use client'

import React from 'react'
import hero from '../../../public/hero.png'
import { one, two, three, four, five } from '../../../public/avatars'

const Hero = () => {
  return (
    <div className="hero min-h-screen pt-6 sm:pt-12 lg:pt-0 bg-transparent">
      <div className="hero-content flex-col lg:flex-row px-8">
        <div className="w-full lg:w-1/2">
          <p className="mb-4">Get started in under 30 seconds 🚀</p>
          <h1 className="text-5xl lg:text-6xl font-bold text-white">
            Track & Invoice Your Dev Hours With Ease!
          </h1>
          <p className="py-6">
            <span className="text-xl text-primary font-bold tracking-wide">
              The All-in-One Solution for Freelance Developers:
            </span>{' '}
            Track Time Across Employers, Customize Pay Rates, Monitor Real-Time
            Hours and Income, and Seamlessly Generate Invoices.
          </p>
          <div className="flex flex-row gap-2">
            <button
              className="btn btn-accent"
              onClick={() => document.getElementById('sign_up').showModal()}
            >
              Create FREE Account
            </button>
            <button className="btn btn-ghost">Learn More</button>
          </div>
          <div className="flex flex-row gap-2 mt-6 items-center">
            <div className="avatar-group -space-x-3 rtl:space-x-reverse">
              <div className="avatar ">
                <div className="w-6">
                  <img src={one.src} />
                </div>
              </div>
              <div className="avatar">
                <div className="w-6">
                  <img src={two.src} />
                </div>
              </div>
              <div className="avatar">
                <div className="w-6">
                  <img src={three.src} />
                </div>
              </div>
              <div className="avatar">
                <div className="w-6">
                  <img src={four.src} />
                </div>
              </div>
              <div className="avatar">
                <div className="w-6">
                  <img src={five.src} />
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="w-6 bg-base-100 text-neutral-content">
                  <span className="text-xs">+99</span>
                </div>
              </div>
            </div>
            <div className="rating rating-sm gap-1">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-warning"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-warning"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-warning"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-warning"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-warning"
                checked
                readOnly
              />
            </div>
          </div>
        </div>
        <img
          src={hero.src}
          className="mt-6 lg:mt-0 w-full sm:w-3/4 lg:w-1/2 "
        />
      </div>
    </div>
  )
}

export default Hero
