'use strict'

var objects = []
var randomNumbers = []
var imageSelected = [];
var trials = 5;
var numofImages = 3;
var div = document.getElementById("imageList")
var button = document.getElementById("results")
var ul = document.getElementById("resultList")
var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
var jpgs = ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck", "dragon", "pen", "pet-sweep", "scissors", "shark", "tauntaun", "unicorn", "water-can", "wine-glass"]
function CreateProduct(name, path){
    this.name = name;
    this.path = path;
    this.timesShown = 0;
    this.count = 0;
    objects.push(this)
}
for(let i = 0; i<jpgs.length;i++){
    new CreateProduct(jpgs[i].replace("-", " "), "img/" + jpgs[i] + ".jpg")
}
new CreateProduct("sweep", "img/sweep.png")
new CreateProduct("usb", "img/usb.gif")

div.addEventListener("click", changeImages)
button.addEventListener("click", showResults)
generateNumbers()
renderImages(randomNumbers)

function showResults(){
    for(let i = 0; i<objects.length; i++){
        var li = document.createElement("li");
        li.textContent = `${objects[i].name.replace(" ", "-")} had ${objects[i].count} vote(s), and was seen ${objects[i].timesShown} time(s)`
        ul.appendChild(li)
    }
    showChart();
    button.style.display = "none"
}
function showChart(){
    canvas.style.display = "inline-block"
    new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels: getValue("name"),
            datasets: [{
                label: 'Number of votes',
                backgroundColor: 'blue',
                borderColor: 'blue',
                data: getValue("count")
            },
            {
                label: 'Number of times shown',
                backgroundColor: 'red',
                borderColor: 'red',
                data: getValue("timesShown")
            }]
        },
    
        // Configuration options go here
        options: {
            responsive: false
        }
    });
}
function changeImages(event){
    if(trials !== 0){
        for(let i = 0; i<objects.length; i++){
            if(objects[i].name === event.target.alt){
                objects[i].count++;
                console.log("clicked " + event.target.alt)
                break;
            }
        }
        generateNumbers()
        renderImages(randomNumbers)
        if(trials === 1){
            button.style.display = "block"
        }
        trials--;
        
    } else{
        console.log("event listener removed")
        div.removeEventListener("click", changeImages)
    }
}


function generateNumbers(){
    randomNumbers = [];
    while(randomNumbers.length< numofImages){
        var randomNum = Math.floor(Math.random()* objects.length)
        if(randomNumbers.indexOf(randomNum) === -1 && imageSelected.indexOf(randomNum) === -1){
            randomNumbers.push(randomNum);
        }
    }
    imageSelected = [];
    imageSelected = randomNumbers;
}

function renderImages(numberArray){
    var firstImage = document.getElementById("firstImg");
    var secondImage = document.getElementById("secondImg");
    var thirdImage = document.getElementById("thirdImg");
    var imgArray = [firstImage, secondImage, thirdImage]
    for(let i = 0; i<imgArray.length; i++){
        imgArray[i].setAttribute("src", objects[numberArray[i]].path)
        imgArray[i].setAttribute("alt", objects[numberArray[i]].name)
        objects[numberArray[i]].timesShown++;
    }
}

function getValue(selectedProperty){
    var valueArr = []
    for(let i = 0; i<objects.length; i++){
        valueArr.push(objects[i][selectedProperty])
    }
    return valueArr;
}
