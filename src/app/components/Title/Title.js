
function Title({ title, subtitle }) {
    return (
        <div className="xl:mb-14 mb-7">
            {
                title?.length && <div className="flex items-center gap-4 text-base mb-5">
                    <span className="bg-primary h-[40px] w-[20px] inline-block rounded"></span>
                    <h2 className="text-primary border-l text-xs sm:text-base">{title}</h2>
                </div>
            }
            {
                subtitle?.length && <p className='text-xl sm:text-4xl font-semibold'>{subtitle}</p>
            }
        </div>
    )
}

export default Title