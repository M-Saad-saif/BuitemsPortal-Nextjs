import React from 'react'

const ToolHeader = ({heading, desc}) => {
  return (
    <div>
       <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{heading}</h1>
        <p className="text-gray-500 mt-2">{desc}</p>
      </div>
    </div>
  )
}

export default ToolHeader
