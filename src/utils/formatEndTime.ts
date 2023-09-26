export function formatEndTime(originalEndTime:any) {
    // Parse the original end time into a Date object
    const dateObject = new Date(originalEndTime);
  
    // Create formatted date components
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const year = dateObject.getFullYear();
  
    // Create the formatted end time string
    const formattedEndTime = `${day}-${month}-${year}`;
  
    return formattedEndTime;
  }