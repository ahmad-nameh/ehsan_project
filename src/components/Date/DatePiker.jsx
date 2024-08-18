import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./date.css";
import dayjs from "dayjs";
export default function DatePiker({ datee, setDate }) {
  function convertdate(str) {
    var date = new Date(str);
    var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const handleDateChange = (newValue) => {
    //  (newValue);
    setDate(convertdate(newValue));
    //  (Date);
    var formattedDate = convertdate(newValue);
    //  (formattedDate);
  };
  return (
    <div className="datePicker">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={datee ? dayjs(datee) : null}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </div>
  );
}
