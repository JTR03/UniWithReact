import { useState, useEffect } from "react";
import StudentDisplay from "./components/students/Display";
import "./App.css";
import FormDialog from "./components/FormDialog";

const API_URL = "/students";
const headers = {
  "Content-type": "application/json",
};

const App = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState({});
  const [title, setTitle] = useState("");

  const handleCreate = (bool) => {
    setOpen(bool);
    setTitle("Add New Student");
  };

  const handleEdit = (bool, student) => {
    setOpen(bool);
    setEditing(student);
    setTitle("Edit Student");
  };

  const handleClose = () => {
    setOpen(false);
    setEditing({});
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data, console.log(data));
      })
      .catch((err) => console.log(err));
  };

  const handleAdd = (studentToAdd) => {
    console.log(studentToAdd);
    fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        firstName: studentToAdd.firstName,
        lastName: studentToAdd.lastName,
        enrollmentDate: "2024-03-22",
      }),
    })
      .then((res) => res.json())
      .then((student) => setStudents([...students, student]))
      .catch((err) => console.log(err));
  };

  const handleUpdate = (updatedStudent) => {
    console.log(updatedStudent);
    fetch(`${API_URL}/${updatedStudent.studentID}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updatedStudent),
    })
      .then(() =>
        students.map((s) =>
          s.studentID === updatedStudent.studentID ? updatedStudent : s
        )
      )
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers,
    })
      .then(() => setStudents(students.filter((s) => s.id !== id)))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <StudentDisplay
        data={students}
        handleStudent={handleEdit}
        onAdd={handleCreate}
        onDelete={handleDelete}
      />
      <FormDialog
        open={open}
        handleClose={handleClose}
        student={editing}
        onUpdate={handleUpdate}
        title={title}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default App;
