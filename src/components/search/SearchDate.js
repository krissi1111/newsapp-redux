import { useState } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import DatePicker, { CalendarContainer } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchDate,
  setDateRange,
  selectSearch
} from '../../redux/slices/newsSearchSlice';

export function SearchDate() {
  const dispatch = useDispatch();
  const values = useSelector(selectSearch)
  const [dateRangeValue, setDateRangeValue] = useState([new Date(), new Date()])
  const [dateStart, dateEnd] = dateRangeValue
  const dateSearch = values.SearchDate

  const con = ({className, children}) => {
    return (
      <div style={{ padding: "16px", display:'flex', justifyContent:'center'}}>
        <CalendarContainer className={className}>
          <div style={{ background: "#f0f0f0" }}/>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    )
  }

  function handleDateRange(dates){
    setDateRangeValue(dates)
    if(dates[1] !== null) {
      let dateStart = dates[0]//.toISOString()
      let dateEnd = dates[1]//.toISOString()
      
      let dateStartAdjusted = dateStart
      dateStartAdjusted.setHours(0)
      dateStartAdjusted.setMinutes(0)

      let dateEndAdjusted = dateEnd
      //if(dateEndAdjusted.getFullYear() === 1970) dateEndAdjusted = new Date(dateStart)
      dateEndAdjusted.setHours(23)
      dateEndAdjusted.setMinutes(59)
      dateEndAdjusted.setSeconds(0)

      dispatch(setDateRange([dateStartAdjusted.toISOString(), dateEndAdjusted.toISOString()]))
    }
  }

  return(
    <Accordion>
      <ReplyButtonToggle 
        eventKey="0" 
        checked={dateSearch} 
        onChange={() => dispatch(setSearchDate())}
      >
        Search By Dates
      </ReplyButtonToggle>
      <Accordion.Collapse eventKey="0">
        <DatePicker
          selectsRange={true}
          selected={dateStart} 
          onChange={(update) => handleDateRange(update)} 
          startDate={dateStart}
          endDate={dateEnd}
          inline={true}
          calendarContainer={con}
        />
      </Accordion.Collapse>
    </Accordion>
  )
}

function ReplyButtonToggle({ children, eventKey, checked, onChange }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  const handleChange = () => {
    decoratedOnClick()
    onChange()
  }

  return (
    <>
      <Form.Label>Dates </Form.Label>
      <Form.Check 
        type="checkbox" 
        checked={checked} 
        onChange={() => handleChange()} 
        label={children} 
      />
    </>
  );
}