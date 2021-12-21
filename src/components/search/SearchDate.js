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
  const [dateStart, dateEnd] = values.dateRange
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
          onChange={(update) => 
            {
              dispatch(setDateRange(update))
            }
          } 
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