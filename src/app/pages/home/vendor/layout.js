import NewsLetter from "@/app/components/NewsLetter/NewsLetter";
import VendorSideMenu from "@/app/components/VendorSideMenu/VendorSideMenu";

export default function Layout({ children }) {
    return (
        <div className='bg-[#f9f9f9] w-full'>
            <div className="w-full h-7 bg-primary">

            </div>
            <div className='flex flex-col gap-14 '>
                <div className='flex gap-7'>
                    <VendorSideMenu />
                    {children}
                </div>
                <NewsLetter />
            </div>
        </div>
    )
}
