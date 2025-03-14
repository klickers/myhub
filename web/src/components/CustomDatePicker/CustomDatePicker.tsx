import { Icon } from "@iconify/react/dist/iconify.js"
import { getMonth, getYear } from "date-fns"
import DatePicker from "react-datepicker"

interface Props {
    selectedDate: Date
    onChangeFunction: React.Dispatch<any>
}

const CustomDatePicker = (props: Props) => {
    const years = Array.from(new Array(100), (x, i) => i + 2000)
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    return (
        <DatePicker
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                    >
                        <Icon icon="gravity-ui:chevron-left" />
                    </button>

                    <select
                        value={getYear(date)}
                        onChange={({ target: { value } }) =>
                            changeYear(parseInt(value))
                        }
                    >
                        {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                        }
                    >
                        {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                    >
                        <Icon icon="gravity-ui:chevron-right" />
                    </button>
                </div>
            )}
            selected={props.selectedDate}
            onChange={(date: Date) => props.onChangeFunction(date)}
        />
    )
}

export default CustomDatePicker
