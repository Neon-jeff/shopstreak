'use client'
import React from 'react'

const Form = () => {
  return (
    <div>
      <form action="" className='space-y-5'>
        <div className='flex flex-col gap-3'>
            <label htmlFor="">User ID</label>
            <input type="text" placeholder='Enter user ID' className='ring-[0.7px] p-3 rounded-lg focus:outline-none ring-gray-500 focus:ring-black transition duration-200 ease-in' />
        </div>
        <button className='bg-black p-3 px-6 w-full  rounded-lg text-white '>Save Purchase</button>
      </form>
    </div>
  )
}

export default Form
