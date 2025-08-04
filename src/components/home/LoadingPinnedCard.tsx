const LoadingPinnedCard = () => {
    return (
        <div className="bg-bgdark rounded-md p-[10px] flex flex-row w-full white-border">
            <div className="w-[80%]">
                <div className="h-[20px] w-[30%] bg-white/5 animate-pulse"></div>
                <div className="h-[30px] w-[50%] bg-main/25 my-[18px] animate-pulse"></div>
                <div className="h-[15px] w-[80%] bg-white/5 animate-pulse"></div>
            </div>
            <div className="flex flex-col w-[20%]">
                <div className="rounded-md bg-main/25 h-[50%] flex-grow mb-[5px] animate-pulse"></div>
                <div className="rounded-md bg-main/25 h-[50%] flex-grow mt-[5px] animate-pulse"></div>
            </div>
        </div>
    );
};

export default LoadingPinnedCard;
