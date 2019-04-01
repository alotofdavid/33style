var letterpairs = []
var allpairs = []

//alphabet is positions
var alphabet = ["UB", "UR", "UL", "LU", "LF", "LD", "LB", "FR", "FD", "FL", "RU", "RB", "RD", "RF", "BU", "BL", "BD", "BR", "DF", "DR", "DB", "DL"];

alphabet.forEach(prompt);
alphabet.forEach(buttons);
alphabet.forEach(createpairs);

function updateletterscheme() {
   alphabet.forEach(createpairs);
   newsearchstring = "?"
   for (var i = 0; i < alphabet.length; i++) { 
      target = alphabet[i];
      newsearchstring += target
      newsearchstring += "="
      newsearchstring += document.getElementById(target + "x").value
      newsearchstring += "&"
   }
   
   window.location.href = newsearchstring
}

function prompt (place) {
		var y = document.createElement("INPUT")
		y.setAttribute("type", "text")
		y.setAttribute("id", place + "x")
		y.setAttribute("value", place)
		y.setAttribute("class", "checkboxFalse")
		var father = document.getElementById("prompted")
		father.appendChild(y);
}

function buttons(value) {
		//make buttons
		var x = document.createElement("INPUT")
		x.setAttribute("type", "button")
		x.setAttribute("id", value)
		x.setAttribute("onclick", "Select" + "(" + "value" + ")")
		x.setAttribute("value", value)
		x.setAttribute("class", "checkboxFalse")
		var parent = document.getElementById("checkboxes")
		parent.appendChild(x);
}

function GetUrlValue(VarSearch){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == VarSearch){
            return KeyValuePair[1];
}
}
   return "";
}

function createpairs(value) {
        //make letter pairs
        letterpairs = []
        if (allpairs.length == 440) {
        allpairs = []
        }
        alphabet.forEach(pairs)
        function pairs(letter) {
        var pair = value + letter
        if (value != letter && pair != "UBBU" && pair != "URRU" && pair != "ULLU" && pair != "LUUL" && pair != "LFFL" && pair != "LDDL" && pair != "LBBL" && pair != "FRRF" && pair != "FDDF" && pair != "FLLF" && pair != "RUUR" && pair != "RBBR" && pair != "RDDR" && pair != "RFFR" && pair != "BUUB" && pair != "BLLB" && pair != "BDDB" && pair != "BRRB" && pair != "DFFD" && pair != "DRRD" && pair != "DBBD" && pair != "DLLD"){
        var TOne = GetUrlValue(value)
        var TTwo = GetUrlValue(letter)
        if (TOne == "") {
           TOne = document.getElementById(value + "x").value
        }
        if (TTwo == "") {
           TTwo = document.getElementById(letter + "x").value
        }
        pair = TOne + TTwo
        allpairs.push(pair)
        }
    	}
        
}

// selectSet
function Select(p) {
var y = document.getElementById(p)
if (y.className == "checkboxFalse") {
	y.className = "checkboxTrue"
var i;
var j;
	for (i = 0; i < alphabet.length; i++) {
    	if (alphabet[i] == p) {
    		for (j = (20 * i); j < (20 * i + 20); j++) {
            letterpairs.push(allpairs[j])
			}
    	} 
    }
} 
else {
	y.className = "checkboxFalse"
var k;
	for(var k = letterpairs.length - 1; k >= 0; k--) {
    	if(letterpairs[k].charAt(0) == document.getElementById(p + "x").value) {
       		letterpairs.splice(k, 1);
    	}
	}
}
}

//get random pairs
function showpair() {
document.getElementById("case").innerHTML = letterpairs[Math.floor(Math.random() * letterpairs.length)]
  
	if (letterpairs.length == 0) {
		document.getElementById("case").innerHTML = "Select a set"
	}
}

//generate the correct comm
var ComNow;
function getcom() {
 var i;
	for (i = 0; i < allpairs.length; i++) {
		if (document.getElementById("case").innerHTML == allpairs[i]) {
    	ComNow = comms[i]
        }
     if (letterpairs.length == 0) {
		document.getElementById("comm").innerHTML = "Select a set"
	}   
    }
}    

//always show alg
var Yesorno = 0;
function yesorno() {
	if (Yesorno == 0) {
		Yesorno += 1
    	document.getElementById("yesorno").value = "Never show algorithm"    
	}
	else {
		Yesorno = 0
		document.getElementById("yesorno").value = "Always show algorithm"    
	}
}

//add everything together
document.onkeydown = function(event) { 
	if (event.keyCode == 32) {
		document.getElementById("comm").innerHTML = "Press enter to show the alg"
		showpair(); 
		getcom();
		if (Yesorno == 0 && letterpairs.length != 0) {
			document.getElementById("comm").innerHTML = ComNow;
		}
	}
	if (event.keyCode == 13 && letterpairs.length != 0) {
	document.getElementById("comm").innerHTML = ComNow;
	}
}
