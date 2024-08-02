import { RepeatOptions } from '../../global/types'
import { title } from '../../utils/string'

interface RepeatPeriodBadgeProps {
    type: RepeatOptions
}

const RepeatPeriodBadge = ({ type }: RepeatPeriodBadgeProps) => {
    return (
        <div className={"rounded-full mr-[5px] px-[5px] text-sm text-black h-[20px]" + (type === "WEEK" ? " bg-weekly" : type === "FORTNIGHT" ? " bg-fortnightly" : " bg-monthly")}>
            {title(type) + "ly"}
        </div>
    )
}

export default RepeatPeriodBadge