"use client";

import { useRouter } from 'next/navigation';



export const CityMuniCard = ({ name }: { name: string }) => {
  const router = useRouter();
  let image = ''


  const handleClick = (params: string) => {
    return router.push(`/feedback/${params}`)
  }

  const convertString = () => {
    return name.trim().toLowerCase().replace(/ /g, "-");
  }

  switch (name) {
    case 'Naga City':
      image = '/NagaYOBanner.jpg'
      break
    case 'Bula':
      image = '/BulaYOBanner.jpg'
      break
    case 'Pili':
      image = '/PiliYOBanner.jpg'
      break
  }


  return (
    <div className="">
      <div
        className="cursor-pointer rounded-full shadow-[-4px_4px_4px_rgba(0,0,0,0.15)] w-40 h-40 sm:w-60 sm:h-60 lg:h-80 lg:w-80 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        onClick={() => handleClick(convertString())}>
        <img src={image} alt="" className="object-cover w-full h-full rounded-full"></img>
      </div>
      <p className="mt-3 text-xl font-semibold text-center">
        {name}
      </p>
    </div>
  )
}