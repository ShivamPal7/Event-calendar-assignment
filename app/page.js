import CalendarApp from '@/components/CalendarApp'
import Events from '@/components/Events'
import React from 'react'

const Page = () => {
  return (
    <div className="h-screen w-screen bg-slate-200 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white sm:p-6 p-2 rounded-3xl shadow-lg border-4 border-slate-600 sm:flex gap-6">
        <CalendarApp />
      </div>
    </div>
  )
}

export default Page
