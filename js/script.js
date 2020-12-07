/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(data, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const ul = document.querySelector('ul');
   
   for ( let i = 0; i < data.length; i++ ) {
      if ( i >= startIndex && i < endIndex ) {
         const li = document.createElement('li');
         const divDetail = document.createElement('div');
         const divJoined = document.createElement('div');
         li.className = "student-item cf";
         divDetail.className = "student-details";
         divDetail.innerHTML = `<img class="avatar" src="${data[i]['picture']['medium']}" alt="Profile Picture">
                               <h3>${data[i]['name']['first']} ${data[i]['name']['last']}</h3>
                               <span class="email">${data[i]['email']}</span>`;
         divJoined.className = "joined-details"
         divJoined.innerHTML = `<span class="date">Joined ${data[i]['registered']['date']}</span>`;
         li.appendChild(divDetail);
         li.appendChild(divJoined);
         ul.appendChild(li); 
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
showPage(data, 1);