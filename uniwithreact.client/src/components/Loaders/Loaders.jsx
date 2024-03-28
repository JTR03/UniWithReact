const API_URL = "/students";

export function studentLoader() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}
