//*variables***********/
const rollButton = document.getElementById("rollButton")
const rerollButton = document.getElementById('reRollButton')
const rollingDice = document.querySelectorAll(".rollingDice")
const upperSectionClickitems = document.querySelectorAll('.singleNum')
const subTotalingUppers = document.querySelector("#subTotalingUppers")
const upperResults = document.querySelectorAll(".resultsUppers")
const subtotalOfUppers = document.getElementById('subtotalUppersResult')
const upperBonus = document.getElementById('upperBonus')
const upperBonusResults = document.getElementById("upperBonusResults")
const finalUppersButton = document.getElementById('finalUppers')
const finalUppersResult = document.getElementById('finalUppersResults')


let d6Array = []
let reRollArray = []
let conditionCount = 0
//count of 0 is for the first roll
//count of 1 is for the reroll
let rerollCount = 0
//as long as rerollCount is not zero reroll can be clicked
let maxRerollCount = 0
//amount of times the dice is selected after roll
let upperSectionClickCount = 6


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
        if(maxRerollCount <=1){
            rerollCount++
        }
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

//************uppersection numbers event listener */

for(let uppersectionNumber of upperSectionClickitems){
    uppersectionNumber.addEventListener("click",(event)=>{
        if(conditionCount !== 0 && rerollCount === 0){
            let number = event.target.id
            number = parseInt(number.slice(3))
            console.log(typeof number)
            let results = upperSectionLogic(d6Array,number)
            let elementToChange = document.querySelector(`#resultOf${number}`)
            elementToChange.innerHTML = results
            upperSectionClickCount --
            //math portion of logic
            conditionCount = 0
            maxRerollCount = 0
            d6Array.length = 0
            //resets the arrays to allow another roll
            event.target.style.pointerEvents = "none"
            event.target.style.backgroundColor = "red"
            //lets user interface know that this button can't be clicked again
            resetImages()
        }
    })
}

//*********upperSectionTotaling */
subTotalingUppers.addEventListener("click",(event)=>{
    if(upperSectionClickCount === 0){
        let total = 0
        for(let value of upperResults){
            total += parseInt(value.innerHTML)
        }
        console.log(total)
        subtotalOfUppers.innerHTML = `${total}`
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
        upperSectionClickCount --
    }
})

upperBonus.addEventListener('click',(event)=>{
    if(upperSectionClickCount === -1){
        let total = parseInt(subtotalOfUppers.innerHTML)
        let bonus = 0
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
        if(total>= 63){
            bonus += 35
        }
        upperBonusResults.innerHTML = bonus
        upperSectionClickCount--
    }
})

finalUppersButton.addEventListener('click',(event)=>{
    if(upperSectionClickCount === -2){
        finalUppersResult.innerHTML = parseInt(subtotalOfUppers.innerHTML) + parseInt(upperBonusResults.innerHTML)
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
    }
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

function upperSectionLogic(arr,num){
    let value = 0
    for(let dice of arr){
        if(dice === num){
            value += num
        }
    }
    return value
}

function resetImages(){
    for(let images of rollingDice){
        images.src = "diceImages/yahtzeeBeforeBonus.png"
    }
}


//true or false functions





//**reset functions */
