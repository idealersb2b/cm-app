import Link from "next/link"
import { useRouter } from "next/navigation"

function Service({ service }) {

    const router = useRouter();

    return (
        <div className='group min-w-[150px] sm:w-[270px] rounded-md'>
            ppp
            <div className='relative cursor-pointer' onClick={() => router.push(`/services/servicelisting/${service.id}`)} >
                <img className='w-full aspect-square object-fill' alt={service.name} src={service?.image?.link } />
                <Link href='#' className="flex justify-center items-center text-white transition-all duration-300 group-hover:z-10  group-hover:opacity-100 -z-10 opacity-0 absolute w-full bg-primary bottom-0 h-10 text-xs font-mono">Book Now</Link>
            </div>
            <div className='pl-2 pr-2 mt-4'>
                <h3 className='text-base sm:font-semibold font-medium'>
                    {service.name}
                </h3>
                <div dangerouslySetInnerHTML={{ __html: service.description }}
                    className='text-xs text-[10px] text-[#7E7E7EC9] sm:text-justify'>
                </div>
            </div>
        </div>
    )
}

export default Service