// Function to display exercises from api/localstorage on the selectExercises.html page

function displayQuote(quote){
  const quotes = quote.length!=0? quote : [
  {
    "q": "No kind action ever stops with itself. One kind action leads to another. Good example is followed.",
    "a": "Amelia Earhart",
    "h": "<blockquote>&ldquo;No kind action ever stops with itself. One kind action leads to another. Good example is followed.&rdquo; &mdash; <footer>Amelia Earhart</footer></blockquote>"
  },
  {
    "q": "Given the choice between the experience of pain and nothing, I would choose pain.",
    "a": "William Faulkner",
    "h": "<blockquote>&ldquo;Given the choice between the experience of pain and nothing, I would choose pain.&rdquo; &mdash; <footer>William Faulkner</footer></blockquote>"
  }
]
    const qContainer = document.getElementById('quotesContainer');
    qContainer.innerHTML='';
    const parser = new DOMParser();
    for(quote of quotes){
      const quotation = parser.parseFromString(quote.h, 'text/html')
      qContainer.appendChild(quotation.body.firstChild)
    }
}


function clearForm(){
    document.getElementById('street').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('zipCode').value = '';   
}


function displayExercises(arrayOfExercises,muscle) {
    const title = document.getElementById('exerciseTitle');
    title.innerText = `Exercises for ${muscle.charAt(0).toUpperCase() + muscle.slice(1)}`;
    const container = document.getElementById('exerciseContainer');
    let count = 0;
    let row;
    while(count < arrayOfExercises.length) {
        // Create a new row for every two exercises
        if (count % 2 === 0) {
        row = document.createElement('div');
        row.className = 'relative mx-auto z-15 flex sm:flex-row flex-col w-full px-3 sm:px-0 max-w-[1000px] gap-3';
        container.appendChild(row);
        }

        // Card div
        const exerciseCard = document.createElement('div');
        exerciseCard.className = 'w-full max-w-[500px] bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-2xl transition duration-300 ease-in-out';

        
        // Image element
        const exerciseImg = document.createElement('img');
        exerciseImg.className = 'w-full h-full  max-h-[200px] object-cover rounded-2xl';
        
        // exerciseImg.src = arrayOfExercises[count].imageURL;
        exerciseImg.src = arrayOfExercises[count].gif; // Placeholder image until api provides images
        exerciseImg.alt = arrayOfExercises[count].name;    
        exerciseCard.appendChild(exerciseImg);    
        
        // Title
        const exerciseHead = document.createElement('h2');
        exerciseHead.className = 'text-center px-6 py-3 text-2xl font-bold';
        exerciseHead.innerText = arrayOfExercises[count].name;
        exerciseCard.appendChild(exerciseHead);

        // Select Exercise Button
        const selectButton = document.createElement('button');
        selectButton.className = 'button bg-indigo-600! text-white mx-auto mb-4 flex';
        selectButton.innerText = 'Select Exercise';
        const currentIndex = count;
        selectButton.onclick = () => {
            // Store exercise details in localStorage  
         localStorage.setItem('selectedExercise', JSON.stringify(arrayOfExercises[currentIndex]));
         setTimeout(() => {
         window.location.href = './exerciseDetails.html';   
         }, 500);
        }
        exerciseCard.appendChild(selectButton);
        row.appendChild(exerciseCard);
        // Increment count
        count++;
    
    }
}

// Retrieve and display exercise details on the exerciseDetails.html page
function retrieveExercise(exercise){
    
    const container = document.getElementById("exerciseCard");
    container.innerHTML = `
    <!-- Top: Video -->
    <h1 class="text-3xl font-extrabold">${exercise.name}</h1>
    <section class="relative bg-black/5 flex items-center justify-center p-4 md:p-8">
      <div class="w-full h-full rounded-xl overflow-hidden flex flex-col">
        <div class="relative flex-1 bg-gray-900">
          <img src=${exercise.gif} alt="Exercise Demo" class="w-full h-full object-cover"/>
        </div>
      </div>
    </section>

    <!-- Bottom: Instructions -->
    <section class="p-6 md:p-8 overflow-y-auto">
      <div class="flex items-start justify-between">
        <div class="max-w-[800px] mx-auto text-center">
          <div class="mt-4 flex flex-wrap gap-2 justify-center"></div>
        </div>
      </div>

      <hr class="my-6 border-gray-100" />
      <div class="grid grid-cols-1 gap-6 text-center">
        <h2 class="text-lg font-semibold mb-3">Instructions</h2>
        <div class="list-decimal list-inside space-y-2 text-gray-700">
          ${exercise.instructions.split('.').map(ins =>
          { if(ins!="") 
              return `<p class="bg-white/60 p-3 rounded-md ring-1 ring-gray-50">${ins}</p>`
          }).join("")}
        </div>
      </div>
    </section>
    `;
}

