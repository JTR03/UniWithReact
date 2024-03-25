import { useState, useEffect } from "react";
import StudentDisplay from "./components/students/Display";
import "./App.css"

const API_URL = "/students";

const App = () => {
  const [students, setStudents] = useState([]);

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

  return (
    <div>
          <StudentDisplay data={students} />
    </div>
  );
};

export default App;
