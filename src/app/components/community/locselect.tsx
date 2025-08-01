'use client'

import { Listbox } from '@headlessui/react'
import { useState } from 'react'

const locations = [
    { name: 'City of Naga', value: 'Naga' },
    { name: 'Pili', value: 'Pili' },
    { name: 'Bula', value: 'Bula' }
]

export default function LocationSelect() {
    const [selected, setSelected] = useState(locations[0])

    return (
        <div className="min-w-[130px]">
            <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                    <div className="relative">
                        <Listbox.Button className="min-h-[48px] relative w-full cursor-default rounded-lg bg-[#D9D9D9] py-2 px-3 pr-8 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#0073FF]">
                            {selected.name}
                            <span
                                className={`absolute inset-y-0 right-3 flex items-center pointer-events-none text-[10px] transform transition-transform duration-400 ease-in-out 
                                    ${open ? 'rotate-180' : 'rotate-0'}`}
                            >
                                ▼
                            </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {locations.map((location, index) => (
                                <Listbox.Option
                                    key={index}
                                    value={location}
                                    className={({ active }: { active: boolean }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? 'bg-blue-100 text-blue-900'
                                                : 'text-gray-900'
                                        }`
                                    }
                                >
                                    {location.name}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                )}
            </Listbox>
        </div>
    )
}
