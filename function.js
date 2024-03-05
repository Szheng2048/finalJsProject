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

function resetRolls(){
    conditionCount = 0
    maxRerollCount = 0
    d6Array.length = 0
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
        }
    }
    return false
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
    for(let key in testObj){
        if(testObj[key]>= 4){
            return false
        }
    }
    return Object.keys(testObj).length === 2
}
function smallStraight(arr){
    arr.sort()
    let continuous = 0
    for(let i = 0;i < 4;i++){
        if(arr[i]===arr[i+1]-1){
            continuous ++
        } else if(arr[i]!== arr[i+1]) {
            continuous = 0
        }
    }
    return continuous >= 3
}
function largeStraight(arr){
    arr.sort()
    let lower = [1,2,3,4,5]
    let higher = [2,3,4,5,6]
    if(arr[0]=== 1){
        for(let i = 1;i<5;i++){
            if(lower[i] !== arr[i]){
                return false
            }
        }
    } else if(arr[0]===2){
        for(let i = 1;i<5;i++){
            if(higher[i] !== arr[i]){
                return false
            }
        }
    }
    return true
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