// import { styled } from "@mui/material/styles";
// import Tooltip from "@mui/material/Tooltip";
// import Stack from "@mui/material/Stack";
import {  DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// const ProSpan = styled("span")({
//   display: "inline-block",
//   height: "1em",
//   width: "1em",
//   verticalAlign: "middle",
//   marginLeft: "0.3em",
//   marginBottom: "0.08em",
//   backgroundSize: "contain",
//   backgroundRepeat: "no-repeat",
//   backgroundImage: "url(https://mui.com/static/x/pro.svg)",
// });

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
