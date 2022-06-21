<template>
   <transition name="fade" appear>
      <div class="w-full flex justify-center">
         <div class="w-fit max-w-full sm:max-w-sm h-fit rounded-xl"
         :class="{
            'bg-green-600/90': (alert[0] == 'success'),
            'bg-yellow-400/90': (alert[0] == 'warning'),
            'bg-red-600/80': (alert[0] == 'error')
         }">
            <p class="text-sm px-2 py-2 text-center"
            :class="{
               'text-white': (alert[0] == 'success' || alert[0] == 'error'),
               'text-black': (alert[0] == 'warning')
            }">
               {{ alert[1] }}
            </p>
         </div>
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
   transition-duration: .5s;
}

.fade-enter,
.fade-leave-to {
   opacity: 0;
}
</style>
