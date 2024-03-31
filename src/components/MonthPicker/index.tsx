import { TimeType } from "@/model/common"
import { DatePicker } from "@arco-design/web-react"
import dayjs from "dayjs"

export const MonthPicker = ({ time, changeTime }: {
    time: TimeType,
    changeTime: (time: TimeType) => void
    
}) => {
    return (
        <DatePicker.RangePicker
            mode='month'
            value={[...time]}
            onClear={() => {
                changeTime(['', ''])
            }}
            disabledDate={(current) => current.isAfter(dayjs())}
            onChange={(val) => {
                if (!val) return
                changeTime(val as TimeType)
            }}
            shortcuts={[
                {
                    text: '6 months ago',
                    value: () => [dayjs(), dayjs().add(-6, 'month')],
                },
                {
                    text: '12 months ago',
                    value: () => [dayjs(), dayjs().add(-1, 'year')],
                }
            ]}
        />
    )
}