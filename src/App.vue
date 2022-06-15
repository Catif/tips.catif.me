<template>
   <transition name="fade" mode="out-in">
      <div class="flex flex-col gap-2 absolute">
         <router-link  v-if="!($route.path === '/')" to="/" class="w-fit ml-3 py-1 px-2 border border-primary rounded-xl">
            <font-awesome-icon :icon="['fas', 'house']" />
         </router-link>
         <div v-if="$store.state.token !== false" @click="logout()" class="w-fit ml-3 py-1 px-2 border cursor-pointer border-primary rounded-xl">
            <font-awesome-icon :icon="['fas', 'door-open']" />
         </div>
      </div>
   </transition>

   <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
         <component :is="Component"></component>
      </transition>
   </router-view>
</template>

<script>
export default {
   name: "App",
   methods: {
      logout(){
         this.$store.commit('logout')
         this.$router.push('/')
      }
   },
   watch: {
      $route: {
         immediate: true,
         handler(to, from) {
            document.title = to.meta.title;
         },
      },
   },
};
</script>

<style>
/* fade transitions */
.fade-enter-from,
.fade-leave-to {
   opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
   transition: all 0.2s ease-out;
}

.fade-enter-from {
   transform: translateY(-50px);
}

.fade-leave-to {
   transform: translateY(50px);
}
</style>
