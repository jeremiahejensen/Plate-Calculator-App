
export default function calculatePlates(desiredWeights) {
  let bar = 45;
  let neededWeights = (desiredWeights - bar) / 2;
  let totalPlates = 0;
  let platesIUsed = [];
 

  let knownWeights = [
  {
    "id": 45,
    "weight": 45,
    "inventory": 3,
    "color": "black"
  }, 
  {
    "id": 35,
    "weight": 35,
    "inventory": 1,
    "color": "red"
  },
  {
    "id": 25,
    "weight": 25,
    "inventory": 1,
    "color": "blue"
  },
  {
    "id": 15,
    "weight": 15,
    "inventory": 1,
    "color": "yellow"
  },
  {
    "id": 10,
    "weight": 10,
    "inventory": 1,
    "color": ""
  },
  {
    "id": 5,
    "weight": 5,
    "inventory": 1,
    "color": ""
  },
  {
    "id": 2.5,
    "weight": 2.5,
    "inventory": 1,
    "color": ""
  }];

// neededWeights hold the all the plates to put on one side of the bar. 
console.log(`You are lifting ${desiredWeights} total Pounds`);

knownWeights.sort((a, b) => a.weight - b.weight);

console.log('I need '+ neededWeights +' lbs on one side of the bar. ');
while(neededWeights > 0){

  while(knownWeights.length > 0){
    let weightObject = knownWeights.pop();
    
    if (neededWeights >= weightObject.weight && weightObject.inventory > 0) {
      weightObject.inventory = weightObject.inventory - 1;
      if (weightObject.inventory > 0){
        knownWeights.push(weightObject);
      }
      neededWeights = neededWeights - weightObject.weight;
      totalPlates = totalPlates + weightObject.weight * 2;
      platesIUsed.push(weightObject);
      console.log("I just pushed " + weightObject.id + " onto the array. Color:" + weightObject.color);
    }

  }
}


console.log('I am done with the loop & i still need '+ neededWeights);
console.log(`I have ${totalPlates} lbs on the bar for a total of `+ (totalPlates + bar) + ' lbs ');

platesIUsed.forEach(function(item, index, array) {
  let color = "color: " + item.color;  
  console.log('%c'+ item.weight , color);
}); 

platesIUsed.forEach(function(item, index, array) {
 
  console.log(item.color);
  
  });

platesIUsed.map(plate =>
  console.log(plate.id + " Weight:" + plate.weight + " color:" + plate.color)
);

  return platesIUsed;
};
