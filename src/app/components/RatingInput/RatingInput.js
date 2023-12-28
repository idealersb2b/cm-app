import { useState } from "react"
import { AiFillStar } from "react-icons/ai"

function RatingInput({ getRatingValue }) {

    const [starValue, setStarValue] = useState(1)

    return (
        <div className="flex mb-6">
            <AiFillStar
                className={`w-7 h-7 ${starValue >= 1 ? 'text-[#ffad33]' : ''}`}
                onClick={() => {
                    getRatingValue(1)
                    setStarValue(1)
                }} />
            <AiFillStar
                className={`w-7 h-7 ${starValue >= 2 ? 'text-[#ffad33]' : ''}`}
                onClick={() => {
                    getRatingValue(2)
                    setStarValue(2)
                }} />
            <AiFillStar
                className={`w-7 h-7 ${starValue >= 3 ? 'text-[#ffad33]' : ''}`}
                onClick={() => {
                    getRatingValue(3)
                    setStarValue(3)
                }} />
            <AiFillStar
                className={`w-7 h-7 ${starValue >= 4 ? 'text-[#ffad33]' : ''}`}
                onClick={() => {
                    getRatingValue(4)
                    setStarValue(4)
                }} />
            <AiFillStar
                className={`w-7 h-7 ${starValue >= 5 ? 'text-[#ffad33]' : ''}`}
                onClick={() => {
                    getRatingValue(5)
                    setStarValue(5)
                }} />
        </div>
    )
}

export default RatingInput