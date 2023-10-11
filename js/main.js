// Tableau réponse de cartes
let responseTab = ["apple", "apple", "banana", "banana", "orange", "orange", "cherry", "cherry", "pepper", "pepper", "straw", "straw"];
let result = [];
let shot;
// Références
const cardFrontImgTab = [...document.querySelectorAll('.card-front-img')];
const cardTab = [...document.querySelectorAll('.card')];
let shotText = document.querySelector(".shot");
const btnNewParty = document.querySelector(".btn-newParty");
let message = document.querySelector('.message');

//#region Fonction
/*
Fonction de mélange de cartes
*/
function mixCards() {
    let j, tmpCard;
    for (let i = responseTab.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmpCard = responseTab[i]
        responseTab[i] = responseTab[j];
        responseTab[j] = tmpCard;
    }
}
/*
Fonction d'animation des cartes
*/
function animCard(index, transformValue, visibilityValue) {
    // Animation de retournement des cartes
    cardTab[index].style.cssText = `transform : rotateY(${transformValue}deg);`;
    setTimeout(() => {
        cardTab[index].children[0].style.visibility = visibilityValue[0];
        cardTab[index].children[1].style.visibility = visibilityValue[1];
    }, 300)
    canPlay = true;
}
/*
Fonction d'initialisation
*/
function init() {
    result = [false, false, false, false, false, false, false, false, false, false, false, false];
    shot = 0;
    for (let i = 0; i < cardFrontImgTab.length; i++) {
        cardFrontImgTab[i].src = `./images/${responseTab[i]}.svg`;
    }
    console.log(responseTab);
}
/*
Fonction nouvelle partie
*/
function newParty(){
    history.go();
    btnNewParty.style.cssText = "display: none";
    message.textContent = ``;
}
//#endregion

// Initialisation
// mixCards();
init();

// Ecouteur sur chaque carte
let iTmp;
let canPlay = true;
let sameCard = 0;
for (let i = 0; i < cardTab.length; i++) {
    cardTab[i].addEventListener("click", evt => {
        if (canPlay) {

            // Vérification des doublons et affichage du nombre de coups
            if (!result[i]) {
                // Animation des cartes
                animCard(i, "180", ["hidden", "visible"]);
                shot++;
                if (shot % 2 != 0) {
                    iTmp = i;
                }
                else {
                    canPlay = false;
                    shotText.textContent = `${shot / 2}`
                    // Doublon non identiques
                    if (cardFrontImgTab[i].src != cardFrontImgTab[iTmp].src) {
                        setTimeout(() => {
                            animCard(i, "0", ["visible", "hidden"]);
                            animCard(iTmp, "0", ["visible", "hidden"]);
                        }, 2000)
                    }
                    // Doublon identiques
                    else {
                        sameCard ++;
                        setTimeout(() => {
                            cardTab[i].style.background = "linear-gradient(90deg, #a9fabb, #0e5a07)";
                            cardTab[iTmp].style.background = "linear-gradient(90deg, #a9fabb, #0e5a07)";
                            cardTab[i].style.boxShadow = "0 0 20px white";
                            cardTab[iTmp].style.boxShadow = "0 0 20px white";
                            result[i] = true;
                            result[iTmp] = true;
                            canPlay = true;
                            if (sameCard == 6){
                                btnNewParty.style.cssText = "display: block";
                                message.textContent = `Félicitation ! Vous avez terminé la partie en ${shot/2} coups`;
                            }
                        }, 1500)
                    }
                }
            }
            else {
                console.log("on fait rien");
            }
        }
    }, false)
}

// Ecouteur de la touche espace
document.addEventListener("keydown", evt=>{
    if(evt.code === 'Space'){
        newParty();
    }
},false)

// Ecouteur du bouton nouvelle partie
btnNewParty.addEventListener("click",evt=>{
    newParty();
},false)