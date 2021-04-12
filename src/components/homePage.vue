
<template>
  <div onload="init()">
    <canvas
      @mousedown="startPainting"
      @mouseup="finishedPainting"
      @mousemove="draw"
      id="canvas"
    >Your browser does not support the HTML5 canvas tag.</canvas>
    <button @click="erase" id="erase">Clear</button>
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
      this.ctx.lineWidth = 10;
      this.ctx.lineCap = "round";
      this.ctx.lineTo(e.clientX, e.clientY);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(e.clientX, e.clientY);
    },
    erase(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvas {
  width: 98vw;
  height: 400px;
  position: relative;
  margin-top: 2px;
  border: 2px solid;
}
#eraser {
}
</style>
