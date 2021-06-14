
<template>
  <div onload="init()" id="maindiv">
    <div id="can">
      <br />
      <canvas
        @mousedown="startPainting"
        @mouseup="finishedPainting"
        @mousemove="draw"
        id="canvas"
      ></canvas>
    </div>
    <div id="option">
      <br />
      <button @click="erase" class="btn btn-outline-info">Clear</button>
      <br />
      <button @click="send" class="btn btn-outline-info">Start</button>
      <br />
      <br />

      <br />
    </div><br/>
    <div class="break"></div>
    <div class="answer">

    <label for="price" id="labelAnswer"></label>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
    this.ctx.fillStyle = "rgb(0, 0, 0)";
    this.canvas.height = this.canvas.scrollHeight;
    this.canvas.width = this.canvas.scrollWidth;
    var imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    for (var i = 0; i < imageData.data.length; i += 4) {
      // When the pixel is transparent, set it to white
      if (imageData.data[i + 3] == 0) {
        imageData.data[i] = 255;
        imageData.data[i + 1] = 255;
        imageData.data[i + 2] = 255;
        imageData.data[i + 3] = 255;
      }
    }
    this.ctx.putImageData(imageData, 0, 0);
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
      this.ctx.fillStyle = "#fff";
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
      this.ctx.fillStyle = "white";
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    erase() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      var imageData = this.ctx.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      for (var i = 0; i < imageData.data.length; i += 4) {
        // When the pixel is transparent, set it to white
        if (imageData.data[i + 3] == 0) {
          imageData.data[i] = 255;
          imageData.data[i + 1] = 255;
          imageData.data[i + 2] = 255;
          imageData.data[i + 3] = 255;
        }
      }
      this.ctx.putImageData(imageData, 0, 0);
    },
    send() {
      document.getElementById("labelAnswer").innerHTML ="Testowanie, proszę poczekać...";
      var dataURL = this.canvas.toDataURL();
      console.log(dataURL);
      axios
        .post("http://127.0.0.1:3000/sendimg", {
            imgsrc: dataURL,
        })
        .then(function (response) {
          console.log(response);
          document.getElementById("labelAnswer").innerHTML =response.data.result;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
#maindiv {
  display: flex;
  flex-wrap: wrap;
}
#canvas {
  width: 404px;
  height: 104px;
  position: relative;
  margin-top: 2px;
  border: 2px solid;
}
#eraser {
  position: relative;
}
#can {
  position: relative;
  width: 70vw;
  flex:3;
}
#option {
  left: 0;
  position: relative;
  width: 30vw;
  flex:1;
}
.btn {
  width: 50%;
  margin-left: 0;
}
.answer{
  width:100vw;
}
.break {
  flex-basis: 100%;
  height: 0;
}
</style>
