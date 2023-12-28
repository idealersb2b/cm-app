"use client"

import React from 'react'
import { BsPersonFill, BsHandbag } from 'react-icons/bs'
import { AiOutlineDropbox } from 'react-icons/ai'
import { IoStorefront } from 'react-icons/io5'
import { LuTwitter } from 'react-icons/lu'
import { FaInstagram } from 'react-icons/fa'
import { BiLogoLinkedin } from 'react-icons/bi'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


function AboutUs() {
    return (
        <div className='flex flex-col gap-14 mt-8 w-full'>
            <h2 className='sm:text-6xl text-2xl font-semibold'> Save Our Home</h2>
            <div className='flex flex-col-reverse md:flex-row justify-between items-center'>
                <div className="self-start">
                    <div className='flex flex-wrap gap-4 w-full sm:max-w-[400px] text-xs sm:text-base'>
                        <p>
                            Earth is our home and it is
                            our responsibility to take care of it. One way we can this
                            is by reducing our carbon footprint and
                            decreasing our use of non-renewable resources.
                            This can be done by conserving energy,
                            recycling, and using public transportation or
                            cars with better gas mileage.
                            Planting trees and protecting wildlife are
                            also important steps in preserving our planet.
                            Let's all do our part to
                            save Earth for future generations
                        </p>
                        <p>
                            Our goal is to provide the most innovative cleantech products and Services like Eco-friendly,
                            energy-saving architectural LED lights, Solar equipment, etc. of high quality and at the most
                            competitive price to B2B and D2C customers through our SaaS based aggregator platform and an efficient Super App
                        </p>
                    </div>
                </div>
                <img src='/account/Rectangle 19.png' alt='Rectangle 19.png' className='h-auto w-auto sm:h-[370px] sm:w-[400px]' />
            </div>
            <div className='flex flex-col sm:flex-row gap-5 justify-between flex-wrap'>
                <div className='flex flex-col flex-1 gap-10'>
                    <h3 className='font-semibold text-2xl sm:text-4xl'>Our Mission</h3>
                    <p className='font-mono text-xs sm:text-base'>
                        The mission of our journey is to create an energy-efficient, green and healthy society,
                        with the help of our carbon consultants, Cleantech products and Services. We wish to provide,
                        the most affordable, Superior Quality cleantech products and Services to our B2B2C Customers,
                        with help of our expert carbon consultants, NGO partners, our cleantech aggregator platform
                        and a robust  Net Zero strategy.
                    </p>
                </div>
                <div className='flex flex-col flex-1 gap-10'>
                    <h3 className='font-semibold text-2xl sm:text-4xl'>Our Vision</h3>
                    <p className='font-mono text-xs sm:text-base'>
                        To be the number one innovative platform in assisting companies and organizations to manage their
                        sustainability compliances and low carbon target through our expert services and cleantech  products.
                    </p>
                </div>
            </div>

            <div className='flex flex-wrap justify-between gap-5'>
                <div className='flex flex-col justify-center items-center cursor-pointer w-48 h-40 border rounded gap-3 group hover:bg-primary'>
                    <div className='flex flex-col group-hover:bg-[#4ccb5d] gap-4 justify-center items-center w-12 h-12 rounded-full bg-lightgrey'>
                        <div className='flex justify-center items-center h-7 w-7 bg-black group-hover:bg-white rounded-full'>
                            <BsPersonFill className='text-white group-hover:text-black' />
                        </div>
                    </div>
                    <div className='flex group-hover:text-white flex-col gap-3 text-center'>
                        <div className='text-2xl font-bold'>300+</div>
                        <div>Vendors</div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center cursor-pointer w-48 h-40 border rounded gap-3 group hover:bg-primary'>
                    <div className='flex flex-col group-hover:bg-[#4ccb5d] gap-4 justify-center items-center w-12 h-12 rounded-full bg-lightgrey'>
                        <div className='flex justify-center items-center h-7 w-7 bg-black group-hover:bg-white rounded-full'>
                            <AiOutlineDropbox className='text-white group-hover:text-black' />
                        </div>
                    </div>
                    <div className='flex group-hover:text-white flex-col gap-3 text-center'>
                        <div className='text-2xl font-bold'>90</div>
                        <div>Manufacturer & MSME's</div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center cursor-pointer w-48 h-40 border rounded gap-3 group hover:bg-primary'>
                    <div className='flex flex-col group-hover:bg-[#4ccb5d] gap-4 justify-center items-center w-12 h-12 rounded-full bg-lightgrey'>
                        <div className='flex justify-center items-center h-7 w-7 bg-black group-hover:bg-white rounded-full'>
                            <BsHandbag className='text-white group-hover:text-black' />
                        </div>
                    </div>
                    <div className='flex group-hover:text-white flex-col gap-3 text-center'>
                        <div className='text-2xl font-bold'>2,900+</div>
                        <div>Eco Friendly Products</div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center cursor-pointer w-48 h-40 border rounded gap-3 group hover:bg-primary'>
                    <div className='flex flex-col group-hover:bg-[#4ccb5d] gap-4 justify-center items-center w-12 h-12 rounded-full bg-lightgrey'>
                        <div className='flex justify-center items-center h-7 w-7 bg-black group-hover:bg-white rounded-full'>
                            <IoStorefront className='text-white group-hover:text-black' />
                        </div>
                    </div>
                    <div className='flex group-hover:text-white flex-col gap-3 text-center'>
                        <div className='text-2xl font-bold'>500</div>
                        <div>Buyers</div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className='font-semibold text-2xl sm:text-4xl '>Testimonials</h3>
                <div className='flex flex-col'>
                    <div className='flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center'>
                        <img src='/account/outstory_1.png' />
                        <div className='text-xs sm:text-base'>
                            Clean technology, in short cleantech, is any process, product, or service that reduces
                            negative environmental impacts through significant energy efficiency improvements, the
                            sustainable use of resources, or environmental protection activities. There is no denying
                            that our advancement in technology and induction of products and Services for the comfort
                            of human beings comes with the baggage of, natural resource depletion and increased Carbon
                            Footprint. Its Time to re-think, re-structure, and re-design so that our products, services,
                            and actions have the least adverse impact on the earth. It’s a global phenomenon. It’s Now or
                            we will be too late.
                        </div>
                    </div>
                    <div className='flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center flex-row-reverse'>
                        <img src='/account/outstory_2.png' />
                        <div className='text-xs sm:text-base'>
                            Hence we, the iDealers have decided to embark upon a journey to motivate and spread Clean
                            Tech Products and Services through our SaaS based e-Commerce platform based on an aggregator
                            model, social media handles, and a Super App based on an aggregator model. Our first product
                            line is the highly energy efficient, Eco-friendly LED Lights of all varieties.In addition, We
                            have also been able to onboard more than 10 MSMEs as suppliers to our client base of more than
                            100 B2B customers. We are committed to our vision: Eco-friendly, energy-efficient, clean tech in
                            each home, office, and industrial space.
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                <h3 className='font-semibold text-2xl sm:text-4xl'>Team</h3>
                <div className='flex flex-wrap justify-center sm:justify-between'>
                    <div className='flex flex-col items-center justify-center gap-8 w-270px'>
                        <div className='w-[270px] h-270px'>
                            <img className='h-full w-full object-cover' src='/account/team-1.png' />
                        </div>
                        <div className='w-[210px] flex flex-col gap-2' >
                            <div className='font-medium text-3xl'>
                                Lorem ipsum
                            </div>
                            <div className='font-mono text-base'>
                                Founder & Chairman
                            </div>
                            <div className='flex justify-start gap-4'>
                                <BiLogoLinkedin width={24} height={24} />
                                <FaInstagram width={24} height={24} />
                                <LuTwitter width={24} height={24} />
                            </div>


                        </div>

                    </div>
                    <div className='flex flex-col items-center justify-center gap-8 w-270px'>
                        <div>
                            <img src='/account/team-1.png' />
                        </div>
                        <div className='w-[210px] flex flex-col gap-2' >
                            <div className='font-medium text-3xl'>
                                Lorem ipsum
                            </div>
                            <div className='font-mono text-base'>
                                Founder & Chairman
                            </div>
                            <div className='flex justify-start gap-4'>
                                <BiLogoLinkedin width={24} height={24} />
                                <FaInstagram width={24} height={24} />
                                <LuTwitter width={24} height={24} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-8 w-270px'>
                        <div>
                            <img src='/account/team-1.png' />
                        </div>
                        <div className='w-[210px] flex flex-col gap-2' >
                            <div className='font-medium text-3xl'>
                                Lorem ipsum
                            </div>
                            <div className='font-mono text-base'>
                                Founder & Chairman
                            </div>
                            <div className='flex justify-start gap-4'>
                                <BiLogoLinkedin width={24} height={24} />
                                <FaInstagram width={24} height={24} />
                                <LuTwitter width={24} height={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className='testimonial'>
                <h3 className='font-semibold  text-2xl sm:text-4xl mb-12'>Testimonials</h3>
                <Carousel
                    showStatus={false}
                    showArrows={false}
                    showThumbs={false}
                    showIndicators
                    renderIndicator={(onClickHandler, isSelected, index, label) => {
                        if (isSelected) {
                            return (
                                <li
                                    style={{
                                        width: 16,
                                        height: 16,
                                        display: 'inline-block',
                                        margin: '0 10px',
                                        background: '#00B517'
                                    }}
                                    className="rounded-xl"
                                    aria-label={`Selected: ${label} ${index + 1}`}
                                    title={`Selected: ${label} ${index + 1}`}
                                />
                            );
                        }
                        return (
                            <li
                                style={{
                                    background: '#D9D9D9',
                                    width: 16,
                                    height: 16,
                                    display: 'inline-block',
                                    margin: '0 8px',
                                }}
                                className="rounded-full"
                                onClick={onClickHandler}
                                onKeyDown={onClickHandler}
                                value={index}
                                key={index}
                                role="button"
                                tabIndex={0}
                                title={`${label} ${index + 1}`}
                                aria-label={`${label} ${index + 1}`}
                            />
                        );
                    }}
                >
                    <div className='flex flex-col items-center md:items-stretch md:flex-row gap-8'>
                        <img className='w-[150px] h-[150px] rounded-full' src='/testimonial/testimonial-karan.jpg' />
                        <div className='flex justify-center items-center md:items-start gap-4 flex-col'>
                            <h3 className='text-3xl font-medium'>Karan (Retailer)</h3>
                            <div className='text-start'>
                                "I order from iDea1ers because I like their service. They have a good return policy Quality of their LED
                                lights are better than any other local brand in Mumbai. "
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center md:items-stretch md:flex-row gap-8'>
                        <img className='w-[150px] h-[150px] rounded-full' src='/testimonial/testimonial-pankaj.png' />
                        <div className='flex justify-center items-center md:items-start gap-4 flex-col'>
                            <h3 className='text-3xl font-medium'>Pankaj (Retailer)</h3>
                            <div className='text-start'>
                                "I am very happy with their service. Within few months they have been able to capture sizable amount of
                                market with help of their good service. We have chosen them in place of salesperson of branded
                                companies because of their promptness. "
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center md:items-stretch md:flex-row gap-8'>
                        <img className='w-[150px] h-[150px] rounded-full' src='/testimonial/testimonial-uday.jpg' />
                        <div className='flex justify-center items-center md:items-start gap-4 flex-col'>
                            <h3 className='font-medium  text-2xl sm:text-3xl'>Uday Gujjar (Retailer)</h3>
                            <div className='text-start text-xs sm:text-base'>
                                "iDealer has good service and their sales team is very punctual in their beat days. Delivery is quick and
                                quality of their product is better than some branded companies also. "
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default AboutUs