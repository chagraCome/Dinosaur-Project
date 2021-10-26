    // Create Dino Constructor
    function Dinosaur(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
        this.NetflixShow = 'AO';
    }

    //Create Dino Objects
  function fetchfile(){
        let dinosaursList;
        return fetch("dino.json")
        .then((response) => response.json())
        .then((data) => {
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
            this.height= inches+ (feet*12),
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
    const weightCompare=(dinasaur,human)=>{ 
        const diname=dinasaur.species;
        const diweight=dinasaur.weight;
        const huweight=human.weight;
        const huname=human.name;
        const weightDifference= diweight-huweight;
       if( weightDifference > 0){
            return `${diname} is heavier than ${huname} with ${weightDifference} Lbs`;
        }
        else if(weightDifference< 0){
            return `${huname} is heavier than ${diname} with ${Math.abs(weightDifference)} Lbs`;
        }else{
            return `${huname} and ${diname} have the same weight: ${huweight} Lbs`;
        }
        }

        // Create Dino Compare Method 2
        // NOTE: Weight in JSON file is in lbs, height in inches.
     const heightCompare=(dinasaur,human)=>{ 
        const diname=dinasaur.species;
        const dihight=dinasaur.height;
        const huhight=human.height;
        const huname=human.name;
        const heightDifference=dihight-huhight;
        const positivedif= Math.abs(heightDifference);
            if(heightDifference > 0){
                return `${diname} is talller than ${huname} with ${heightDifference} inches`;
            }
            else if(heightDifference < 0){
                const heightDifference=human.height-this.height;
                return `${diname} is shorter than ${huname} with ${positivedif} inches`;
            }else{
                return `${huname} and ${diname} have the same height: ${huhight} inches`;
            }
        }
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
        const dietCompare=(dinasaur,human)=>{
            if(human.diet!=dinasaur.diet){
                return `${dinasaur.species} have different diet than ${human.name}`;
            }
            else{
                return`${dinasaur.species} and ${human.name} have the same diet. Hmmm interessting !`;
            }
        }

    // Generate Tiles for each Dino in Array
  
        const doAction= (human)=>{
            // Remove form from screen 
            const ourForm =document.getElementById('dino-compare');
            ourForm.style.display = "none";
          //create new array from dinoData with different facts
         // dinoData.forEach(element => {element.prototype=weightCompare(huma)});
          const dinoFacts=dinoData.map(di=>{
              //choose a rundom number between 0 and 4
              const randumNum=Math.floor(Math.random() * 4);
              if(di.species!="Pigeon"){
              switch(randumNum){
                  case 1:
                      di.fact= weightCompare(di,human);
                      break;
                  case 2:
                      di.fact= heightCompare(di,human);
                      break;
                  case 3:
                      di.fact= di.fact;
                      break;
                  default:
                      di.fact= dietCompare(di,human);
              }
          }
              return di;
          });
          //add human to to the final version of dinosaurs Array
          dinoFacts.splice(4, 0, human);
          const ourGrid = document.getElementById("grid");
         for (let i = 0; i < 9; i++) {
              const gridItem = document.createElement('div');
              gridItem.classList.add("grid-item");
              const element = dinoFacts[i];
        //check if the object is human or no, if yes we will not add fact to this tile
              if(element.species!="human beeing"){
                gridItem.innerHTML = `<h3>${element.species}</h3>
                <img src="images/${element.species.toLowerCase()}.png" alt="image of ${element.species}">
                <p>${element.fact}</p>`;
              }else {
                gridItem.innerHTML = `<h3>${element.name}</h3>
                <img src="images/human.png" alt="image of human">
                <p>${element.name}</p>`;
             
          }
          ourGrid.appendChild(gridItem); 
      }  
    }
      
      