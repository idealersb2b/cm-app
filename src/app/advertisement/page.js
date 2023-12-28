import Advertise_with_us from "../components/Advertise_with_us/Advertise_with_us"
import NewArrival from "../components/NewArrival/NewArrival"
import NewsLetter from "../components/NewsLetter/NewsLetter"
import RecommendedRow from "../components/RecommendedRow.js/RecommendedRow"
import WallAds from "../components/WallAds/WallAds"

function Advertisement() {
    return (
        <div className='flex justify-center flex-col mx-4 sm:mx-14 mt-4 sm:mt-14 gap-7 sm:gap-14'>
            <Advertise_with_us />
            <WallAds />
            {/* <RecommendedRow /> */}
            {/* <NewArrival /> */}
            <NewsLetter />
        </div>
    )
}

export default Advertisement