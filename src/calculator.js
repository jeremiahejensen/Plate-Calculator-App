export function calculatePlates (desiredWeight, knownWeights) {
knownWeights.sort((a, b) => a.weight - b.weight);

let bar = 45
let neededWeights = (desiredWeight - bar) / 2
let totalPlates = 0
let platesIUsed = []

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
      platesIUsed.push(weightObject)
      //console.log('I added 45 pounds to the bar. I still need '+ neededWeights + ' lbs.')
    }

  }
}
}
export default calculatePlates;