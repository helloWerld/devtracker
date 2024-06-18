import React from 'react'
import Instructions from '../../components/tracker/Instructions'
import Report from '../../components/tracker/Report'
import Timer from '../../components/tracker/Timer'
import WorkHistory from '../../components/tracker/WorkHistory'
import Outstanding from '@/components/invoice/Outstanding'

const Tracker = () => {
  return (
    <div className="flex gap-6 max-w-screen-2xl min-h-screen pt-8 flex-col mx-auto relative">
      <Timer />
      <div className="flex flex-col lg:flex-row gap-6">
        <Instructions />
        <Report />
      </div>
      <Outstanding />
      <WorkHistory />
    </div>
  )
}

export default Tracker
