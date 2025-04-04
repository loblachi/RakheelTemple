import { eventsArr } from "./db.js";

eventsArr.sort((a, b) => new Date(a.date) - new Date(b.date));
let parentElem = document.querySelector(".event-list"); 

genEvents(); 
function genEvents(){
    let combinedHtml = ""; 
    eventsArr.forEach((event) => {
        const today = new Date().toISOString().split("T")[0];

        if (event.date === today) {
            event.isToday = true;
            console.log("Today is: " + event.name);
          } else {
            if( event.date < today){
               console.log("Past event: " + event.name);
                event.hasPassed = true;
            } else {
                event.isToday = false;
            }
          }
        // Format the date to "Month Day, Year"
        // Example: "March 25, 2024"
          let dateDatatype = new Date(event.date); 
          let formattedDate = dateDatatype.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long", // or "short" or "2-digit"
            day: "numeric"
          });

        if(event.hasPassed) return; // Skip past events
        let html = `
        <li class='${ event.isToday ? "todayClass" : ""}'>
              <strong>${event.name}</strong><br />
              <em>${formattedDate} – ${event.time}</em><br />
              <p>${event.description}</p>
        </li>
        `; 
        combinedHtml += html; 
        
    })
    parentElem.innerHTML = combinedHtml;
}
