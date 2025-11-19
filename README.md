# 💪🏼 Fitness Made Feasible 

**Fitness Made Feasible** is a multi-page, API-driven web app that guides users through a fully personalized fitness experience; from mood-based motivational quotes to finding nearby gyms, selecting muscle groups, and finally receiving exercise recommendations, with visual instructions, tailored to the gym they chose.

---

## 🚀 Features

### 🌤 Mood-Based Quotes  
- Users select their current mood.  
- App fetches motivational quotes using the **ZenQuotes API**.  
- Quotes are rendered dynamically and preserved via `localStorage`.

---

### 🏋️‍♂️ Nearby Gym Finder  
- Users enter an address.  
- App validates input with regex and queries **TomTom Geocoding** to get latitude and longitude.  
- Nearby gyms are fetched via **TomTom Category Search** and shown with:  
  - Name  
  - Distance  
  - Address  

---

### 💪 Muscle Selection  
- Users pick a muscle group from interactive cards.  
- Selection is stored and passed to the exercise generator.

---

### 🔧 Exercise Generator  
- Fetches exercises for the selected muscle from **ExerciseDB**.  
- Filters exercises based on equipment available at the selected gym.  
- Returns most relevant exercises with:  
  - GIF demo  
  - Name  
  - Instructions  

---

### 📄 Exercise Details  
- Detailed view includes:  
  - Full GIF animation  
  - Step-by-step instructions  
  - Primary target muscles  

---

## 🧩 Tech Stack

- **JavaScript (ES6+)**
- **LocalStorage for state management**
- **HTML + TailwindCSS**
- **ZenQuotes API** (motivation)  
- **TomTom Geocoding + Category Search API** (gyms)  
- **ExerciseDB API** (exercise data)  
- DOM Manipulation  
- Modular controller functions 

---

## Home Page 
![Home](Assets/Home.png?raw=True)

