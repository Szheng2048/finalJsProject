//*variables***********/
const rollButton = document.getElementById("rollButton")
const rerollButton = document.getElementById('reRollButton')
const rollingDice = document.querySelectorAll(".rollingDice")

let d6Array = []
let reRollArray = []
let conditionCount = 0
//count of 0 is for the first roll
//count of 1 is for the reroll
//amount of times the dice is selecter after roll

//dice rolling function**/





//*eventListeners********/

rollButton.addEventListener("click",()=>{
    if(conditionCount === 0){
        d6Array.push(randomD6result(),randomD6result(),randomD6result(),randomD6result(),randomD6result(),randomD6result())
        console.log(d6Array)
        for(let i = 0;i<rollingDice.length;i++){
            rollingDice[i].src= `diceImages/dice-face-${d6Array[i]}.png`
        }
        conditionCount = 1
    }
})

for(let individualDice of rollingDice){
    individualDice.addEventListener('click',(event)=>{
        if(conditionCount === 1){
            if(!event.target.classList.contains("selected")){
                event.target.classList.add("selected")
                reRollArray.push(parseInt(event.target.src.slice(46,-4)))
                console.log(reRollArray)
            }
        }
    })
}
//builds an array for the reroll button to sort through and remove from the original array






//*******logic functions */
function randomD6result(){
    return Math.ceil(Math.random()*6)
}



//true or false functions





//**reset function */