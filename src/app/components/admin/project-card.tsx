import React from 'react'

export const ProjectCard = () => {
  return (
    <div className="relative mt-10 p-5 h-135 w-90 bg-white rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)]">
        <div className="bg-black mx-4 h-100 object-fill">
            
        </div>
        <p className="my-5 font-semibold truncate"> 
            Project Title
        </p>
        <div className="w-fit px-2 py-1 rounded-[10px] text-xs bg-[#FFD7C8]">
            Needs Approval
        </div>
    </div>
  )
}

