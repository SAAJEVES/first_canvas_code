const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
console.log(canvasContext);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const circlesArray = [];


window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // drawQuad();
  // drawCircle();
  animate();
})

// Draw a rectangle
/* const drawQuad = () => {
  canvasContext.fillStyle = "green";
  canvasContext.fillRect(20, 10, 50, 90);
} */
// drawQuad();


// Draw a circle

const drawCircle = (x = 200, y= 200, z = 50) => {
  canvasContext.beginPath();
  canvasContext.arc(x, y, z, 0, Math.PI * 2);
  canvasContext.strokeStyle = "yellow";
  canvasContext.lineWidth = 2;
  canvasContext.shadowColor = "hsl(92, 100%, 50%)";
  canvasContext.shadowOffsetX = 6;
  canvasContext.shadowOffsetY = 5;
  canvasContext.shadowBlur = 2;
  // canvasContext.fillStyle = "red";
  // canvasContext.fill();
  canvasContext.stroke();
  // canvasContext.rotate(50);
  // canvasContext.translate(50, 70);
}
// drawCircle();

/* canvas.addEventListener("click", function(e) {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height)
  drawCircle(e.x, e.y);
}) */

/* canvas.addEventListener("mousemove", function(e) {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  size = (e.x + e.y) / 100;
  drawCircle(e.x, e.y, size);
}) */


class BackgroundCircle {
  constructor() {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * canvas.height);
    this.size = 3;
    this.speedX = Math.floor(Math.random() * 3) - 1.5;
    this.speedY = Math.floor(Math.random() * 3) - 1.5;
    this.colorHue = Math.floor(Math.random() * 360) + 1;
    this.color = `hsl(${this.colorHue}, 100%, 50%)`
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

  }

  draw() {
    canvasContext.fillStyle = this.color;
    canvasContext.beginPath();
    canvasContext.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    canvasContext.fill();
  }
}

const initCircles = () => {
  for (let i = 0; i < 250; i++) {
    circlesArray.push(new BackgroundCircle());
  }
}
initCircles();

const handleCircles = () => {
  for (let i = 0; i < circlesArray.length; i++) {
    circlesArray[i].update();
    circlesArray[i].draw();

    if (circlesArray[i].x < 0) {
      circlesArray[i]. x = canvas.width;
    }

    if (circlesArray[i].x > canvas.width) {
      circlesArray[i]. x = 0;
    }

    if (circlesArray[i].y < 0) {
      circlesArray[i]. y = canvas.height;
    }

    if (circlesArray[i].y > canvas.height) {
      circlesArray[i]. y = 0;
    }

    for (let j = i; j < circlesArray.length; j++) {
      const dx = circlesArray[i].x - circlesArray[j].x;
      const dy = circlesArray[i].y - circlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        canvasContext.beginPath();
        canvasContext.strokeStyle = circlesArray[i].color;
        canvasContext.lineWidth = .4;
        canvasContext.moveTo(circlesArray[i].x, circlesArray[i].y);
        canvasContext.lineTo(circlesArray[j].x, circlesArray[j].y);
        canvasContext.stroke();
      }
    }
  }
}

const animate = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  handleCircles();
  requestAnimationFrame(animate);
}
animate();