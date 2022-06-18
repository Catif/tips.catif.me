<template>
<div class="container">
   <h1 class="text-center text-3xl">Liste des articles pour une édition</h1>
   <table id="Last-tips" class="w-full bg-black/20 mt-5 table-auto">
      <thead class="bg-black/20">
         <tr class="bg-black/20">
            <th>Titre</th>
            <th>Tag</th>
            <th>Date Create</th>
            <th>Date Edit</th>
            <th>Option</th>
         </tr>
      </thead>
      <tbody class="bg-black/20">
         <tr v-for="(Tips, index) in tabTips" :key="index" class="odd:bg-primary/5 even:bg-primary/20">
            <td class="pl-2" :title="Tips.title">{{ Tips.titleShort }}</td>
            <td class="">{{ Tips.categoriesName }}</td>
            <td class="text-center">{{ Tips.dateCreated }}</td>
            <td class="text-center">{{ Tips.dateUpdated }}</td>
            <td class="text-center h-10 flex gap-1 justify-center items-center">
               <router-link :to="'/panel/edit/' + Tips.id" class="bg-black text-primary py-1 px-1 rounded h-fit">Editer</router-link>
               <button @click="deleteArticle(Tips.id)" class="bg-black text-red-500 py-1 px-1 rounded h-fit"><font-awesome-icon :icon="['fas', 'trash-can']" /></button>
            </td>
         </tr>
      </tbody>
   </table>
</div>
</template>

<script>

export default {
   data() {
      return {
         tabTips: null
      }
   },

   methods:{
      deleteArticle(id){
         if (confirm('Souhaites-tu bien supprimer cet article ?')){
            api.delete('/articles/' + id,             
               {
                  headers: {
                     Authorization: 'Bearer ' + this.$store.state.token,
                  },
               }
            ).then(response => {
               // Mise à jour du tableau
               var index = this.tabTips.map(x => {
                  return x.id;
               }).indexOf(id);
               this.tabTips.splice(index, 1);

               console.log('Vous venez de supprimer un article !')
            })
         }
      }
   },

   mounted() {
      // Liste des requêtes à l'API
      let urls = [
         '/articles?_sort=id:desc'
      ]

      let requests = urls.map(url => api.get(url))

      // Quand toutes les requêtes sont terminé alors :
      Promise.all(requests).then((responses) => {
         // Rangement des requêtes dans un tableau spécifique
         this.tabTips = responses[0].data

         this.tabTips.forEach((tips, tipsId) => {
            // Mise en forme des dates
            let dateCreated = new Date(tips.created_at)
            let dateUpdate = new Date(tips.updated_at)
            this.tabTips[tipsId].dateCreated = ('0' + dateCreated.getDate()).slice(-2) + '/' + ('0' + (dateCreated.getMonth() + 1)).slice(-2) + '/' + dateCreated.getFullYear()
            this.tabTips[tipsId].dateUpdated = ('0' + dateUpdate.getDate()).slice(-2) + '/' + ('0' + (dateUpdate.getMonth() + 1)).slice(-2) + '/' + dateUpdate.getFullYear()

            // Mise en forme des tags
            this.tabTips[tipsId].categoriesName = ''
            tips.categories.forEach((category, index) => {
               if(index >= 1){
                  this.tabTips[tipsId].categoriesName += ' | '
               }
               this.tabTips[tipsId].categoriesName += category.name
            })

            // Mise en forme du titre
            if (this.tabTips[tipsId].title.length > 40){
               this.tabTips[tipsId].titleShort = this.tabTips[tipsId].title.slice(0, 40) + '...'
            } else {
               this.tabTips[tipsId].titleShort = this.tabTips[tipsId].title
            }
         });
      })
   }
}
</script>

<style>

</style>
