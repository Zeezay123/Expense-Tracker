import React from 'react'
import { useState } from 'react'

const SearchComp = ({query, setQuery}) => {

  return (
    <div>

<form action="">
            <input
              className="flex w-[20.5rem] border-gray-50 border-2  bg-iconback h-[2rem] p-5 rounded-md"
              type="search"
              placeholder="search here..."
              name="search"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </form>

    </div>
  )
}

export default SearchComp