<template>
  <div class="spinner">
    <div class="ball"></div>
    <p>LOADING</p>
  </div>
</template>
<style scoped>
.spinner {
  width: 200px;
  height: 100px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  text-align: center;
}
.spinner .ball {
  width: 50px;
  height: 50px;
  background-color: #333;
  border-radius: 50%;
  display: inline-block;
  -webkit-animation: motion 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
  animation: motion 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}

p {
  color: #333;
  margin-top: 5px;
  font-family: sans-serif;
  letter-spacing: 3px;
  font-size: 18px;
}

@-webkit-keyframes motion {
  0% {
    transform: translateX(0) scale(1);
  }
  25% {
    transform: translateX(-50px) scale(0.3);
  }
  50% {
    transform: translateX(0) scale(1);
  }
  75% {
    transform: translateX(50px) scale(0.3);
  }
  100% {
    transform: translateX(0) scale(1);
  }
}

@keyframes motion {
  0% {
    transform: translateX(0) scale(1);
  }
  25% {
    transform: translateX(-50px) scale(0.3);
  }
  50% {
    transform: translateX(0) scale(1);
  }
  75% {
    transform: translateX(50px) scale(0.3);
  }
  100% {
    transform: translateX(0) scale(1);
  }
}
</style>
