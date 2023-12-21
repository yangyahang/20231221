var colors2="17347f-e83034-f4b325-ffffff-5a4c9d-38a6de-000000-000000".split("-").map(a=>"#"+a)
var colors3="ffffff-ffffff-ffffff-ffffff-ffffff-e4813d-ede62c-e71c2c".split("-").map(a=>"#"+a)
var posx=[]
var posy=[]
var size=[]
var v_x=[]
var v_y=[]
var txts
var ball_move_v=false
var ball_ro_v=false
var lang=navigator.language
var myrec=new p5.SpeechRec(lang)
var sound1
var fc

function preload(){
  sound1=loadSound("m1.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  analyzer=new p5.Amplitude()
  analyzer.setInput(sound1)

  inputElement=createInput("pokemom")
  inputElement.position(10,10)
  inputElement.size(140,40)
  inputElement.style("font-size","20px")
  inputElement.style("color","#2f3e46")
  inputElement.style("background","#f4acb7")


  btnMoveElement=createButton("移動")
  btnMoveElement.position(170,10)
  btnMoveElement.size(80,40)
  btnMoveElement.style("font-size","20px")
  btnMoveElement.style("color","#2f3e46")
  btnMoveElement.style("background","#f4acb7")
  btnMoveElement.mousePressed(ball_move)

  btnStopElement=createButton("暫停")
  btnStopElement.position(270,10)
  btnStopElement.size(80,40)
  btnStopElement.style("font-size","20px")
  btnStopElement.style("color","#2f3e46")
  btnStopElement.style("background","#f4acb7")
  btnStopElement.mousePressed(ball_stop)

  btnVoiceElement=createButton("語音")
  btnVoiceElement.position(370,10)
  btnVoiceElement.size(80,40)
  btnVoiceElement.style("font-size","20px")
  btnVoiceElement.style("color","#2f3e46")
  btnVoiceElement.style("background","#f4acb7")
  btnVoiceElement.mousePressed(voice_go)

  btnVoiceElement=createButton("音樂")
  btnVoiceElement.position(470,10)
  btnVoiceElement.size(80,40)
  btnVoiceElement.style("font-size","20px")
  btnVoiceElement.style("color","#2f3e46")
  btnVoiceElement.style("background","#f4acb7")
  btnVoiceElement.mousePressed(music_go)

  radioElement=createRadio()
  radioElement.option("移動")
  radioElement.option("暫停")
  radioElement.option("旋轉")
  radioElement.position(570,10)
  radioElement.size(210,40)
  radioElement.style("font-size","20px")
  radioElement.style("color","#2f3e46")
  radioElement.style("background","#f4acb7")
  

}

function draw() {
  background(255)
  let mode=radioElement.value()
  let num=0
  if(sound1.isPlaying()){
    fc =map(analyzer.getLevel(),0,1,0,500)
  }
  for(i=0;i<posx.length;i++){
    num++
    push()
    txts=inputElement.value()
    translate(posx[i],posy[i])
    if (mode=="旋轉") {
        rotate(1.5*sin(frameCount/20))
      } else {
        if (mode=="移動") {
          ball_move_v =true
        } else {
          ball_move_v =false
        } 
      } 
    ball(colors2[num%colors2.length],
         colors3[num%colors3.length],
         size[i],fc)
    pop()
    if(ball_move_v){
      posy[i]=posy[i]+v_y[i]
      posx[i]=posx[i]+v_x[i]
    }
    if(posx[i]>width){
      v_x[i]=-v_x[i]
      posx[i]=width
    }
    if(posx[i]<0){
      v_x.splice(i,1)
      v_y.splice(i,1)
      posx.splice(i,1)
      posy.splice(i,1)
      size.splice(i,1)
    }
    if(posy[i]>height){
      v_y[i]=-v_y[i]
      posy[i]=height
    }
    if(posy[i]<0){
      v_x.splice(i,1)
      v_y.splice(i,1)
      posx.splice(i,1)
      posy.splice(i,1)
      size.splice(i,1)
    }
  }
}


function ball(clr2,clr3,n,fc){

push()

  scale(n)
  textSize(20)
  text(txts,75,75)
  ellipseMode(CENTER)
  fill(0)
  arc(0,-8,120,120,0,PI)
  fill(clr2)
  arc(0,-8-fc,120,120,PI,0)
  fill(0)
  arc(0,-5,60,60,PI,0)
  fill(clr3)
  arc(0,8,120,120,0,PI)
  fill(0)
  arc(0,5,60,60,0,PI)
  fill(255)
  ellipse(0,0,40,40)
  fill(255)
  ellipse(0,0,30,30)



pop()
}


function mousePressed(){

if(mouseY>60){
posx.push(mouseX)
posy.push(mouseY)
size.push(random(0.2,2))
v_x.push(random(1,-1))
v_y.push(random(1,-1))
}
}

function ball_move(){
    ball_move_v=true
}
function ball_stop(){
    ball_move_v=false
}
function voice_go(){
   myrec.onResult= showResult
   myrec.start()
}
function showResult(){
    if(myrec.resultValue==true){
    
        print(myrec.resultString)
        if(myrec.resultString.indexOf("走") !== -1){
            ball_move_v=true
        }
        if(myrec.resultString.indexOf("停") !== -1){
            ball_move_v=false
        }
        if(myrec.resultString.indexOf("轉") !== -1){
            ball_ro_v=true
        }
    }
}
function music_go(){
  if(sound1.isPlaying()){
    sound1.stop();
  }else{
    sound1.play();
  }

}

