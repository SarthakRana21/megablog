import React from 'react'

export default function Container({childer}){
    return (
        <div className='w-full max-w-7xl mx-auto px-4'>
            {childer}
        </div>
    )
}