function preserveMood(mood){
  document.getElementById("mood-select").value = mood;
}


function displayGyms(arrayOfGyms){
    // Placeholder function to avoid errors if called before data is ready
    if (arrayOfGyms.length === 0) {
        const container = document.getElementById("gymsContainer");
        container.className = 'bg-white relative z-15 flex flex-col items-center justify-center w-fit p-10 m-auto';
        container.innerHTML = `
            <h3 class="text-center text-xl text-gray-600 mt-10">No gyms found in your area. Please try a different address.</h3>
            <a href="./findGyms.html" class="button bg-indigo-600! text-white mt-6">Go Back</a>
            `;
        return;
    }

    const container = document.getElementById("gymsContainer");
    let count = 0;
    let row;
    while(count < arrayOfGyms.length) {
        // Create a new row for every two exercises
        if (count % 2 === 0) {
        row = document.createElement('div');
        row.className = 'relative mx-auto z-15 flex sm:flex-row flex-col w-full max-w-[1200px] gap-3';
        container.appendChild(row);
        }    
        // Card div
        const gymCard = document.createElement('div');
        gymCard.className = 'w-full max-w-[600px]';
        gymCard.innerHTML = `<div class="relative w-full h-[300px] max-w-[600px] bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-2xl transition duration-300 ease-in-out">
            <div class="flex items-start justify-between mb-4">
                <h2 class="flex flex-row text-3xl font-semibold text-gray-800">🏋️‍♂️ <span> ${arrayOfGyms[count].details}</span></h2>
                <span class="text-sm min-w-[110px] max-w-[250px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">${(arrayOfGyms[count].distance/1000).toFixed(2)} mi away</span>
            </div>
            <div class="space-y-2 text-gray-600">
                <p class="flex items-center text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 12.414A4 4 0 1112.414 11.414l4.243 4.243a8 8 0 10-11.314 11.314L11.414 12.414a4 4 0 111.414-1.414l4.243 4.243a8 8 0 0011.314-11.314z"></path>
                </svg>
                ${arrayOfGyms[count].address}
                </p>

               
            </div>
            <div class="absolute bottom-3 right-5 mt-6 flex justify-end" id="select-btn-wrapper-${count}"></div>
        </div>`;
        const btnWrapper = gymCard.querySelector(`#select-btn-wrapper-${count}`);
        const index = count
        if (btnWrapper) {
          const selectBtn = document.createElement('button');
          selectBtn.className = 'bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xl font-medium shadow-sm transition';
          selectBtn.innerText = 'Select';
          // Use a closure to capture the gym address for this iteration
          selectBtn.addEventListener('click', () => {
            selectedGym(JSON.stringify(arrayOfGyms[index]))
            
          });
          btnWrapper.appendChild(selectBtn);
        }

        row.appendChild(gymCard);
        count++;
    }
}

function selectedGym(gym){
  localStorage.setItem("selectedGym",gym)
  window.location.href = "./selectMuscles.html"
}

function bindSearchGyms(handler) {
  const searchButton = document.getElementById("searchGyms"); //Get the search button element
  searchButton.addEventListener('click',event=>{
    event.preventDefault();
    const address = document.getElementById('street').value.trim();
    const zip = document.getElementById('zipCode').value.trim();
    handler(address,zip); // Call the handler with address and zip in controller
  })
}

function bindMoodChange(handler){
  const moodSelect = document.getElementById("mood-select");
  moodSelect.addEventListener("change",
    handler()
  );
}

function bindExerciseCard(handler){
  document.querySelectorAll(".muscle-card").forEach(card => {
    card.addEventListener("click", (e) => {
        let selectedMuscle = e.currentTarget.dataset.muscle;
        handler(selectedMuscle);        
    });
  });
}

function displayError(){
    const errorMsg = document.getElementById('error-msg');
    errorMsg.textContent = '';
    errorMsg.textContent = 'Enter a valid address or ZIP code!';
}
