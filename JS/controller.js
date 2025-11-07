"use strict";

async function mood() {
    // Tries to get user mood
    const mood = document.getElementById('mood-select').value;
    // If mood provided, gets qoutes
    let quotes = {contents:`[]`};
    saveData("quote",quotes)

    if (mood!=='null'){
        quotes = await getQuotes(mood);
        saveData("mood",mood);
        saveData("quote",quotes)
    }
    // Sends qoutes to view.js
    displayQuote(JSON.parse(quotes.contents));
}

async function gym(address,zip) {
    // Gets user address and zip for finding gyms 

    // Clear previous 
    // Validate
    if (!validate(address, zip)) {
        displayError();
        return;
    }

    // save data are redirect to gyms
    await getGyms(address, zip).then((data)=>{
        saveData('gyms',data);
    });
    clearForm();
    window.location.href = "./selectGyms.html";
}


    
async function exercise(selectedMuscle) {
    // Get gym and muscle from local storage
    saveData("muscle", selectedMuscle);
    const selectedGym = loadData("selectedGym")["details"] || "other" ;    
    if (!selectedGym || !selectedMuscle) return;

    const gymCategory = categorizeGym(selectedGym);
    console.log(gymCategory)
    const exercises = await getExercises(selectedMuscle, gymCategory);
    const detailedExercises = await exerciseDetails(exercises);
    saveData("exercises", detailedExercises);
    window.location.href = "./selectExercises.html"
}

function refresh(path){
        // Load landing page
        if(path[path.length - 1] === ''){
            const quotes  = loadData('quote') 
            let moodVariable = loadData('mood');

            if(moodVariable.length==0){
                moodVariable = 'null';
            }

            bindMoodChange(mood)
            preserveMood(moodVariable);
            displayQuote(JSON.parse(quotes.contents))
        }

        // Load find gyms page
        else if(path[path.length - 1] === 'findGyms.html'){
            bindSearchGyms(gym)
        }      

        // Load gyms when on gyms page
        else if (path[path.length - 1] === 'selectGyms.html'){
            const gyms = loadData('gyms')
            displayGyms(gyms)
        }

        // Load muscles to select from
        else if (path[path.length - 1] === 'selectMuscles.html'){
            // Get selected muscle
            bindExerciseCard(exercise);
        }
        
        // Load exercises avaiable
        else if (path[path.length - 1] === 'selectExercises.html'){
                const exercises = loadData('exercises');
                const muscle = loadData('muscle')
                displayExercises(exercises, muscle)
        }

        // Load selected exercise details
        else if (path[path.length - 1] === 'exerciseDetails.html'){
                const selectedExercise = loadData('selectedExercise');
                retrieveExercise(selectedExercise);
        }
    }

document.addEventListener("DOMContentLoaded", () => {
    // Event listeners added on page load
    const path = window.location.pathname.split('/')
    refresh(path)
});