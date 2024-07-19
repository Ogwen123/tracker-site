const NavigationBar = () => {
    return (
        <div className='flex items-center px-[20px] h-[90px] bg-bgdark text-2xl'>
            <a href="/" className="h-full">
                <div className='bg-[#D8B5FF] bg-gradient-to-br from-[#D8B5FF] to-[#1EAE98] text-transparent bg-clip-text text-5xl h-full flex items-center'>
                    Tracker
                </div>
            </a>
        </div>
    )
}

export default NavigationBar