import React from 'react'

export const ProjectCard = () => {
  return (
    <div className="relative mt-10 p-5 h-135 w-90 bg-white rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)]">
        <div className="bg-black mx-4 h-100 object-fill">
            
        </div>
        <p className="my-5 font-semibold truncate"> 
            Project Title
        </p>
        <div className="flex flex-row gap-3">
            <div className="px-2 py-1 rounded-[10px] text-xs bg-amber-500 ">
                Project Status
            </div>
            <div className="px-2 py-1 rounded-[10px] text-xs bg-[#E6F1FF]">
                Date
            </div>
        </div>
    </div>
  )
}

