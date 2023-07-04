const { createCanvas } = require('canvas');
const fs = require('fs');

const canvasWidth = 500; // Lebar canvas
const canvasHeight = 500; // Tinggi canvas

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

// Menggambar diagram berdasarkan koordinat yang diberikan
function drawDiagram() {
  // Mengisi bidang dengan warna orange
  context.fillStyle = 'orange';
  context.fillRect(0, 0, canvasWidth, canvasHeight);

  // Mengatur warna garis dan ketebalan garis
  context.strokeStyle = 'black';
  context.lineWidth = 2;

  // Menggambar garis yang menghubungkan titik-titik
  context.beginPath();
  context.moveTo(coordinates[0].x, coordinates[0].y);
  for (let i = 1; i < coordinates.length; i++) {
    context.lineTo(coordinates[i].x, coordinates[i].y);
  }
  context.closePath();
  context.stroke();

  // Menggambar titik-titik
  context.fillStyle = 'black';
  coordinates.forEach((coordinate) => {
    context.beginPath();
    context.arc(coordinate.x, coordinate.y, 3, 0, 2 * Math.PI);
    context.fill();
  });
}

// Panggil fungsi untuk menggambar diagram
drawDiagram();

// Menyimpan gambar ke file
const output = fs.createWriteStream('diagram.png');
const stream = canvas.createPNGStream();
stream.pipe(output);
output.on('finish', () => console.log('Diagram berhasil disimpan.'));
