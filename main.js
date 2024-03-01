//*variables***********/
const rollButton = document.getElementById("rollButton")
const rerollButton = document.getElementById('reRollButton')
const rollingDice = document.querySelectorAll(".rollingDice")

let d6Array = []
let reRollArray = []
let conditionCount = 0
//count of 0 is for the first roll
//count of 1 is for the reroll
let rerollCount = 0
//as long as rerollCount is not zero reroll can be clicked
let maxRerollCount = 0
//amount of times the dice is selecter after roll

//dice rolling function**/





//*eventListeners********/

rollButton.addEventListener("click",()=>{
    if(conditionCount === 0){
        d6Array.push(randomD6result(),randomD6result(),randomD6result(),randomD6result(),randomD6result())
        console.log(d6Array)
        for(let i = 0;i<rollingDice.length;i++){
            rollingDice[i].src= `diceImages/dice-face-${d6Array[i]}.png`
        }
        conditionCount = 1
    }
})

for(let individualDice of rollingDice){
    individualDice.addEventListener('click',(event)=>{
        if(conditionCount === 1&&maxRerollCount<=1){
            if(!event.target.classList.contains("selected")){
                event.target.classList.add("selected")
                reRollArray.push(parseInt(event.target.src.slice(46,-4)))
                console.log(reRollArray)
            }
        }
        rerollCount++
    })
}
//builds an array for the reroll button to sort through and remove from the original array

rerollButton.addEventListener("click",()=>{
    d6Array = replaceItemInArray(d6Array,reRollArray)
    if(rerollCount>0&&conditionCount===1&&maxRerollCount===0||maxRerollCount===1){
        for(let i = 0;i<rollingDice.length;i++){
            rollingDice[i].src= `diceImages/dice-face-${d6Array[i]}.png`
            rollingDice[i].classList.remove("selected")
        }
        maxRerollCount++
        rerollCount = 0
    }
    console.log(d6Array)
})




//*******logic functions */
function randomD6result(){
    return Math.ceil(Math.random()*6)
}

function replaceItemInArray(originalArr,filterArr){
    for(let item of originalArr){
        if(filterArr.indexOf(item) !== -1){
            originalArr.splice(originalArr.indexOf(item),1,randomD6result())
            filterArr.splice(filterArr.indexOf(item),1)
        }
    }
    return originalArr
}
//true or false functions





//**reset function */