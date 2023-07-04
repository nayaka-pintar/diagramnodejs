const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const canvasWidth = 5; // Lebar canvas
const canvasHeight = 4; // Tinggi canvas

// Array berisi koordinat titik-titik yang ingin digambar
const coordinates = [
  { x: 0, y: 3 },
  { x: 0, y: 0 },
  { x: 3, y: 3 },
  { x: 3, y: 1 },
  { x: 4, y: 1 },
  { x: 4, y: 0 },
];

// Membuat canvas dengan ukuran yang telah ditentukan
const canvas = createCanvas(canvasWidth, canvasHeight);
const context = canvas.getContext('2d');

// Menggambar garis berdasarkan koordinat yang diberikan
function drawLine(startX, startY, endX, endY) {
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}

// Menggambar titik berdasarkan koordinat yang diberikan
function drawPoint(x, y) {
  const pointSize = 5;
  context.fillRect(x - pointSize / 2, y - pointSize / 2, pointSize, pointSize);
}

// Menggambar diagram berdasarkan koordinat yang diberikan
function drawDiagram() {
  for (let i = 0; i < coordinates.length - 1; i++) {
    const startPoint = coordinates[i];
    const endPoint = coordinates[i + 1];
    drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
    drawPoint(startPoint.x, startPoint.y);
  }
  drawPoint(coordinates[coordinates.length - 1].x, coordinates[coordinates.length - 1].y);
}

// Panggil fungsi untuk menggambar diagram
drawDiagram();

// Menyimpan gambar ke file
const output = fs.createWriteStream('diagram.png');
const stream = canvas.createPNGStream();
stream.pipe(output);
output.on('finish', () => console.log('Diagram berhasil disimpan.'));