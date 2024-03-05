//variables
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
            rollingDice[i].src= `./diceImages/dice-face-${d6Array[i]}.png`
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
        // } else if(event.target.classList.contains('selected')){
        //     event.target.classList.remove('selected')
        //     reRollArray = replaceItemInArray(reRollArray,[imageSrc(event.target.src)])
        }
        if(maxRerollCount <=1){
            rerollCount++
        }
        console.log(reRollArray)
    })
}
//builds an array for the reroll button to sort through and remove from the original array



rerollButton.addEventListener("click",()=>{
    d6Array = replaceItemInArray(d6Array,reRollArray)
    if(rerollCount>0&&conditionCount===1&&maxRerollCount===0||maxRerollCount===1){
        for(let i = 0;i<rollingDice.length;i++){
            rollingDice[i].src= `./diceImages/dice-face-${d6Array[i]}.png`
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
            resetRolls()
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
        resetRolls()
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
        resetRolls()
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
        resetRolls()
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
        resetRolls()
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
        resetRolls()
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
        resetRolls()
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
        let score = 0
        if(choice === true){
            yahtzeeResults.innerHTML = score + 50
        } else {
            yahtzeeResults.innerHTML = score
        }
        event.target.style.pointerEvents = "none"
        event.target.style.backgroundColor = "red"
        lowerSectionClickerCount --
        resetRolls()
        yahtzeeCount ++
        resetImages()
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
        resetRolls()
        resetImages()
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
//**reset functions */
const restart = document.getElementById('restart')
const everyResult = document.querySelectorAll('.results')
const everyGreenButton = document.querySelectorAll('.click')
const yahtzeeBonusTally = document.querySelectorAll('bonusImg')
restart.addEventListener('click',()=>{
    console.log("hello")
    d6Array.length = 0
    reRollArray.length = 0
    conditionCount = 0
    //count of 0 is for the first roll
    //count of 1 is for the reroll
    rerollCount = 0
    //as long as rerollCount is not zero reroll can be clicked
    maxRerollCount = 0
    //amount of times the dice is selected after roll
    upperSectionClickCount = 6
    lowerSectionClickerCount = 7
    yahtzeeCount = 0
    for(let pointer of everyGreenButton){
        pointer.style.pointerEvents = "auto"
    }
    for(let num of everyResult){
        num.innerHTML = ""
    }
    for(let image of yahtzeeBonusTally){
        image.src = "diceImages/yahtzeeBeforeBonus.png"
    }
})



