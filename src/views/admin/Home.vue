<template>
   <div class="container">
      <h1 class="text-center text-3xl mt-10">Bonjour {{ $store.state.name }}</h1>

      <div class="flex flex-col items-center mt-5 gap-10">
         <div id="Create-Edit" class="flex gap-2">
            <router-link to="/panel/edit" class="h-fit py-2 px-3 bg-black/30 rounded-xl group">Mode Edition</router-link>
            <router-link to="/panel/create" class="h-fit py-2 px-3 bg-black/30 rounded-xl group">Mode Création</router-link>
         </div>


         <div id="Stats">
            <h2 class="text-xl">Statistique</h2>
            <div>

            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {}
</script>

<style>

</style>
