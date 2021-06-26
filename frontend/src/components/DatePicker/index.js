import React, { useState } from 'react'
import { enUS } from 'date-fns/locale'
import { DatePicker, useDateInput } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

export default function DateRangePickerComponent({newDate, setNewDate, updateDate}) {
  // const [ newDate, setNewDate ] = useState(new Date());
  const timeInputProps = useDateInput({
    newDate,
    format: 'HH:mm',
    locale: enUS,
    onDateChange: updateDate
  })

  return (
    <div style={{ display: 'flex' }}>
      <DatePicker date={newDate} onDateChange={updateDate} locale={enUS} format='MM/dd/yyyy'>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} style={{ width: 150 }} {...inputProps} />
        )}
      </DatePicker>
      <input className='input' style={{ marginLeft: 16, width: 80 }} {...timeInputProps} value={newDate.toLocaleTimeString("en-US",{ hour12: true, timeStyle: "short" })} />
    </div>
  )
}
