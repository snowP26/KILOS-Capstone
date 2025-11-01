import React from 'react'

type ProjectCard = {
  Title: string,
  Status: string,
  ImgURL?: string,
}

export const ProjectCard = ({ Title, Status, ImgURL }: ProjectCard) => {
  return (
    <div className="relative p-5 h-full w-65 lg:w-60 xl:w-90 bg-white rounded-md shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {ImgURL ? (
        <div className="">
          <img
            src={ImgURL}
            alt="Project"
            className="aspect-3/4 w-full object-cover rounded-md"
          />
        </div>
      ) : (
        // <div className="flex items-center justify-center not-first:min-w-15 h-65 xl:h-100 rounded-[8px] bg-blue-100 text-blue-600 font-bold">
        //   {Title.charAt(0).toUpperCase()}
        // </div>
        <div className="flex bg-blue-100 aspect-3/4 object-contain rounded-md items-center justify-center font-bold text-blue-600">
          {Title.charAt(0).toUpperCase()}
        </div>
      )}



      <p className="my-5 font-semibold truncate">
        {Title}
      </p>
      <div className="w-fit px-2 py-1 rounded-[10px] text-xs bg-[#FFD7C8]">
        {Status}
      </div>
    </div>
  )
}

