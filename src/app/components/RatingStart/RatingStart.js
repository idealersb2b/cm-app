import React from 'react'
import { AiFillStar } from 'react-icons/ai'

function RatingStart({ star }) {
    return (
        <>
            <AiFillStar className="w-7 h-7" color={star >= 1 ? "#FFAD33" : "#bcbcbc"} />
            <AiFillStar className="w-7 h-7" color={star >= 2 ? "#FFAD33" : "#bcbcbc"} />
            <AiFillStar className="w-7 h-7" color={star >= 3 ? "#FFAD33" : "#bcbcbc"} />
            <AiFillStar className="w-7 h-7" color={star >= 4 ? "#FFAD33" : "#bcbcbc"} />
            <AiFillStar className="w-7 h-7" color={star >= 5 ? "#FFAD33" : "#bcbcbc"} />
        </>
    )
}

export default RatingStart