import { ComNav } from "../../components/community/nav"
import { CityMuniCard } from "../../components/community/city-muniCard"

export default function Feedback(){
    const list = ["Naga City", "Bula", "Pili"]

    return (
        <div>
            <ComNav />
            <h1 className="mt-10 mb-10 font-bold text-xl text-center lg:text-start lg:mt-15 lg:text-2xl lg:mx-25">Select City or Municipality</h1>

            <div className="mx-5 lg:mx-25">
                <div className="flex flex-wrap justify-center gap-5">
                    {list.map((location) => (
                        <CityMuniCard key={location} name={location} />
                    ))}
                </div>
            </div>
        </div>

    )
}