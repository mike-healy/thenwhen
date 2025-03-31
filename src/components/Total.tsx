import React from 'react'
import { minutesToHM } from '../shared/functions.ts'

interface TotalProps {
  minutes: number;
}

export default (props: TotalProps) => {
  return (
    <li
      className='grid grid-cols-[2rem,max-content,1fr] items-center gap-x-2 sm:gap-x-4 bg-brand-orange/20 border-t border-dashed border-brand-orange'
      aria-label='Overall time difference'
      title='Overall time difference'
    >
      <div className='py-2 bg-brand-orange text-center text-white'>=</div>
      <div className=' ps-2 md:ps-4 text-gray-700'>
        {minutesToHM(props.minutes)}
      </div>
      <div className='text-sm text-left text-gray-700'>total difference</div>
    </li>
  );
}
