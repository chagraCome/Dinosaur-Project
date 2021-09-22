    // Create Dino Constructor
    function Dinosaur(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
        this.favoriteLanguage = 'JavaJSScript';
    
    }

    //Create Dino Objects
  function fetchfile(){
        let dinosaursList;
        return fetch("dino.json")
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
          dinosaursList = data.Dinos.map(
            x =>
              new Dinosaur(
                x.species,
                x.weight,
                x.height,
                x.diet,
                x.where,
                x.when,
                x.fact
              )
          );
          return dinosaursList;
    })
}

    let dinoData=[]
    window.onload = async function() {
        dinoData = await fetchfile();
    }
    
  
    // Create Human Object
    function HumanUser(name, feet, inches, weight, diet) {
        this.name = name,
            this.feet = feet,
            this.inches = inches,
            this.weight = weight,
            this.diet = diet,
            this.height=(inches * 2.54)+ (feet),
            this.species="human beeing"
    }

    // Use IIFE to get human data from form
    (function getUserData(){
        const button = document.getElementById('btn');
        button.addEventListener('click', function (e) {
            let name = document.getElementById('name').value;
            let feet = document.getElementById('feet').value;
            let inches = document.getElementById('inches').value;
            let weight = document.getElementById('weight').value;
            let diet = document.getElementById('diet').value;
            const human = new HumanUser(name, feet, inches, weight, diet);
            doAction(human);
        });
        })();

// Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    Dinosaur.prototype.weightCompare=(human)=>{ 
        console.log(this.species);
       if(this.weight> human.weight){
            const weightDifference=this.weight-human.weight;
            return `${this.species} is heavier than ${human.name} with ${weightDifference} Lbs`;
        }
        else if(this.weight< human.weight){
            const weightDifference=human.weight-this.weight;
            return `${human.name} is heavier than ${this.species} with ${weightDifference} Lbs`;
        }else{
            return `${human.name} and ${this.species} have the same weight: ${human.weight} Lbs`;
        }
        }

        // Create Dino Compare Method 2
        // NOTE: Weight in JSON file is in lbs, height in inches.
     Dinosaur.prototype.heightCompare=(human)=>{ 
        console.log(this.species);
            if(this.height> human.height){
                const heightDifference=this.height-human.height;
                return `${this.species} is talller than ${human.name} with ${heightDifference} inches`;
            }
            else if(this.height< human.height){
                const heightDifference=human.height-this.height;
                return `${this.species} is shorter than ${human.name} with ${heightDifference} inches`;
            }else{
                return `${human.name} and ${this.species} have the same height: ${human.height} inches`;
            }
        
        }
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
        HumanUser.prototype.dietCompare=(dinasaur)=>{
            console.log(this.name);
            if(this.diet!=dinasaur.diet){
                return `${dinasaur.species} have different diet than ${this.name}`;
            }
            else{
                return`${dinasaur.species} and ${this.name} have the same diet. Hmmm interessting !`;
            }
        }

    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

   
        const doAction= (human)=>{
            // Remove form from screen 
            const ourForm =document.getElementById('dino-compare');
            ourForm.style.display = "none";
          //create new array from dinoData with different facts
         // dinoData.forEach(element => {element.prototype=weightCompare(huma)});
          const dinoFacts=dinoData.map(di=>{
              //choose a rundom number between 0 and 4
              const randumNum=Math.floor(Math.random() * 4);
              console.log(randumNum);
              if(di.species!="Pigeon"){
              switch(randumNum){
                  case 1:
                      di.fact=di.weightCompare(human);
                      break;
                  case 2:
                      di.fact=di.heightCompare(human);
                      break;
                  case 3:
                      di.fact=di.fact;
                      break;
                  default:
                      di.fact=human.dietCompare(di);
              }
          }
              return di;
          });
          //add human to to the final version of dinosaurs Array
          console.log(dinoFacts);
          dinoFacts.splice(4, 0, human);
          const ourGrid = document.getElementById("grid");
         for (let i = 0; i < 9; i++) {
              const gridItem = document.createElement('div');
              gridItem.classList.add("grid-item");
              const element = dinoFacts[i];
    //check if the object is human or no, if yes we will not add fact to this tile
            console.log(typeof(element));
              if(element.species=="human beeing"){
              gridItem.innerHTML = `<h3>${element.name}</h3>
              <img src="images/human.png" alt="image of human">
              <p>${element.name}</p>`;
              }else {
              gridItem.innerHTML = `<h3>${element.species}</h3>
              <img src="images/${element.species.toLowerCase()}.png" alt="image of ${element.species}">
              <p>${element.fact}</p>`;
          }
          ourGrid.appendChild(gridItem); 
      }  
    }

// On button click, prepare and display infographic
      
      