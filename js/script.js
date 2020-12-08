/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Author: Mathieu Desilets
*/

// Wait for DOM content to be fully loaded before load the JS
document.addEventListener('DOMContentLoaded', () => {

   // Dynamically create and add the search component to the webpage
   // Create Label for search bar
   const header = document.querySelector('header');
   const headerLabel = document.createElement('label');
   headerLabel.for = 'search';
   headerLabel.className = 'student-search';
   // Create the search input box
   const input = document.createElement('input');
   input.id='search';
   input.placeholder = 'Search by name...';
   // Create the button and append the search icon to it
   const button = document.createElement('button');
   button.type = 'button';
   const btnImg = document.createElement('img');
   btnImg.src = 'img/icn-search.svg';
   btnImg.alt = 'Search icon';
   button.appendChild(btnImg);
   // Append the input, button and label to the header section
   headerLabel.appendChild(input);
   headerLabel.appendChild(button);
   header.appendChild(headerLabel);

   // Search Bar logic starts here
   function searchFunction() {
      const inputValue = input.value;
      const searchStudents = [];
      // Compare the input entered in the search bar to the Data array first and last name
      for ( let i = 0; i < data.length; i++ ) {
         if ( data[i].name.first.indexOf(inputValue) !== -1 || data[i].name.last.indexOf(inputValue) !== -1 ) {
            searchStudents.push(data[i]);
         }
         if ( searchStudents.length > 0 ) {
            showPage(searchStudents, 1);
         } else {
            const ul = document.querySelector('ul');
            ul.innerHTML = `<h1>No results found.<h1>`;
         }
         addPagination(searchStudents);
      }
   }

   button.addEventListener('click', () => {
      searchFunction();
   });

   input.addEventListener('keyup', () => {
      searchFunction();
   });
   
 
   // showPage Function
   // This function will create and insert/append the elements needed to display a "page" of nine students

   function showPage(list, page) {
      const startIndex = (page * 9) - 9;
      const endIndex = page * 9;
      const ul = document.querySelector('ul');
      ul.innerHTML = '';
      
      // Function used to create the card with user infos
      function createCard(list, i) {
         const li = document.createElement('li');
         const divDetail = document.createElement('div');
         const divJoined = document.createElement('div');
         li.className = "student-item cf";
         divDetail.className = "student-details";
         divDetail.innerHTML = `<img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
                              <h3>${list[i].name.first} ${list[i].name.last}</h3>
                              <span class="email">${list[i].email}</span>`;
         divJoined.className = "joined-details"
         divJoined.innerHTML = `<span class="date">Joined ${list[i].registered.date}</span>`;
         li.appendChild(divDetail);
         li.appendChild(divJoined);
         ul.appendChild(li); 
      }

      for ( let i = 0; i < list.length; i++ ) {
         if ( i >= startIndex && i < endIndex ) {
            createCard(list, i); 
         }
      }
   }
   
   // addPagination function
   // This function will create and insert/append the elements needed for the pagination buttons
  
   function addPagination(list) {
      const buttonsRequired = Math.ceil( list.length / 9 )
      const ul = document.querySelectorAll('ul')[1];
      
      ul.innerHTML = '';

      for ( let i = 1; i <= buttonsRequired; i++  ) {
         const li = document.createElement('li');
         const btn = document.createElement('button');
         btn.type = 'button';
         btn.textContent = `${i}`;
         li.appendChild(btn);
         ul.appendChild(li);
      }

      // Set first button as active
      const firstBtn = document.querySelector('li button');
      if( firstBtn ) {
         firstBtn.className = 'active';
      }

      // Links buttons logic
      const linksUl = document.querySelector('.link-list');
      const linksBtn = linksUl.querySelectorAll('li button');

      linksUl.addEventListener('click', (e) => {
         if ( e.target.type === 'button' ) {
            for (let i = 0; i < linksBtn.length; i++ ) {
               linksBtn[i].classList = '';
            }
            e.target.className = 'active';
            const pageNumber = +e.target.textContent;
            showPage(list, pageNumber);
         }
      });

   }

   // Initial call of the functions to show data on page load
   showPage(data, 1);

   addPagination(data);

});