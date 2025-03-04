var button = document.querySelector("button");
var textValue = document.querySelector("textarea").value;
var outputDiv = document.querySelector(".output")

document.querySelector("textarea").addEventListener("change", function() {
  outputDiv.innerHTML = "";
})

button.addEventListener("click", function(eObj) {
  var result = processTheText(textValue);
  outputDiv.innerHTML = `${result}`;
})

function processTheText(text) {
  var eachClient = text.split("\n\n").map(m => m.split("\n").slice(1,).join("\n")).join("\n").split("\n").map(m => m.trim()).filter(m => m);
  var itemCumulative = {};
  let objectUnit = {
    "kg":"kg", "gm":"gm", "g":"gm", "k":"katta", "kilo":"kg", "gram":"gm", "pcs":"pcs", "pkt":"pkt", "carton":"carton", "katta":'katta'
 };

 if(eachClient.length == 0) {
  alert("no items in the list");
  return;
 }

 eachClient.forEach(line => {
  line = line.toLowerCase().split(" ");
  var quantity = line[0];
  var unit ;
  let itemName ;
  if(line[1] in objectUnit) {
    unit = objectUnit[line[1]];
    itemName = line.slice(2,).join(' ');
    //console.log(itemName)
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


 console.log(itemCumulative)
 let string ="";
 for (var item in itemCumulative) {
  console.log(item)
  unit = new Set(itemCumulative[item].unit);
  unit = Array.from(unit).join(" ");
  console.log(unit, item)
  string+= item + " : " + itemCumulative[item].quantity + " --" + unit + "<br>";
  console.log(string)
 }
  return string;
}