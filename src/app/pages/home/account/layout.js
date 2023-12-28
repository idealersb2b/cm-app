import NewsLetter from "@/app/components/NewsLetter/NewsLetter";
import ProfileSideMenu from "@/app/components/ProfileSideMenu/ProfileSideMenu";

export default function Layout({ children }) {
    return (
        <div className='sm:bg-[#f9f9f9]'>
            <div className='flex max-w-[1440px] flex-col mx-4 sm:mx-14 gap-7 sm:gap-14'>
                <div className='flex  gap-7 sm:gap-14'>
                    <ProfileSideMenu />
                    {children}
                </div>
                <NewsLetter />
            </div>
        </div>
    )
}
