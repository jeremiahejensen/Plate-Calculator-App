
let knownWeights = [
  {
    "weight": 45,
    "inventory": 3,
    "color": ""
  }, 
  {
    "weight": 35,
    "inventory": 1,
    "color": ""
  },
  {
    "weight": 25,
    "inventory": 1,
    "color": ""
  },
  {
    "weight": 15,
    "inventory": 1,
    "color": ""
  },
  {
    "weight": 10,
    "inventory": 1,
    "color": ""
  },
  {
    "weight": 5,
    "inventory": 1,
    "color": ""
  },
  {
    "weight": 2.5,
    "inventory": 1,
    "color": ""
  }]
let platesIUsed = []

let desiredWeights = 100
let currentWeight = 0
let bar = 45

// neededWeights hold the all the plates to put on one side of the bar. 
let neededWeights = (desiredWeights - bar) / 2
let totalPlates = 0

console.log(`You are lifting ${desiredWeights} total Pounds`)




knownWeights.sort((a, b) => a.weight - b.weight);


console.log('I need '+ neededWeights +' lbs on one side of the bar. ')
while(neededWeights > 0){

  while(knownWeights.length > 0){
    let weightObject = knownWeights.pop();
    
    if (neededWeights >= weightObject.weight && weightObject.inventory > 0) {
      weightObject.inventory = weightObject.inventory - 1
      if (weightObject.inventory > 0){
        knownWeights.push(weightObject)
      }
      neededWeights = neededWeights - weightObject.weight
      totalPlates = totalPlates + weightObject.weight * 2
      platesIUsed.push(weightObject.weight)
      //console.log('I added 45 pounds to the bar. I still need '+ neededWeights + ' lbs.')
    }

  }
}
console.log('I am done with the loop & i still need '+ neededWeights)
console.log(`I have ${totalPlates} lbs on the bar for a total of `+ (totalPlates + bar) + ' lbs ');

platesIUsed.forEach(function(item, index, array) {
    console.log(item)
  })


export default platesIUsed;