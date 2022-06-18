<template>
<div class="container flex items-center flex-col">
   <!-- Description du site -->
   <h1 class="text-3xl mb-5">Tips de Catif</h1>
   <div>
      <p>Bienvenue sur mon site dédié à mes tips. Pour être plus précis, sur ce site vous trouverez toutes les astuces que j'ai trouvé pour résoudre des problèmes chiants à trouver sur internet !</p>
      <p>Le genre d'information que vous métriez du temps à trouver car vous êtes tout seul à la chercher. :D</p><br>
      <p>Bien sûr, ce site ne contiendra pas QUE des informations de niche, mais aussi des informations simple qui sur internet sont mal ou très peu expliquées.</p>
   </div>

   <!-- Liste des trois derniers tips -->
   <h1 class="text-3xl mb-5 mt-10">Derniers tips publiées</h1>
   <div id="Last-tips" class="w-full flex justify-center flex-wrap gap-10">
      <CardTips v-for="(Tips, index) in tabTips" action="showArticle" :Tips="Tips" :key="index" />
   </div>

   <!-- Liste des catégories du site -->
   <h1 class="text-3xl mb-5 mt-10">Liste des catégories</h1>
   <div id="Categories" class="w-full flex justify-center flex-wrap gap-10">
      <CardCategory v-for="(Category, index) in tabCategory" :Category="Category" :key="index" />
   </div>
</div>
</template>

<script>
import CardTips from '@/components/Card-Tips.vue'
import CardCategory from '@/components/Card-Category.vue'

export default {
   components: {
      CardTips,
      CardCategory
   },

   data() {
      return {
         tabTips: null,
         tabCategory: null
      }
   },

   mounted() {
      // Liste des requêtes à l'API
      let urls = [
         '/articles?_limit=3&_sort=id:desc',
         '/categories?_sort=name'
      ]

      let requests = urls.map(url => api.get(url))

      // Quand toutes les requêtes sont terminé alors :
      Promise.all(requests).then((responses) => {
         // Rangement des requêtes dans un tableau spécifique
         this.tabTips = responses[0].data
         this.tabCategory = responses[1].data

         // Mise en forme des dates
         this.tabTips.forEach((tips, tipsId) => {
            let date = new Date(tips.created_at)
            this.tabTips[tipsId].date = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()
         });
      })
   }
}
</script>
