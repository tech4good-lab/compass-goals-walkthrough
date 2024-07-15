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
   const dayOfWeek = today.getDay();
 
   const sunday = new Date(today); // get the date for the last sunday
   sunday.setDate(today.getDate() - dayOfWeek);
 
   sunday.setHours(0, 0, 0, 0); // set the time to midnight
 
   return sunday;
 }
 