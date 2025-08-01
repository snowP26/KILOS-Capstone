import { Search as SearchIcon } from "lucide-react";
import LocationSelect from "./locselect";

const Search = () => {
    return <SearchIcon size={24} />
}

export const Title = () => {
    return (
        <div className="flex flex-col items-center pb-80">
            <h1 className="text-center mt-20 text-[48px] font-bold"><strong className="text-[#0073FF]">K</strong>abataan&apos;s <strong className="text-[#0073FF]">I</strong>ntegrated <strong className="text-[#0073FF]">L</strong>eadership & <strong className="text-[#0073FF]">O</strong>rganizational <strong className="text-[#0073FF]">S</strong>ystem</h1>
            <form className="mt-4 flex flex-row gap-2 items-center min-w-[1000px]">
                <LocationSelect />
                <div className="relative w-[683px]">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search />
                    </div>
                    <input
                        type="text"
                        name="Search-bar"
                        placeholder="Search for ordinances"
                        className="pl-11 p-3 bg-[#D9D9D9] rounded-lg w-full placeholder-gray-600"
                    />
                </div>
                <button type="submit" className="cursor-pointer py-3 px-5 bg-[#5483B3] text-white rounded-lg">
                    Search
                </button>
            </form>
            
        </div>
    )
}