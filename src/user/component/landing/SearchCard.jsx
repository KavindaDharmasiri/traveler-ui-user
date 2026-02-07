import React from 'react'
import SearchCardTabs from './SearchCardTabs'
import SearchCardForm from './SearchCardForm'

export default function SearchCard() {
  return (
     <div className="w-full max-w-sm md:max-w-4xl bg-white  rounded-3xl p-4 md:p-6 shadow-2xl absolute -bottom-48 md:-bottom-12 left-1/2 transform -translate-x-1/2 z-20">
      <SearchCardTabs />
      <SearchCardForm />
    </div>
  )
}
