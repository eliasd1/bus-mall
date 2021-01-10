'use strict'

var objects = []
var randomNumbers = []
var trials = 25;
var div = document.getElementById("imageList")
var button = document.getElementById("results")
var ul = document.getElementById("resultList")
var jpgs = ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck", "dragon", "pen", "pet-sweep", "scissors", "shark", "tauntaun", "unicorn", "water-can", "wine-glass"]
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
    button.style.display = "none"
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
        trials--;
    } else{
        console.log("event listener removed")
        button.style.display = "block"
        div.removeEventListener("click", changeImages)
    }
}
function CreateProduct(name, path){
    this.name = name;
    this.path = path;
    this.timesShown = 0;
    this.count = 0;
    objects.push(this)
}

function generateNumbers(){
    randomNumbers = [];
    while(randomNumbers.length<3){
        var randomNum = Math.floor(Math.random()* 20)
        if(randomNumbers.indexOf(randomNum) === -1){
            randomNumbers.push(randomNum);
        }
    }
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
