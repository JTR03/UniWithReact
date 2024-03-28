import { INSTRUCTORS_API_URL } from "../Loaders/Loaders";

const headers = {
  "Content-type": "application/json",
};

export const handleAdd = (profToAdd) => {
  console.log(profToAdd);
  const intructor = fetch(INSTRUCTORS_API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      firstName: profToAdd.firstName,
      lastName: profToAdd.lastName,
      hireDate: profToAdd.enrollmentDate,
    }),
  })
    
  return intructor;
};
