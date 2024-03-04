//*variables***********/
const rollButton = document.getElementById("rollButton")
const rerollButton = document.getElementById('reRollButton')
const rollingDice = document.querySelectorAll(".rollingDice")



//*************Upper Variables */
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
                reRollArray.push(imageSrc(event.target.src))
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
        upperSectionClickCount--
    }
})

//***********lowersection variables*/
const threeKindClicker = document.getElementById("threesClicker")
const threeKindResults = document.getElementById("threeOfResults")
const fourKindClicker = document.getElementById("foursClicker")
const fourkindResults = document.getElementById('fourOfResults')
const fullHouseClicker = document.getElementById('fullHouseClicker')
const fullHouseResults = document.getElementById('fullHouseResults')
const smStraightClicker = document.getElementById('smallStraightClicker')
const smStraightResults = document.getElementById('smallStraightResults')
const lgStraightClicker = document.getElementById('largeStraightClicker')
const lgStraightResults = document.getElementById('largeStraightResults')
const chanceClicker = document.getElementById('chanceClicker')
const chanceResults = document.getElementById('chanceResults')
const yahtzeeClicker =document.getElementById('yahtzeeClicker')
const yahtzeeResults = document.getElementById('yahtzeeResults')
const totalingUppersClicker= document.getElementById('totalingUppersClicker')
const totalingUppersResults = document.getElementById('totalingUppersResults')
const bonusYahtzeeClicker = document.getElementById("bonusYahzeeClicker")
const bonusYahtzeeFinaleClicker = document.getElementById('yahtzeeFinalizer')
const bonusYahtzeeFinaleResults = document.getElementById('yahtzeeFinalScore')
let lowerSectionClickerCount = 7
let yahtzeeCount = 0
//************lowersection point system event listeners */
threeKindClicker.addEventListener('click',(event)=>{
    if(conditionCount !== 0 && rerollCount === 0){
        let choice = threeOfaKind(d6Array)
        let total = 0
        if(choice === true){
            for(let item of d6Array){
                total += item
            }
        }
        threeKindResults.innerHTML = total
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
        lowerSectionClickerCount --
        conditionCount = 0
        maxRerollCount = 0
        d6Array.length = 0
        resetImages()
    }
})

fourKindClicker.addEventListener('click',(event)=>{
    if(conditionCount !== 0 && rerollCount === 0){
        let choice = fourOfaKind(d6Array)
        let total = 0
        if(choice === true){
            for(let item of d6Array){
                total += item
            }
        }
        fourkindResults.innerHTML = total
        console.log(total)
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
        lowerSectionClickerCount --
        conditionCount = 0
        maxRerollCount = 0
        d6Array.length = 0
        resetImages()
    }
})

fullHouseClicker.addEventListener('click',(event)=>{
    if(conditionCount !== 0 && rerollCount === 0){
        let choice = fullHouse(d6Array)
        let total = 0
        if(choice === true){
            total += 25
        }
        fullHouseResults.innerHTML = total
        console.log(total)
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
        lowerSectionClickerCount --
        conditionCount = 0
        maxRerollCount = 0
        d6Array.length = 0
        resetImages()
    }
})

smStraightClicker.addEventListener('click',(event)=>{
    if(conditionCount !== 0 && rerollCount === 0){
        let choice = smallStraight(d6Array)
        let total = 0
        if(choice === true){
            total += 30
        }
        smStraightResults.innerHTML = total
        console.log(total)
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
        lowerSectionClickerCount --
        conditionCount = 0
        maxRerollCount = 0
        d6Array.length = 0
        resetImages()
    }
})

lgStraightClicker.addEventListener('click',(event)=>{
    if(conditionCount !== 0 && rerollCount === 0){
        let choice = largeStraight(d6Array)
        let total = 0
        if(choice === true){
            total += 40
        }
        lgStraightResults.innerHTML = total
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
        lowerSectionClickerCount --
        conditionCount = 0
        maxRerollCount = 0
        d6Array.length = 0
        resetImages()
    }
})

chanceClicker.addEventListener('click',(event)=>{
    if(conditionCount !== 0 && rerollCount === 0){
        let total = 0
        for(let item of d6Array){
            total += item
        }
        chanceResults.innerHTML = total
        console.log(total)
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
        lowerSectionClickerCount --
        conditionCount = 0
        maxRerollCount = 0
        d6Array.length = 0
        resetImages()
    }
})

totalingUppersClicker.addEventListener('click',(event)=>{
    if(upperSectionClickCount === -3){
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
        totalingUppersResults.innerHTML = finalUppersResult.innerHTML
        upperSectionClickCount --
    }
})

yahtzeeClicker.addEventListener('click',(event)=>{
    if(conditionCount !== 0 && rerollCount === 0 && yahtzeeCount === 0){
        let choice = yahtZee(d6Array)
        if(choice === true){
            yahtzeeResults.innerHTML === 50
        }
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
        lowerSectionClickerCount --
        conditionCount = 0
        maxRerollCount = 0
        d6Array.length = 0
        yahtzeeCount ++
    }
})

