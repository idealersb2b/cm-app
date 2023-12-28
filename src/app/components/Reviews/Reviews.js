import { AiFillStar } from "react-icons/ai"
import RatingStart from "../RatingStart/RatingStart";
import { MUTATION_ADD_REVIEW } from "@/app/graphql/reviews/mutations";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { QUERY_GET_PRODUCT_REVIEWS } from "@/app/graphql/reviews/queries";
import { v4 as uuidv4 } from 'uuid'
import RatingInput from "../RatingInput/RatingInput";
import { redirect, useRouter } from "next/navigation"
function Reviews({ productId }) {


    const router = useRouter();
    const [content, setContent] = useState("")
    const [allReviews, setAllReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [addProductReview] = useMutation(MUTATION_ADD_REVIEW)
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [yourRating, setYourRating] = useState(1);


    const [getProductReview] = useLazyQuery(QUERY_GET_PRODUCT_REVIEWS)

    const filterOutReviewData = (data) => {

        let currReviews = [];
        setAverageRating(data.reviews.averageRating);
        data.reviews.edges.forEach((review) => {
            const tempReview = {};

            tempReview.id = review.node.id;
            tempReview.content = review.node.content;
            tempReview.rating = review.rating;
            tempReview.author = review.node.author.node.name;
            tempReview.authorId = review.node.author.node.id;

            currReviews.push(tempReview);
        })

        setAllReviews(currReviews);
    }

    const initilaReviewCall = () => {

        setIsLoading(true);
        getProductReview(
            {
                variables: {
                    id: productId
                }
            })
            .then((result) => result.data)
            .then((data) => data.product)
            .then((data) => {
                console.log("Review", data);
                filterOutReviewData(data);
                setIsLoading(false);
            })
            .catch((e) => {
                setError(e.message);
                setIsLoading(false);
            })
    }

    const getRatingValue = (StarValue) => {
        setYourRating(StarValue)
    }

    useEffect(() => {
        initilaReviewCall();
    }, [productId])


    if (isloading) {
        return <div></div>
    }

    if (error) {
        return <div>{error.message}</div>
    }

    const middleIndex = Math.floor(allReviews.length / 2);

    return (
        <div>
            <div className="flex w-full h-10 mt-6 mb-2">
                <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full text-gray-500 h-10 px-4 rounded border outline-none border-r-0 focus:border-primary" placeholder="Add a Review" />
                <button
                    onClick={() => {
                        if(localStorage.getItem("authToken")){
                        if (content.length == 0) {
                            toast.warn("Add Some Content")
                        } else if (!(yourRating >= 1 && yourRating <= 5)) {
                            toast.warn("Valid Rating Required");
                        } else {
                            addProductReview({
                                variables: {
                                    rating: yourRating,
                                    content: content,
                                    commentOn: productId,
                                }
                            }).then((data) => {
                                console.log(data);
                                let currAllReview = allReviews;
                                setAverageRating((((averageRating * allReviews.length) + yourRating) / (allReviews.length + 1)).toFixed(1));

                                currAllReview = [
                                    {
                                        author: data.data.writeReview.review.author.node.name,
                                        rating: yourRating,
                                        content: content,
                                    }
                                    , ...currAllReview]

                                toast.success("Your Review is Added Thank You")
                                setAllReviews(currAllReview);
                            }).catch((e) => {
                                console.log(e);
                                toast.warning(e.message)
                            })
                        }

                    }
                    else{
                        toast.warning("you are not loggedIn")
                        router.push("/login")
                    }
                }}
                    className="flex items-center justify-center w-[208px] bg-primary text-white">
                    Add a Review
                </button>

            </div>
            <RatingInput getRatingValue={getRatingValue} />
            <div className="flex flex-col gap-6">
                {
                    allReviews?.slice(0, middleIndex)?.map((review, index) => {

                        return <div key={uuidv4()} className="flex flex-col gap-7">
                            <div className="flex gap-3">
                                <div className="h-7 w-7 flex justify-center items-center rounded-full bg-primary text-white">{review.rating}</div>
                                <div className="font-sans font-semibold" dangerouslySetInnerHTML={{ __html: review.author }} ></div>
                            </div>
                            <p className="font-sans text-sm" dangerouslySetInnerHTML={{ __html: review.content }}></p>
                        </div>
                    })
                }


                <div className="flex py-16 gap-10 flex-wrap justify-around items-center">

                    <div className="customer flex h-72 w-72 justify-center items-center flex-col rounded-full"
                        style={{
                            "background": `radial-gradient(closest-side, white 79%, transparent 80% 100%),conic-gradient(#04d620 ${(averageRating * 20)}%, #ebebeb 0%)`,
                            "transform": "scaleX(-1)"
                        }}
                    >
                        <div className="flex justify-center items-center flex-col -scale-x-100">
                            <div className="text-2xl font-semibold">{averageRating}/5</div>
                            <div className="flex items-center justify-start">
                                <RatingStart star={averageRating} />
                            </div>
                            <div className="text-[#7e7e7e]">
                                ({allReviews.length} Reviews)
                            </div>
                        </div>

                    </div>



                    <div className="hidden md:flex flex-col gap-10">
                        {
                            [5, 4, 3, 2, 1].map((ele, index) => {
                                return <div key={uuidv4()} className="flex">
                                    <div className="w-72 rounded-2xl bg-[#ebebeb]">
                                        <div className={'h-full rounded-2xl bg-primary'}
                                            style={{
                                                width:
                                                    `${(Math.floor(allReviews.filter((review) => review.rating === ele).length) * 100) / (allReviews.length) || 0}%`
                                            }}
                                        >
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <RatingStart star={ele} />
                                    </div>
                                    <div className="text-[#a5a5a5]">
                                        ({allReviews.filter((review) => review.rating === ele).length} Reviews)
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>

                {
                    allReviews?.slice(middleIndex)?.map((review, index) => {
                        return <div key={uuidv4()} className="flex flex-col gap-7">
                            <div className="flex gap-3">
                                <div className="h-7 w-7 flex justify-center items-center rounded-full bg-primary text-white">{review.rating}</div>
                                <div className="font-sans font-semibold" dangerouslySetInnerHTML={{ __html: review.content }} ></div>
                            </div>
                            {/* <p className="font-sans text-sm">Lorem ipsum dolor sit amet consectetur.
                    Adipiscing vel sit eu massa vel. Ac arcu duis ligula ac nunc.
                    Libero volutpat justo diam pretium malesuada.
                    Maecenas sed convallis odio adipiscing platea urna.
                    Sapien vestibulum vel platea massa odio.
                    Libero id aliquet eget neque a. Pellentesque vitae pharetra scelerisque viverra metus odio quam.
                    Integer blandit non interdum posuere adipiscing etiam nunc commodo praesent.
                    Habitant in in rutrum eget imperdiet id sapien.
                    Cursus leo tristique sapien consectetur.
                </p> */}
                        </div>
                    })
                }

            </div>
        </div>
    )
}

export default Reviews