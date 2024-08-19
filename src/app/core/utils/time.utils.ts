/** Helper function to get the start of the week as a string. */
export function startOfWeek() {
  const today = new Date();
  const startDate = new Date(new Date().setDate(today.getDate() - today.getDay()));
  return (startDate.getMonth() + 1) + '/' + startDate.getDate();
}


/** Helper function to get the end of the week as a string. */
export function endOfWeek() {
  const today = new Date();
  const endDate = new Date(new Date().setDate(today.getDate() + (6 - today.getDay())));
  return (endDate.getMonth() + 1) + '/' + endDate.getDate();
}
