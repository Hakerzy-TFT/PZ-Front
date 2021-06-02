
<template>
  <div onload="init()" id="maindiv">
    <div id="can"><br/>
    <canvas
      @mousedown="startPainting"
      @mouseup="finishedPainting"
      @mousemove="draw"
      id="canvas"
    ></canvas
    >
    </div>
    <div id="option">
    <input type="radio" id="learning" name="typesi" value="learning"
         checked>
  <label for="huey">Learning</label>
  <br/>
  <input type="radio" id="testing" name="typesi" value="testing"
         checked>
  <label for="huey">Testing</label>
  <br/>
    <button @click="erase" class="btn btn-outline-info">Clear</button>
    <br/>
    <button @click="send" class="btn btn-outline-info">Send</button>
    <br/>
    <button @click="send" class="btn btn-outline-info">Start</button>
    <br/>
    <button @click="erase" class="btn btn-outline-info">Stop</button>
    <br/>
    <button @click="erase" class="btn btn-outline-info erase">Options</button>
    <br/>
  </div>
  </div>
</template>

<script>
export default {
  name: "homePage",
  data: function () {
    return {
      vueCanvas: null,
      painting: false,
      canvas: null,
      ctx: null,
    };
  },
  mounted() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.height = this.canvas.scrollHeight;
    this.canvas.width = this.canvas.scrollWidth;
  },
  methods: {
    startPainting(e) {
      this.painting = true;
      this.draw(e);
    },
    finishedPainting() {
      this.painting = false;
      this.ctx.beginPath();
    },
    draw(e) {
      if (!this.painting) return;
      var pos = this.getMousePos(this.canvas, e);
      this.ctx.lineWidth = 10;
      this.ctx.lineCap = "round";
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(pos.x, pos.y);
    },
    getMousePos(canvas, e) {
      var rect = this.canvas.getBoundingClientRect();
      var scaleX = canvas.width / rect.width;
      var scaleY = canvas.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    erase() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    send() {
      var dataURL = this.canvas.toDataURL();
      console.log(dataURL);
    },
  },
};
</script>

<style scoped>
#maindiv{
  display: flex;
}
#canvas {
  width: 400px;
  height: 100px;
  position: relative;
  margin-top: 2px;
  border: 2px solid;
}
#eraser {
  position: relative;
}
#can{
  position: relative;
  width:70vw;
}
#option{
  left:0;
  position: relative;
  width:30vw;
}
.btn{
  width:50%;
  margin-left:0;
}
</style>
