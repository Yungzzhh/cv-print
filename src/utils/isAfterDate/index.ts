import dayjs from "dayjs";

/**
 * 
 * @param val newDate日期
 * @returns 如果已经过了，则返回今天的日期，如果没过，则返回输入的日期并格式化
 */
const isAfterDate = (val: string) => {
    return dayjs().isAfter(
        dayjs(val))
        ? val
        : dayjs().format('YYYY-MM-DD')
}

export default isAfterDate