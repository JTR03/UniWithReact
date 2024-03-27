import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DatePickerComponents from "./DatePicker";
import dayjs from "dayjs";

const FormDialog = ({ open, handleClose, student, onUpdate, title, onAdd }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            if (student.studentID) {
              onUpdate({
                studentID: student.studentID,
                firstName: formJson.firstName,
                lastName: formJson.lastName,
                enrollmentDate: formJson.enrollmentDate,
              });
            } else {
              onAdd(formJson);
            }

            handleClose();
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {student.studentID
              ? `Update ${student.fullName} in the database`
              : "Add a new student to the database"}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="firstName"
            name="firstName"
            label="First Name"
            defaultValue={student.firstName}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            defaultValue={student.lastName}
            fullWidth
            variant="standard"
          />
          <DatePickerComponents
            date={dayjs(new Date(student.enrollmentDate).toLocaleDateString())}
            name="enrollmentDate"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{student.studentID ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  title: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
};

export default FormDialog;
