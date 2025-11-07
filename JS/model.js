"use strict";

function validate(address, zip) {
    // Address -> street number + name 
    const addressRegex = /^[0-9]+\s+[A-Za-z0-9\s.,'-]+$/;
    // ZIP -> 5 digits or ZIP+4 
    const zipRegex = /^\d{5}(-\d{4})?$/;

    if (addressRegex.test(address.trim()) && zipRegex.test(zip.trim())) {
        return true;
    }
    return false;
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}


async function getQuotes(mood) {
    // Queries api to find qoutes based on selected mood
    const url = "https://zenquotes.io/api/random/keyword=" + mood.toLowerCase()
    const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);
    const qouteResponse = await fetch(proxyUrl);
    const qouteData = await qouteResponse.json();
    
    return qouteData
}

async function getGyms(address, zip) {
    // Queries the api for 6 gyms 
    // First get lat/lon 
    const coordinatesResponse = await fetch(`https://api.tomtom.com/search/2/geocode/${address}, ${zip}, US, United States.json?key=msVHNezYI3fHEL1R8uHDyqIi9sQS01k7`);
    const coordinatesData = await coordinatesResponse.json();

    const lat = coordinatesData.results[0].position.lat;
    const lon = coordinatesData.results[0].position.lon;

    // Now query for gyms nearby
    const gymsResponse = await fetch(`https://api.tomtom.com/search/2/categorySearch/gym.json?lat=${lat}&lon=${lon}&radius=10000&key=msVHNezYI3fHEL1R8uHDyqIi9sQS01k7`);
    const gymsData = await gymsResponse.json();

    let gyms = [];

    for (let i = 0; i < 6; i++) {
        let gymName = gymsData.results[i].poi.name;
        let distance = gymsData.results[i].dist;
        let address = `${gymsData.results[i].address.streetNumber} ${gymsData.results[i].address.streetName}, ${gymsData.results[i].address.municipality}, ${gymsData.results[i].address.countrySubdivisionName}.`;
        gyms.push({ details : gymName, distance, address });
    }
    return gyms;
}

function categorizeGym(name) {
    // Sends the gym into one of four groups: Strenght, Functional, Combat, Other
    if (!name) return "other";
    const gymTitle = name.toLowerCase();

    const strengthWords = ["strength", "power", "barbell", "iron", "lifting", "crossfit"];
    const functionalWords = ["fitness", "training", "athletic", "functional", "conditioning", "bootcamp", "wellness"];
    const combatWords = ["mma", "boxing", "kickboxing", "muay thai", "bjj", "jiu jitsu", "martial", "karate", "taekwondo", "grappling"];

    // Return gym type
    if (strengthWords.some(k => gymTitle.includes(k))) {
        return "strength";
    } else if (functionalWords.some(k => gymTitle.includes(k))) {
        return "functional";
    } else if (combatWords.some(k => gymTitle.includes(k))) {
        return "combat";
    } else {
        return "other";
    }
}

async function getExercises(muscle, gymCategory) {
    // Get equipment in that gym 
    const equipmentList = equipmentTypes[gymCategory] || [];

    // Gets 10 exercises for the selected muscle, add to an array
    const exerciseResponse = await fetch(`https://www.exercisedb.dev/api/v1/muscles/${muscle}/exercises?offset=0&limit=10&includeSecondary=false`);
    const exerciseData = await exerciseResponse.json();

    let finalResults = [];

    // Check if the response has data
    if (!exerciseData || !exerciseData.data) {
        console.log("No exercise data found");
        return [];
    }

    

    // Filters by equipments avaiable in the selected gym
    for (const exercise of exerciseData.data) {
        const exerciseEquipments = Array.isArray(exercise.equipments) ? exercise.equipments.map(e => e.toLowerCase()) : [];
        const isAvailable = exerciseEquipments.some(eq => equipmentList.includes(eq));

        if (isAvailable) {
            finalResults.push(exercise);
        }
    }

    // Shuffles and returns top 6
    finalResults.sort(() => Math.random() - 0.5);
    return finalResults.slice(0, 6);
}

function exerciseDetails(exercises) {
    // Takes exercises array and returns the required info only
    return exercises.map(ex => {
        return {
        name: ex.name,
        muscles: ex.targetMuscles,
        instructions: ex.instructions ? ex.instructions.join(" ") : "No instructions available.",
        gif: ex.gifUrl
        };
    });
}

function shuffle(array) {
    // Takes in an array and shuffles it
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const equipmentTypes = {
    strength : ["trap bar", "smith machine", "weighted", "olympic barbell", "dumbbell", "rope", "barbell", "cable"],
    functional : ["elliptical machine", "tire", "wheel roller", "hammer", "resistance band", "roller", "kettlebell", "stability ball", "medicine ball"],
    combat : ["trap bar", "hammer", "weighted", "olympic barbell", "kettlebell", "ez barbell", "dumbbell", "barbell", "body weight"],
    other : ["medicine ball", "stepmill machine", "elliptical machine", "stationary bike", "body weight", "roller", "resistance band", "kettlebell", "stability ball", "dumbbell"]
}