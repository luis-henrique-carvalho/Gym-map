export function setLocationLocalStorage(location) {
  localStorage.setItem("location", JSON.stringify(location));
}

export function getLocationLocalStorage() {
  const json = localStorage.getItem("location");
  if (!json) {
    return null;
  }

  const location = JSON.parse(json);
  
  return location ?? null;
}