'use client'

import { Listbox } from '@headlessui/react'
import { useState } from 'react'

const locations = [
    { name: 'Naga City', value: 'Naga' },
    { name: 'Pili', value: 'Pili' },
    { name: 'Bula', value: 'Bula' }
]

export default function LocationSelect() {
    const [selected, setSelected] = useState<null | typeof locations[0]>(null)

    return (
        <div>
            <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                    <div className="relative">
                        <Listbox.Button className="min-h-[48px] relative min-w-40 cursor-default rounded-lg bg-[#D9D9D9] py-2 px-3 pr-8 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#0073FF]">
                            <span className={`${selected ? 'text-black' : 'text-gray-500'}`}>
                                {selected ? selected.name : 'Location'}
                            </span>
                            <span
                                className={`absolute inset-y-0 right-3 flex items-center pointer-events-none text-[10px] transform transition-transform duration-300 ease-in-out 
                    ${open ? 'rotate-180' : 'rotate-0'}`}
                            >
                                ▼
                            </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute top-full z-50 mt-2 max-h-60 w-40 overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {locations.map((location, index) => (
                                <Listbox.Option
                                    key={index}
                                    value={location}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active
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
