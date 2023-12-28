import Title from "../Title/Title"

function NewArrival({ reverseArrangement }) {
    return (
        <div>
            <Title title={"Featured"} subtitle={"New Arrival"} />
            <div className="grid grid-cols-4 gap-4 grid-rows-2">
                {
                    !reverseArrangement && <div className="relative col-span-4 sm:col-span-2 row-span-2 bg-black">
                        <img src="product/product_img-2.png" className="sm:h-[500px] h-[300px] w-full box-shadow-image" />
                        <div className="w-full flex gap-4 flex-col absolute bottom-0 text-white p-4 lg:px-12 lg:py-4 justify-start bg-[#1C1C1CA6]">
                            <h3 className="text-base sm:text-xl">
                                Disposable straws
                            </h3>
                            <p className="font-normal text-xs sm:text-sm">
                                Eco-friendly <br />
                                Disposable straws
                            </p>
                            <div>
                                <button className="border-b-2 text-sm sm:text-base border-[#898989]">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                }

                <div className="flex relative justify-end bg-black col-span-2">
                    <img src="product/product_img-2.png" className="box-shadow-image object-contain sm:object-fill" />
                    <div className="w-full flex gap-2 lg:gap-4 flex-col absolute bottom-0 text-white p-4 lg:px-12 lg:py-4 justify-start bg-[#1C1C1CA6]">
                        <h3 className="text-xs sm:text-xl">
                            Wheat Straw Phone Case
                        </h3>
                        <p className="font-normal text-[7px] sm:text-sm">
                            Eco-friendly <br />
                            Disposable straws
                        </p>
                        <div>
                            <button className="border-b-2 text-xs sm:text-base border-[#898989]">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex sm:hidden flex-col justify-between flex-wrap w-full col-span-2 gap-4">
                    <div className="relative bg-black col-span-2 row-span-1">
                        <img src="product/product_img-2.png" className="h-full w-full box-shadow-image object-contain sm:object-fil" />
                        <div className="w-full flex gap-2 lg:gap-4 flex-col absolute bottom-0 text-white p-2 lg:px-12 lg:py-4 justify-start bg-[#1C1C1CA6]">
                            <h3 className="text-[6px] sm:text-xl">
                                Disposable straws
                            </h3>
                            <p className="font-normal  text-[4px] sm:text-sm">
                                Eco-friendly <br />
                                Disposable straws
                            </p>
                            <div>
                                <button className="border-b-2 text-[8px] sm:text-base border-[#898989]">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative bg-black col-span-2 row-span-1">
                        <img src="product/product_img-2.png" className="h-full w-full box-shadow-image object-contain sm:object-fill" />
                        <div className="w-full flex gap-1 lg:gap-4 flex-col absolute bottom-0 text-white p-2 lg:px-12 lg:py-4 justify-start bg-[#1C1C1CA6]">
                            <h3 className="text-[6px] sm:text-xl">
                                Disposable straws
                            </h3>
                            <p className="font-normal  text-[4px] sm:text-sm">
                                Eco-friendly <br />
                                Disposable straws
                            </p>
                            <div>
                                <button className="border-b-2 text-[8px] sm:text-base border-[#898989]">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:block relative bg-black">
                    <img src="product/product_img-2.png" className="h-full w-full box-shadow-image" />
                    <div className="w-full row-span-1 col-span-2 flex gap-2 lg:gap-4 flex-col absolute bottom-0 text-white p-4 lg:px-12 lg:py-4 justify-start bg-[#1C1C1CA6]">
                        <h3 className="text-[6px] sm:text-xl">
                            Disposable straws
                        </h3>
                        <p className="font-normal  text-[4px] sm:text-sm">
                            Eco-friendly <br />
                            Disposable straws
                        </p>
                        <div>
                            <button className="border-b-2 text-[8px] sm:text-base border-[#898989]">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:block relative bg-black">
                    <img src="product/product_img-2.png" className="h-full w-full box-shadow-image" />
                    <div className="w-full flex gap-2 lg:gap-4 flex-col absolute bottom-0 text-white p-4 lg:px-12 lg:py-4 justify-start bg-[#1C1C1CA6]">
                        <h3 className="text-[6px] sm:text-xl">
                            Disposable straws
                        </h3>
                        <p className="font-normal  text-[4px] sm:text-sm">
                            Eco-friendly <br />
                            Disposable straws
                        </p>
                        <div>
                            <button className="border-b-2 text-[8px] sm:text-base border-[#898989]">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>
                {/* {
                    reverseArrangement && <div className="relative col-span-4 sm:col-span-2 row-span-2 bg-black">
                        <img src="product/product_img-2.png" className="h-full w-full box-shadow-image" />
                        <div className="w-full flex gap-4 flex-col absolute bottom-0 text-white px-12 py-4 justify-start bg-[#1C1C1CA6]">
                            <h3 className="text-xl">
                                Disposable straws
                            </h3>
                            <p className="font-normal text-sm">
                                Eco-friendly <br />
                                Disposable straws
                            </p>
                            <div>
                                <button className="border-b-2 border-[#898989]">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                } */}
            </div>
        </div>
    )
}

export default NewArrival