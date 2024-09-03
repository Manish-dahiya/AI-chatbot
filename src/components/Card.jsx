import { faPython } from '@fortawesome/free-brands-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Card({text,Cardicon}) {
  return (
    <div className='relative p-5 border h-[200px] w-[250px] border-gray-400 rounded-lg bg-[#171718] hover:scale-105'>
      <p className='text-xl'>{text}</p>
      <FontAwesomeIcon icon={Cardicon} className='absolute right-4 bottom-4'/>
    </div>
  )
}

export default Card
