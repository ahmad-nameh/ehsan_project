import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function ResponsiveDatePickers({ datee, setDate }) {

  function convertdate(str){
    var date = new Date(str);
    var mnth=("0"+(date.getMonth()+1)).slice(-2);
    var day=("0"+date.getDate()).slice(-2);
    return [date.getFullYear(),mnth,day].join("-");
}
  const handleDateChange = (newValue) => {
    console.log(newValue);
    setDate(convertdate(newValue));
    // console.log(Date);
    var formattedDate = convertdate(newValue);
    // console.log(formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DatePicker',
          'MobileDatePicker',
          'DesktopDatePicker',
          'StaticDatePicker',
        ]}
      >
        {/* <DemoItem label="Desktop variant">
          <DesktopDatePicker defaultValue={dayjs('2022-04-17')} />
        </DemoItem>
        <DemoItem label="Mobile variant">
          <MobileDatePicker defaultValue={dayjs('2022-04-17')} />
        </DemoItem>
        <DemoItem label="Responsive variant">
          <DatePicker defaultValue={dayjs('2022-04-17')} />
        </DemoItem> */}
        <DemoItem >
          <StaticDatePicker defaultValue={dayjs('2022-04-17')} onChange={handleDateChange} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}