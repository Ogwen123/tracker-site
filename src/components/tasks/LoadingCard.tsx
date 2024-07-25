interface LoadingCardProps {
    width?: string,
    height?: string,

}

const LoadingCard = ({ width = "300px", height = "300px" }: LoadingCardProps) => {
    return (
        <div
            className='bg-bgdark rounded-md p-[10px] flex flex-col border-w'
            style={{
                width: width,
                height: height
            }}
        >
            <div className='h-[20px] w-[30%] bg-white/5 animate-pulse'></div>
            <div className='h-[30px] w-[50%] bg-main/25 my-[25px] animate-pulse'></div>
            <div className='h-[15px] w-[80%] bg-white/5 animate-pulse'></div>
            <div className='h-[15px] w-[60%] bg-white/5 my-[15px] animate-pulse'></div>
            <div className='h-[15px] w-[40%] bg-white/5 animate-pulse'></div>
            <div className='flex flex-row mt-auto'>
                <div className='rounded-md bg-main/25 h-[35px] flex-grow mr-[5px] animate-pulse'></div>
                <div className='rounded-md bg-main/25 h-[35px] flex-grow ml-[5px] animate-pulse'></div>
            </div>
        </div>
    )
}

export default LoadingCard