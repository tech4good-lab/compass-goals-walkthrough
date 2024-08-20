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

/** Helper function to get the start of the week as a date object. */
export function getStartWeekDate() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Create a new date object for the Sunday of the current week
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  // Set the time to midnight
  sunday.setHours(0, 0, 0, 0);

  return sunday;
}