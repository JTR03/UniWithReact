import * as React from "react";
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
import { Await, useLoaderData } from "react-router-dom";
import FormDialog from "../FormDialog";
import { INSTRUCTORS_API_URL } from "../Loaders/Loaders";
import Details from "./Details";

const headers = {
  "Content-type": "application/json",
};

const Instructors = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState({});
  const [title, setTitle] = React.useState("");

  const handleCreate = () => {
    setOpen(true);
    setTitle("Add New Professor");
  };

  const handleEdit = (prof) => {
    setOpen(true);
    setEditing(prof);
    setTitle("Edit Professor");
  };

  const handleClose = () => {
    setOpen(false);
    setEditing({});
  };

  const getInstructor = (id) => {
    fetch(`${INSTRUCTORS_API_URL}/${id}`)
      .then((res) => res.json())
      .then((data = console.log(data)))
      .catch((err) => console.log(err));
  };


  const handleUpdate = (updatedProf) => {
    console.log(updatedProf);
    fetch(`${INSTRUCTORS_API_URL}/${updatedProf.instructorID}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        firstName: updatedProf.firstName,
        lastName: updatedProf.lastName,
        hireDate: updatedProf.enrollmentDate,
      }),
    }).catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    fetch(`${INSTRUCTORS_API_URL}/${id}`, {
      method: "DELETE",
      headers,
    }).catch((err) => console.log(err));
  };

  let data = useLoaderData();

  const columns = [
    { field: "firstName", headerName: "First Name" },

    { field: "lastName", headerName: "Last Name" },

    { field: "hireDate", headerName: "Hire Date" },
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
    <React.Suspense fallback={<h1>Loading data...</h1>}>
      <Await resolve={data} errorElement={<p>Error loading data</p>}>
        <Button variant="contained" onClick={handleCreate}>
          ADD
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.headerName}
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
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((proffesor) => (
                <TableRow key={proffesor.instructorID}>
                  <TableCell component="th" scope="row">
                    {proffesor.firstName}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    {proffesor.lastName}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    {new Date(proffesor.hireDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>
                    <ButtonGroup variant="text" aria-label="Basic button group">
                      <Button onClick={() => handleEdit(proffesor)}>
                        Edit
                      </Button>
                      <Button
                        onClick={() => getInstructor(proffesor.instructorID)}
                      >
                        Details
                      </Button>
                      <Button
                        onClick={() => handleDelete(proffesor.instructorID)}
                      >
                        Delete
                      </Button>
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
      </Await>
      <FormDialog
        open={open}
        handleClose={handleClose}
        student={editing}
        onUpdate={handleUpdate}
        title={title}
        // onAdd={handleAdd}
      />
      <Details />
    </React.Suspense>
  );
};

export default Instructors;
