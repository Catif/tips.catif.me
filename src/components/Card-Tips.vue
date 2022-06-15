<template>
<transition name="fade" appear>
   <router-link :to="'/article/' + Tips.id" class="w-96 h-28 flex justify-between flex-col py-2 px-3 bg-black/30 rounded-xl group">
      <p class="text-sm group-hover:text-white">{{ Tips.title }}</p>
      <div class="flex justify-between">
         <ul class="flex flex-row flex-wrap gap-2 text-xs">
            <li class="w-fit py-1 border border-primary rounded-xl hover:border-white hover:text-white" v-for="(categoryTip, index) in Tips.categories" :key="index">
               <router-link :to="'/category/' + categoryTip.url " class="py-1 px-2">{{ categoryTip.name }}</router-link>
            </li>
         </ul>
         <p class="text-right text-xs pt-1 group-hover:text-white">{{ Tips.date }}</p>
      </div>
   </router-link>
</transition>
</template>

<script>
export default {
   // Importation des données slots
   props: {
      Tips: {
         type: Object,
         default: {},
         required: true
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
