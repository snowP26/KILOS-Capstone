"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const locations = [
  { name: "Naga City", value: "1" },
  { name: "Bula", value: "2" },
  { name: "Pili", value: "3" },
];



export default function LocationSelect({
  onChange,
  widthClass,
}: {
  onChange: (location: string | null) => void;
  widthClass: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<typeof locations[0] | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (location: typeof locations[0]) => {
    setSelected(location);
    setIsOpen(false);
    onChange(location.value);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [condition, setCondition] = useState('A');

  return (
    <div ref={dropdownRef} className={`z-10 relative w-48 ${widthClass}`}>
      {/* Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className={selected ? "text-gray-900" : "text-gray-500"}>
          {selected ? selected.name : "Location"}
        </span>
        <ChevronDown
          className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
            }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg animate-in fade-in slide-in-from-top-1">
          {locations.map((location, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(location)}
              className={`flex cursor-pointer items-center px-4 py-2 text-sm transition-colors hover:bg-blue-50 ${selected?.value === location.value
                  ? "bg-blue-100 font-semibold text-blue-700"
                  : "text-gray-700"
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
  );
}
