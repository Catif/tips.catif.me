<template>
<div class="container flex items-center flex-col">
   <h1 class="text-3xl mb-5 mt-10">{{ category }}</h1>

   <div v-if="tabTips.length > 0" id="Last-tips" class="w-full flex justify-center flex-wrap gap-10">
      <CardTips v-for="(Tips, index) in tabTips" :Tips="Tips" :IndexTab="index" :key="index" />
   </div>
   <div v-else>Il n'y a pas encore d'article dans cette catégories</div>
</div>
</template>

<script>
import CardTips from "@/components/Card-Tips.vue";

export default {
   components: {
      CardTips,
   },

   data() {
      return {
         tabTips: [],
         category: "",
      };
   },

   methods: {
      requestApi() {
         if(this.$route.params.name !== undefined){
            this.tabTips = [];
            // Liste des requêtes à l'API
            let urls = [
               "/articles?_sort=id:desc&categories.url=" + this.$route.params.name,
               "/categories?url=" + this.$route.params.name,
            ];

            let requests = urls.map((url) => api.get(url));

            // Quand toutes les requêtes sont terminé alors :
            Promise.all(requests).then((responses) => {
               // Rangement des requêtes dans un tableau spécifique
               this.tabTips = responses[0].data;
               this.category = responses[1].data[0].name;

               // Mise en forme des dates + ajout de l'url des catégories pour chaque Tips (Possible amélioration de l'api)
               this.tabTips.forEach((tips, tipsId) => {
                  let date = new Date(tips.created_at);
                  this.tabTips[tipsId].date =
                     ("0" + date.getDate()).slice(-2) +
                     "/" +
                     ("0" + (date.getMonth() + 1)).slice(-2) +
                     "/" +
                     date.getFullYear();
               })

               document.title = 'Catégorie : ' + this.category + ' - Tips de Catif'
               document.querySelector('meta[name="description"]').setAttribute('content', 'Retrouvez tous les tips liés à la catégorie ' + this.category + '.')
               document.querySelector('meta[name="keywords"]').setAttribute('content', defaultTags + this.category)
            })
         }
      },
   },

   watch: {
      "$route.params": {
         handler() {
            this.requestApi();
         },
         immediate: true,
      },
   },
};
</script>

<style>
</style>
