<html>
<head>
<style>
canvas {border: 1px solid black;}
</style>
</head>
<body onload="startGame()">
<canvas id="gameCanvas" width="400" height="600"></canvas>
<script>
let canvas, ctx, bird, pipes, score;

      function startGame() {
        canvas = document.getElementById("gameCanvas");
        ctx = canvas.getContext("2d");
        bird = { x: 50, y: 300, size: 20, speed: 0 };
        pipes = [];
        score = 0;
        document.addEventListener("click", jump);
        setInterval(update, 50);
      }

      function update() {
        bird.speed += 1;
        bird.y += bird.speed;
        if (bird.y > canvas.height - bird.size) {
          bird.y = canvas.height - bird.size;
          bird.speed = 0;
        }
        if (bird.y < 0) {
          bird.y = 0;
          bird.speed = 0;
        }

        // Generate pipes
        if (pipes.length == 0 || pipes[pipes.length - 1].x < canvas.width - 100) {
          let height = Math.random() * (canvas.height - 100) + 50;
          pipes.push({ x: canvas.width, y: height - 200, width: 50, height: 200 });
        }

        // Move pipes
        for (let i = 0; i < pipes.length; i++) {
          pipes[i].x -= 2;
          if (pipes[i].x + pipes[i].width < 0) {
            pipes.splice(i, 1);
            i--;
            score++;
          }
        }

        // Check for collision
        for (let i = 0; i < pipes.length; i++) {
          if (
            bird.x + bird.size > pipes[i].x &&
            bird.x < pipes[i].x + pipes[i].width &&
            (bird.y < pipes[i].y || bird.y + bird.size > pipes[i].y + pipes[i].height)
          ) {
            alert("Game Over! Your score is " + score);
            document.location.reload();
          }
        }

        // Draw everything
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "purple";
        ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
        ctx.fillStyle = "green";
        for (let i = 0; i < pipes.length; i++) {
          ctx.fillRect(pipes[i].x, 0, pipes[i].width, pipes[i].y);
          ctx.fillRect(pipes[i].x, pipes[i].y + pipes[i].height, pipes[i].width, canvas.height - (pipes[i].y + pipes[i].height));
        }

