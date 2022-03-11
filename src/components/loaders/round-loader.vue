<!-- From https://loading.io/css/ -->
<script>
export default {
  props: {
    local: Boolean,
  },
}
</script>
<template>
  <div class="loader" :class="local ? 'local' : 'background'">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
}

.local {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #000;
  border-color: #000 transparent #000 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