bonusYahtzeeClicker.addEventListener('click',(event)=>{
    if(conditionCount !== 0 && rerollCount === 0 && yahtzeeCount >0 && yahtzeeCount<5 && lowerSectionClickerCount >= 0){
        yahtzeeCount++
        let choice = yahtZee(d6Array)
        if(choice === true){
            if(yahtzeeCount === 2){
                document.getElementById('bonus1').src = "diceImages/yahtzeeBonus.png"
            } else if(yahtzeeCount === 3){
                document.getElementById('bonus2').src = "diceImages/yahtzeeBonus.png"
            } else if(yahtzeeCount === 4){
                document.getElementById('bonus3').src = "diceImages/yahtzeeBonus.png"
                event.target.style.pointerEvents = "none"
                event.target.style.backgroundColor = "red"
            }
        }
        conditionCount = 0
        maxRerollCount = 0
        d6Array.length = 0
    }
})

bonusYahtzeeFinaleClicker.addEventListener('click',(event)=>{
    if(lowerSectionClickerCount === 0){
        bonusYahtzeeFinaleResults.innerHTML === (yahtzeeCount-1)*100
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
        lowerSectionClickerCount --
    }
})

//******** finale of lowerSection */

const totalingLowerClicker = document.getElementById('totalingLowerClicker')
const totalingLowerResults = document.getElementById('totalingLowerResults')
const allLower = document.querySelectorAll('.lowersResults')
totalingLowerClicker.addEventListener('click',(event)=>{
    if(lowerSectionClickerCount === -1){
        let total = 0
        for(let item of allLower){
            total+=parseInt(item.innerHTML)
        }
        totalingLowerResults.innerHTML = total
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
        lowerSectionClickerCount --
    }
})

//grand total functionality, also making the end of js functionality for the bottom most of the screen
//lowerSectionClickerCount === -2
//upperSectionClickCount === -4

const finalClick = document.getElementById('finalClick')
const final = document.getElementById('final')
const bestScore = document.getElementById('bestScore')
const finalScore = document.getElementById('finalScore')

finalClick.addEventListener('click',(event)=>{
    if(lowerSectionClickerCount === -2 && upperSectionClickCount === -4){
        let total = parseInt(totalingLowerResults)+ parseInt(totalingUppersResults)
        final.innerHTML = total
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
        lowerSectionClickerCount = -3
        upperSectionClickCount = -5
        finalScore.innerHTML = total
        let didUGetHigher = isScoreHigher(bestScore.innerHTML,total)
        if(didUGetHigher === true){
            bestScore.innerHTML = total
        }
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



function imageSrc(str){
    let alphabetAndSymbol = ":/.-qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    let newStr = ''
    for(let item of str){
        if(alphabetAndSymbol.indexOf(item)===-1){
            newStr+= item
        }
    }
    return parseInt(newStr[newStr.length-1])
}
console.log(imageSrc("124apqrj3./:"))


//true or false functions
function threeOfaKind(arr){
    let testObj = {}
    for(let number of arr){
        if(testObj[number] === undefined){
            testObj[number] = 1
        } else {
            testObj[number] ++
        }
    }
    for(let key in testObj){
        if(testObj[key] >=3){
            return true
        } else {return false}
    }
}
function fourOfaKind(arr){
    let testObj = {}
    for(let number of arr){
        if(testObj[number] === undefined){
            testObj[number] = 1
        } else {
            testObj[number] ++
        }
    }
    for(let key in testObj){
        if(testObj[key] >=4){
            return true
        }
    }
    return false
}
function fullHouse(arr){
    let testObj = {}
    for(let number of arr){
        if(testObj[number] === undefined){
            testObj[number] = 1
        } else {
            testObj[number] ++
        }
    }
    let totalKey = 0
    for(let key in testObj){
        if(testObj[key]=== 4){
            return false
        }
        totalKey ++
    }
    return totalKey === 2
}
function smallStraight(arr){
    arr.sort()
    if((arr[3]===arr[2]+1 && arr[4]===arr[2]+2 && arr[1]===arr[2]-1)||(arr[0]===arr[2]-2&&arr[1]===arr[2]-1&&arr[3]===arr[2]+1)){
        return true
    } else {
        return false
    }
}
function largeStraight(arr){
    arr.sort()
    if(arr[3]===arr[2]+1 && arr[4]===arr[2]+2 && arr[1]===arr[2]-1 && arr[0]===arr[2]-2){
        return true
    } else {
        return false
    }
}
function yahtZee(arr){
    let testObj = {}
    for(let number of arr){
        if(testObj[number] === undefined){
            testObj[number] = 1
        } else {
            testObj[number] ++
        }
    }
    let totalKey= 0
    for(let key in testObj){
        totalKey++
    }
    return totalKey === 1
}

function isScoreHigher(bestScore,num){
    let finalScore = num
    if(finalScore > bestScore){
        return true
    }

}



//**reset functions */
