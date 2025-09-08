"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"

const locations = [
  { name: "Naga City", value: "1" },
  { name: "Bula", value: "2" },
  { name: "Pili", value: "3" },
]

export default function LocationSelect( { onChange }: { onChange: (location: string | null) => void} ) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<typeof locations[0] | null>(null)

  const handleSelect = (location: typeof locations[0]) => {
    setSelected(location)
    setIsOpen(false)
    onChange(location.value)
  }

  return (
    <div className="relative min-w-[160px]">
      {/* Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg bg-[#D9D9D9] px-3 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[#0073FF]"
      >
        <span className={`${selected ? "text-black" : "text-gray-500"} truncate`}>
          {selected ? selected.name : "Location"}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-600 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Options */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-lg bg-white shadow-lg ring-1 ring-black/10">
          {locations.map((location, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(location)}
              className={`flex cursor-pointer items-center px-3 py-2 text-sm hover:bg-blue-100 ${
                selected?.value === location.value ? "bg-blue-50 font-semibold" : "text-gray-900"
              }`}
            >
              {selected?.value === location.value && (
                <Check className="mr-2 h-4 w-4 text-blue-600" />
              )}
              {location.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
