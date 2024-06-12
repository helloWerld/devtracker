import React from 'react'
import Instructions from '../../components/tracker/Instructions'
import Report from '../../components/tracker/Report'
import Timer from '../../components/tracker/Timer'
import WorkHistory from '../../components/tracker/WorkHistory'

const Tracker = () => {
  return (
    <div className="flex max-w-screen-2xl min-h-screen p-4 flex-col mx-auto relative">
      <Timer />
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <Instructions />
        <Report />
      </div>
      <WorkHistory />
    </div>
  )
}

export default Tracker
