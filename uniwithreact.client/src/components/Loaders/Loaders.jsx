export const STUDENTS_API_URL = "/students";
const DEPARTMENTS_API_URL = "/departments";
const COURSES_API_URL = "/courses";
export const INSTRUCTORS_API_URL = "/instructors";



export const studentLoader = async () => {
  const data = fetch(STUDENTS_API_URL).then((res) => res.json());
  return data;
};

export const departmentLoader = async () => {
  const data = fetch(DEPARTMENTS_API_URL).then((res) => res.json());
  return data;
};

export const coursesLoader = async () => {
  const data = fetch(COURSES_API_URL).then((res) => res.json());
  return data;
};

export const instructorsLoader = async () => {
  const data = fetch(INSTRUCTORS_API_URL).then((res) => res.json());
  return data;
};
