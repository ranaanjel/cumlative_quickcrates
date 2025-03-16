var button = document.querySelector("button");
var textValue = document.querySelector("textarea");
var outputDiv = document.querySelector(".output");



document.querySelector(".output_button").addEventListener("click", function() {
  outputDiv.innerHTML = "";
  itemCumulative ={}
})

button.addEventListener("click", function(eObj) {
  var result = processTheText(textValue.value);
  outputDiv.innerHTML = `${result}`;
})
var itemCumulative = {};

function processTheText(text) {
  var eachClient = text.split("\n").filter(line => line.trim()).map(m => m.trim());
  textValue.value = eachClient.join("\n");

  
  let objectUnit = {
    "kg":"kg", "gm":"gm", "g":"gm", "k":"katta", "kilo":"kg", "gram":"gm", "pcs":"pcs", "pkt":"pkt", "carton":"carton", "katta":'katta'
 };

 let clients = eachClient.filter(function (item) {
  let pattern = /\d/;
  return !pattern.test(item);
 })
 let items = eachClient.filter(function (item) {
  return !clients.includes(item);
 })

 let falseLine = [];
 let regexPattern = /^(\d+\.?\d*)\s\D+\s?(?:\D+\s?)*/

 items.forEach(line => {
  if(!regexPattern.test(line)) {
    falseLine.push(line);
    return
  }
  //console.log(regexPattern.test(line), line.match(regexPattern)) 
  line = line.toLowerCase().split(" ");
  var quantity = line[0];
  var unit ;
  let itemName ;
  if(line[1] in objectUnit) {
    unit = objectUnit[line[1]];
    itemName = line.slice(2,).join(' ');
    if(unit == "gm") {
            quantity = String((parseFloat(quantity)/1000).toFixed(2));
            unit = "kg"
    }
    if(unit == "katta") {
      itemName += " katta"
    }
  }else {
    unit = "pcs";
    itemName = line.slice(1,).join(" ")
  }

  if(itemName in itemCumulative) {
    itemCumulative[itemName].quantity += Number(parseFloat(quantity));
    itemCumulative[itemName].unit.push(unit);
  }else {
    itemCumulative[itemName] = {
      "quantity": Number(quantity),
      "unit": [unit]
    }
  }
 })
 
 textValue.value = "left out items :\n" + "\n" + falseLine.join("\n");

 let string ="";
 for (var item in itemCumulative) {
  //console.log(item)
  unit = new Set(itemCumulative[item].unit);
   if(Array.from(unit).length > 1) {
    unit = Array.from(unit).join(" ");
    string+= item + " : " + itemCumulative[item].quantity + " --" + unit + " more than one - please check.<br>";
    continue;
  }
  unit = Array.from(unit).join(" ");
  //console.log(unit, item)

 
  string+= item + " : " + itemCumulative[item].quantity + " --" + unit + "<br>";
 // console.log(string)
 }
  return string;
}