import { DatePicker } from "@arco-design/web-react"
import dayjs from "dayjs"

export const MonthPicker = ({time, changeTime}: {
    time: string,
    changeTime: (time: string) => void
}) => {
    return (
        <DatePicker.MonthPicker
            value={time}
            disabledDate={(current) => current.isAfter(dayjs())}
            onChange={newVal => changeTime(newVal)}
        />
    )
}