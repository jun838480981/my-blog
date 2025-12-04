<script setup></script>

<template>
  <div
    class="fixed left-0 right-0 top-0 bottom-0 z-99 flex items-center justify-center bg-[rgba(0,0,0,0.3)] pointer-events-none"
  >
    <aside class="loader">
      <div style="--s: 0" class="aro"></div>
      <div style="--s: 1" class="aro"></div>
      <div style="--s: 2" class="aro"></div>
      <div style="--s: 3" class="aro"></div>
      <div style="--s: 4" class="aro"></div>
      <div style="--s: 5" class="aro"></div>
      <div style="--s: 6" class="aro"></div>
      <div style="--s: 7" class="aro"></div>
      <div style="--s: 8" class="aro"></div>
      <div style="--s: 9" class="aro"></div>
      <div style="--s: 10" class="aro"></div>
      <div style="--s: 11" class="aro"></div>
      <div style="--s: 12" class="aro"></div>
      <div style="--s: 13" class="aro"></div>
      <div style="--s: 14" class="aro"></div>
    </aside>
  </div>
</template>

<style scoped>
.loader {
  width: 150px;
  height: 150px;
  position: relative;
  transform-style: preserve-3d;
  transform: perspective(500px) rotateX(60deg);

  .aro {
    position: absolute;
    inset: calc(var(--s) * 10px);
    box-shadow: inset 0 0 80px #014598;
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    animation: up_and_down 3s infinite ease-in-out both;
    animation-delay: calc(var(--s) * -0.1s);
  }
}

@keyframes up_and_down {
  0%,
  100% {
    transform: translateZ(-100px) rotate(0deg);
  }
  50% {
    transform: translateZ(100px) rotate(90deg);
  }
}
</style>
