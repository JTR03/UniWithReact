import * as React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TableHead from "@mui/material/TableHead";
import FormDialog from "../FormDialog";

export default function StudentDisplay({ data }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false)
    }

  const columns = [
    { field: "firstName", headerName: "First Name" },

    { field: "lastName", headerName: "Last Name" },

    { field: "enrollmentDate", headerName: "Enrollment Date" },
  ];

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((student) => (
              <TableRow key={student.studentID}>
                <TableCell component="th" scope="row">
                  {student.firstName}
                </TableCell>
                <TableCell style={{ width: 160 }}>{student.lastName}</TableCell>
                <TableCell style={{ width: 160 }}>
                  {student.enrollmentDate}
                </TableCell>
                <TableCell style={{ width: 160 }}>
                  <ButtonGroup variant="text" aria-label="Basic button group">
                    <Button onClick={handleOpen}>Edit</Button>
                    <Button>Details</Button>
                    <Button>Delete</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePagination}
              />
            </TableRow>
          </TableFooter>
        </Table>
          </TableContainer>
          <FormDialog open={open} handleClose={handleClose}/>
    </>
  );
}

StudentDisplay.propTypes = {
  data: PropTypes.array.isRequired,
};
