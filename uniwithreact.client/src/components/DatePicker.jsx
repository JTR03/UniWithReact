import {  DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// eslint-disable-next-line react/prop-types
export default function DatePickerComponents({ date, name }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem label="Enrollment Date">
        <DatePicker format="YYYY-MM-DD" defaultValue={date} name={name} />
      </DemoItem>
    </LocalizationProvider>
  );
}
