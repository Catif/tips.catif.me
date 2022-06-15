<template>
   <transition name="fade" appear>
      <div class="w-full h-10 bg-red-400">

      </div>
   </transition>
</template>

<script>
export default {
   props: {
      alert: {
         type: Array,
         default: []
      }
   }

}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
   transition-property: opacity;
   transition-duration: .8s;
}

.fade-enter,
.fade-leave-to {
   opacity: 0;
}
</style>
