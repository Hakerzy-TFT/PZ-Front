
<template>
  <div onload="init()">
        <canvas id="can"></canvas>
        <div id="black" v-on:click="color('black')"></div>
        <div id="eraser">Eraser</div>
        <div id="white" v-on:click="color('white')"></div>
        <img id="canvasimg" >
        <input type="button" value="save" id="bttn" size="30" v-on:click="save()">
        <input type="button" value="clear" id="clr" size="23" v-on:click="erase()">
    </div>
    
</template>

<script>
export default {
  name: 'homePage',
  data: function () {
    return {
    canvas: false, 
    ctx:false, 
    flag : false,
    prevX : 0,
    currX : 0,
    prevY : 0,
    currY : 0,
    dot_flag : false,
    x : "black",
    y : 2,
    w:400,
    h:400,
    }
  },
  mounted(){
    this.canvas = document.getElementById("can");
    this.ctx = this.canvas.getContext("2d");
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.canvas.addEventListener('mousemove', (e)=> {
        this.findxy('move', e);
        alert("a");
    }, false);
    this.canvas.addEventListener("mousedown", (e)=> {
        this.findxy('down', e);
    }, false);
    this.canvas.addEventListener("mouseup", (e)=> {
        this.findxy('up', e);
    }, false);
    this.canvas.addEventListener("mouseout", (e)=> {
        this.findxy('out', e);
    }, false);
  },
  methods:{
      init:function(){
    this.canvas = document.getElementById("can");
    this.ctx = this.canvas.getContext("2d");
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.canvas.addEventListener('mousemove', (e)=> {
        this.findxy('move', e);
        alert("a");
    }, false);
    this.canvas.addEventListener("mousedown", (e)=> {
        this.findxy('down', e);
    }, false);
    this.canvas.addEventListener("mouseup", (e)=> {
        this.findxy('up', e);
    }, false);
    this.canvas.addEventListener("mouseout", (e)=> {
        this.findxy('out', e);
    }, false);
      },
  findxy: function(res, e) {
    if (res == 'down') {
       this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.canvas.offsetLeft;
        this.currY = e.clientY - this.canvas.offsetTop;
        this.flag = true;
        this.dot_flag = true;
        if (this.dot_flag) {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.x;
            this.ctx.fillRect(this.currX, this.currY, 2, 2);
            this.ctx.closePath();
            this.dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        this.flag = false;
    }
    if (res == 'move') {
        if (this.flag) {
            this.prevX = this.currX;
            this.prevY = this.currY;
            this.currX = e.clientX - this.canvas.offsetLeft;
            this.currY = e.clientY - this.canvas.offsetTop;
            this.draw();
        }
    }
},
  draw:function() {
      alert("draw");
    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(this.currX, this.currY);
    this.ctx.strokeStyle = this.x;
    this.ctx.lineWidth = this.y;
    this.ctx.stroke();
    this.ctx.closePath();
},
color:function(res) {
    switch (res) {
        case "black":
            this.x = "black";
            break;
        case "white":
            this.x = "white";
            break;
    }
    if (this.x == "white") this.y = 14;
    else this.y = 2;

},

erase:function() {
    var m = confirm("Want to clear");
    if (m) {
        this.ctx.clearRect(0, 0, this.w, this.h);
        document.getElementById("canvasimg").style.display = "none";
    }
},

save:function() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = this.canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
},

  },
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#can{
  width:98vw; 
  height:400;
  position:relative;
  margin-top: 2px;
  top:10%;
  border:2px solid;
}
#black{
position:relative;
width:10px;
height:10px;
background:black;
}
#white{
position:relative;
width:15px;
height:15px;
background:white;
border:2px solid;
}
#eraser{
position:relative;
}
#canvasimg{
position:relative;
display:none;
}
#bttn{
  position:relative;
}
#clr{
position:absolute;
}
</style>
