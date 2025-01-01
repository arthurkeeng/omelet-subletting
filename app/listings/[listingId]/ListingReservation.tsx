'use client'
import Button from '@/app/components/Button'
import Calendar from '@/app/components/inputs/Calendar'
import {Range} from 'react-date-range'

interface ListingReservationProps{
    price : number , 
    dateRange : Range, 
    totalPrice : number , 
    onChangeDate : (value: Range)=> void, 
    onSubmit : ()=> void, 
    disabled  : boolean, 
    disabledDates : Date[]
}
const ListingReservation: React.FC<ListingReservationProps>  = ({

    price , 
    dateRange, 
    totalPrice, 
    onChangeDate, 
    onSubmit , 
    disabled , 
    disabledDates
}
) => {
  return (
    <div className='bg-white rounded-xl 
    border-[1px] overflow-hidden bg-neutral-200
    '>
      <div className="flex flow-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
        ₦{price}
        </div>
        <div className="font-light text-neutral-600">
            Month
        </div>
      </div>
      <hr/>
      <Calendar
      value = {dateRange}
      disabledDates = {disabledDates}
      onChange = {(value)=> onChangeDate(value.selection)}
      />
      <hr/>
      <Button
      label='Reserve'
      onClick={onSubmit}
      disabled={disabled}
      />
      <div className="p-4 flex flex-row items-center justify-center font-semibold text-lg">
        <div className="">Total</div>
        <div className="">₦{totalPrice}</div>
      </div>
    </div>
  )
}

export default ListingReservation
