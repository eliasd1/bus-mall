'use strict'

var objects = []
var randomNumbers = []
var imageSelected = [];
var trials = 25;
var numofImages = 3;
var div = document.getElementById("imageList")
var button = document.getElementById("results")
var resetButton = document.getElementById("reset")
var ul = document.getElementById("resultList")
var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
var allImages = ["bag.jpg", "banana.jpg", "bathroom.jpg", "boots.jpg", "breakfast.jpg", "bubblegum.jpg", "chair.jpg", "cthulhu.jpg", "dog-duck.jpg", "dragon.jpg", "pen.jpg", "pet-sweep.jpg", "scissors.jpg", "shark.jpg", "sweep.png", "tauntaun.jpg", "unicorn.jpg", "usb.gif", "water-can.jpg", "wine-glass.jpg"]
function CreateProduct(name, path){
    this.name = name;
    this.path = path;
    this.timesShown = 0;
    this.count = 0;
    objects.push(this)
}

generateObjects();
checkStorage()
start()

function start(){
    div.addEventListener("click", changeImages)
    button.addEventListener("click", showResults)
    resetButton.addEventListener("click", reset);
    generateNumbers()
    renderImages(randomNumbers)
}

function generateObjects(){
    for(let i = 0; i<allImages.length;i++){
        new CreateProduct(allImages[i].split(".")[0].replace("-", " "), "img/" + allImages[i])
    }
}
function checkStorage(){
    if(localStorage.length > 0){
        objects = JSON.parse(localStorage.imageInfo)
    }
}
function showResults(){
    for(let i = 0; i<objects.length; i++){
        var li = document.createElement("li");
        li.textContent = `${objects[i].name.replace(" ", "-")} had ${objects[i].count} vote(s), and was seen ${objects[i].timesShown} time(s)`
        ul.appendChild(li)
    }
    showChart();
    button.textContent = "Clear All Data"
    button.removeEventListener("click", showResults)
    button.addEventListener("click", clearLocalStorage)
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
        if(event.target.alt !== undefined){
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
                localStorage.setItem("imageInfo", JSON.stringify(objects))
                button.textContent = "View Results"
                resetButton.textContent = "Reset"
                button.style.display = "inline"
                resetButton.style.display = "inline"
            }
            trials--;
        }
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
        if(trials > 1){
            objects[numberArray[i]].timesShown++;
        }
       
    }
}

function getValue(selectedProperty){
    var valueArr = []
    for(let i = 0; i<objects.length; i++){
        valueArr.push(objects[i][selectedProperty])
    }
    return valueArr;
}
function reset(){
    button.removeEventListener("click", clearLocalStorage);
    resetButton.removeEventListener("click", reset);
    ul.innerHTML = "";
    ctx.clearRect(0,0, canvas.width, canvas.height);
    button.style.display = "none";
    resetButton.style.display = "none";
    trials = 25;
    start()
}
function clearLocalStorage(){
    localStorage.clear()
    location.reload()
}