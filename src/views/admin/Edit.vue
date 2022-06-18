<template>
<div class="container">
   <h1 class="text-center text-3xl">Edition d'un article</h1>


   <div class="flex flex-col gap-5" v-show="showTextBox">
      <div id="TextBox" class="w-full">
         <h2 class="text-xl">Rédaction</h2>
         <textarea name="article" v-model="textArticle" @input="updateVisualisation()" class="w-full h-80 rounded-xl bg-black/40 overflow-y-scroll py-3 px-2"></textarea>
      </div>



      <div id="Article" class="w-full">
         <h2 class="text-xl !mb-0">Visualisation</h2>
         <div class="w-full h-80 rounded-xl bg-black/40 overflow-y-scroll py-3 px-2" v-html="textArticleMD"></div>
      </div>

      <button @click="nextPage(2)" class="bg-black/50 w-full py-2 px-2 rounded-xl">Voir les informations</button>
   </div>


   <div class="flex flex-col gap-4 w-3/5 mx-auto mt-10" v-show="showInformation">
      <input required
         v-model="nameArticle"
         type="text"
         placeholder="Nom de l'article" 
         class="w-full mb-2 rounded bg-black/40 py-2 px-3 placeholder:text-primary/40"
      >
      <div class="w-full">
         <h2 class="text-xl">
            Catégories (max 3) : 
            <span v-for="(category) in listCategories" :key="category.id" class="text-white/80">{{ category.name }} | </span>
         </h2>
         <ul class="w-full h-48 overflow-y-auto rounded bg-black/40">
            <li :id="'Category-' + category.id" v-for="(category) in apiCategories" :key="category.id">
               <p 
                  class="px-3 py-1" 
                  @click="checkCategory(category.id)" 
                  :class="{'bg-primary/20': category.checked}"
               >
                  {{ category.name}}
               </p> 
            </li>
         </ul>
      </div>
         
      <button @click="nextPage(1)" class="bg-black/50 w-full py-2 px-2 rounded-xl">Revenir à l'édition</button>
      <button @click="editArticle" class="bg-primary text-black w-full py-2 px-2 rounded-xl">Modifier l'article</button>
   </div>
</div>
</template>


<script>
import highlight from 'highlight.js'
import 'highlight.js/styles/base16/solarized-dark.css'
import { marked } from 'marked'

export default {
   data(){
      return {
         apiCategories: null,
         showTextBox: true,
         showInformation: false,
         Tips: null,

         textArticle: '',
         textArticleMD : '',

         nameArticle: '',
         listCategories: [],
      }
   },


   methods: {
      updateVisualisation(){
         this.textArticleMD = marked(this.textArticle, {
            highlight(md) {
               return highlight.highlightAuto(md).value
            }
         })
      },
      nextPage(number){
         if (number == 1){
            this.showTextBox = true
            this.showInformation = false
         } else if (number == 2){
            this.showTextBox = false
            this.showInformation = true
         }
      },
      checkCategory(index){
         let idApi = this.apiCategories.findIndex(category => category.id === index)
         if(this.apiCategories[idApi].checked == true){
            this.apiCategories[idApi].checked = false
            let idList = this.listCategories.findIndex(category => category.name === this.apiCategories[idApi].name)
            this.listCategories.splice(idList, 1)
         } else {
            if(this.listCategories.length < 3){
               this.apiCategories[idApi].checked = true
               this.listCategories.push(this.apiCategories[idApi])
            }
         }
      },
      editArticle(){
         if (confirm('Souhaites-tu bien modifier l\'article ?')){
            api.put('/articles/' + this.$route.params.id,
               {
                  "title": this.nameArticle,
                  "article": this.textArticle,
                  "categories": this.listCategories,
                  "frontPicture": null
               },                   
               {
                  headers: {
                     Authorization: 'Bearer ' + this.$store.state.token,
                  },
               }
            ).then(response => {
               console.log('Vous venez de créer un article !')
            })
         }
      },
   },


   mounted(){
      let urls = [
         '/articles/' + this.$route.params.id,
         '/categories?_sort=name'
      ]

      let requests = urls.map(url => api.get(url))

      // Quand toutes les requêtes sont terminé alors :
      Promise.all(requests).then((responses) => {
         // Rangement des requêtes dans un tableau spécifique
         this.Tips = responses[0].data
         this.apiCategories = responses[1].data

         // Création du tableau apiCategories
         this.apiCategories.forEach((category, index) => {
            this.apiCategories[index].checked = false
         })

         // Applications des valeurs retourné par l'api
         this.nameArticle = this.Tips.title
         this.textArticle = this.Tips.article
         this.updateVisualisation()
         this.Tips.categories.forEach((category) => {
            this.checkCategory(category.id)
         })
      })


   },
}
</script>


<style>

</style>
