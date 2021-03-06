const canvas = document.getElementById('canvas');
const video = document.getElementById('video');
// const canvasBall = document.getElementById('canvas-ball');
const context = canvas.getContext('2d');
// const contextBall = canvasBall.getContext('2d');
// const pre = document.getElementById('pre');

const ball = {
  fps: 1,
  canvas: {
    width: 80,
    height: 60,
  },
  radius: 10,
  detectBorder: 4,
  x: 30,
  y: 30,
  vx: 6,
  vy: 10,
  color: '#f00',
  draw: function() {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
};

function init () {
  canvas.width = ball.canvas.width;
  canvas.height = ball.canvas.height;
  canvas.style.width = canvas.width / 2 + 'px';
  canvas.style.height = canvas.height / 2 + 'px';

  // canvasBall.width = ball.radius * 2 + ball.detectBorder * 2;
  // canvasBall.height = ball.radius * 2 + ball.detectBorder * 2;
  // canvasBall.style.width = canvasBall.width / 2 + 'px';
  // canvasBall.style.height = canvasBall.height / 2 + 'px';

  navigator.mediaDevices.getUserMedia({ video: true }).then(stream => video.srcObject = stream);

  setInterval(refresh, 1000 / ball.fps);
}

function refresh () {
  // context.clearRect(0, 0, canvas.width, canvas.height);
  // camera
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const videoData = context.getImageData(0, 0, canvas.width, canvas.height);
  const reverseData = [];

  for (let h = 0; h < canvas.height; h++) {
    for (let w = canvas.width - 1; w >= 0; w--) {
      const i = (w + h * canvas.height) * 4;
      reverseData.push(videoData.data[i]);
      reverseData.push(videoData.data[i + 1]);
      reverseData.push(videoData.data[i + 2]);
      reverseData.push(videoData.data[i + 3]);
      // console.log(videoData.data[i + 3])
    }
  }

  const imageData = new ImageData(Uint8ClampedArray.from(reverseData), canvas.width, canvas.height);

  // console.log(imageData)

  context.putImageData(imageData, 0, 0);

  // const rgbaData = convertImageDataToRGBA(videoData.data);
  // if (!rgbaData.length) { return; }

  // binarization(rgbaData);

  // const finalData = convertRGBAtoImageData(rgbaData);
  // context.putImageData(finalData, 0, 0);

  // ball
  // ball.draw();

  // const size = ball.radius * 2 + ball.detectBorder * 2;

  // context.fillStyle = ball.color;
  // context.fillRect(ball.px, ball.py, 400, 20);

  // const imageData = context.getImageData(ball.x - ball.radius - ball.detectBorder, ball.y - ball.radius - ball.detectBorder, ball.radius * 2 + ball.detectBorder * 2, ball.radius * 2 + ball.detectBorder * 2);
  // const data = imageData.data;
  // // contextBall.putImageData(imageData, 0, 0);

  // // top
  // for (let i = 0; i < size; i++) {
  //   if (data[i * 4 + 3] === 0) {
  //     continue;
  //   }
  //   let hasColor = 0;
  //   hasColor += data[i * 4] // r
  //   hasColor += data[i * 4 + 1] // g
  //   hasColor += data[i * 4 + 2] // b
  //   if (hasColor < 128) {
  //     // console.log('top');
  //     ball.vy = -ball.vy;
  //     break;
  //   }
  // }

  // // bottom
  // for (let i = size * size - size; i < size * size; i++) {
  //   if (data[i * 4 + 3] === 0) {
  //     continue;
  //   }
  //   let hasColor = 0;
  //   hasColor += data[i * 4] // r
  //   hasColor += data[i * 4 + 1] // g
  //   hasColor += data[i * 4 + 2] // b
  //   if (hasColor < 128) {
  //     // console.log('bottom');
  //     ball.vy = -ball.vy;
  //     break;
  //   }
  // }

  // // left
  // for (let i = 0; i < size; i++) {
  //   if (data[i * size * 4 + 3] === 0) {
  //     continue;
  //   }
  //   let hasColor = 0;
  //   hasColor += data[i * size * 4] // r
  //   hasColor += data[i * size * 4 + 1] // g
  //   hasColor += data[i * size * 4 + 2] // b
  //   if (hasColor < 128) {
  //     // console.log('left');
  //     ball.vx = -ball.vx;
  //     break;
  //   }
  // }

  // // right
  // for (let i = 0; i < size; i++) {
  //   if (data[(i * size + size - 1) * 4 + 3] === 0) {
  //     continue;
  //   }
  //   let hasColor = 0;
  //   hasColor += data[(i * size + size - 1) * 4] // r
  //   hasColor += data[(i * size + size - 1) * 4 + 1] // g
  //   hasColor += data[(i * size + size - 1) * 4 + 2] // b
  //   if (hasColor < 128) {
  //     // console.log('right');
  //     ball.vx = -ball.vx;
  //     break;
  //   }
  // }

  // if (ball.y + ball.vy + ball.radius > ball.canvas.height || ball.y + ball.vy - ball.radius < 0) {
  //   ball.vy = -ball.vy;
  // }
  // if (ball.x + ball.vx + ball.radius > ball.canvas.width || ball.x + ball.vx - ball.radius < 0) {
  //   ball.vx = -ball.vx;
  // }

  // ball.x += ball.vx;
  // ball.y += ball.vy;

  // pre.textContent = JSON.stringify(ball, null, 4);
}

init();