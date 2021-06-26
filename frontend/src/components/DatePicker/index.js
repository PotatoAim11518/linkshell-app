import React, { useState } from 'react'
import { enUS } from 'date-fns/locale'
import { DatePicker, useDateInput } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

export default function DateRangePickerComponent() {
  const [date, setDate] = useState(new Date())
  const timeInputProps = useDateInput({
    date,
    format: 'HH:mm',
    locale: enUS,
    onDateChange: setDate
  })

  return (
    <div style={{ display: 'flex' }}>
      <DatePicker date={date} onDateChange={setDate} locale={enUS} format='MM/dd/yyyy'>
        {({ inputProps, focused }) => (
          <input className={'input' + (focused ? ' -focused' : '')} style={{ width: 150 }} {...inputProps} />
        )}
      </DatePicker>
      <input className='input' style={{ marginLeft: 16, width: 80 }} {...timeInputProps} />
    </div>
  )
}
