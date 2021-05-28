var dogstand,dagsit, foodS, foodStock,Database;
var lastFed

function preload(){
dogstand=loadImage("images/dogImg.png")
dogsit=loadImage("images/dogImg1.png")

}

function setup(){
    createCanvas(1000,500);
    database=firebase.database()
    dog=createSprite(450,300,10,10)
    dog.addImage(dogstand)
    dog.scale=0.2
    foodStock=database.ref("Food")
    foodStock.on("value",readstock)
    feed=createButton("feed")
    feed.position(700,100)
    feed.mousePressed(feeddog)
    addfood=createButton("addfood")
    addfood.position(800,100)
    addfood.mousePressed(addfoodS)
    foodobj=new Food()
}

function draw(){
    background("pink");
    foodobj.display()
    feedTime=database.ref("FeedTime")
    feedTime.on("value",function(data) {
        lastFed=data.val();
    });
    fill(255,255,254)
    textSize(15)
    if(lastFed>=12){
        text(" last Fed:"+lastFed%12+"PM",350,100)
    }else if(lastFed==0){
        text("last Fed:12AM",350,100)
    }
    else {
        text(" last Fed: "+lastFed+"AM",350,100)
    }
    
    drawSprites();
}
function readstock(data){
    foodS=data.val()
    foodobj.UpdatefoodStock(foodS)
}

function addfoodS(){
foodS++
database.ref("/").update({
    Food:foodS 
})
}  

function feeddog(){
    dog.addImage(dogsit)
    if(foodobj. GETfoodStock()<=0){
        foodobj.UpdatefoodStock(foodobj.GETfoodStock()*0)
    }
    else{
        foodobj.UpdatefoodStock(foodobj.GETfoodStock()-1)
    }
    database.ref('/').update({
        Food:foodobj.GETfoodStock(),
        FeedTime:hour()
    })
}
