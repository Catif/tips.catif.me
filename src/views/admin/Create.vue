<template>
<div class="container">
   <h1 class="text-center text-3xl">Création d'un article</h1>


   <div class="flex flex-col gap-5" v-show="showTextBox">
      <div id="TextBox" class="w-full">
         <h2 class="text-xl">Rédaction</h2>
         <textarea name="article" v-model="textArticle" @input="updateVisualisation()" class="w-full h-80 rounded-xl bg-black/40 overflow-y-scroll py-3 px-2"></textarea>
      </div>



      <div id="Article" class="w-full">
         <h2 class="text-xl !mb-0">Visualisation</h2>
         <div class="w-full h-80 rounded-xl bg-black/40 overflow-y-scroll py-3 px-2" v-html="textArticleMD"></div>
      </div>

      <button @click="nextPage(2)" class="bg-black/50 w-full py-2 px-2 rounded-xl">Ajouter les informations</button>
   </div>


   <div class="flex flex-col gap-4 w-3/5 mx-auto mt-10" v-show="showInformation">
      <input required
         v-model="nameArticle"
         type="text"
         placeholder="Nom de l'article" 
         class="w-full mb-2 rounded bg-black/40 py-2 px-3 placeholder:text-primary/40"
      >
      <div class="w-full">
         <h2 class="text-xl">Catégories (max 3)</h2>
         <ul class="w-full h-48 overflow-y-auto rounded bg-black/40">
            <li v-for="(category) in apiCategories" :key="category.id">
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
      <button @click="sendArticle" class="bg-primary text-black w-full py-2 px-2 rounded-xl">Créer l'article</button>
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

         textArticle: '',
         textArticleMD : '',

         nameArticle: '',
         listCategories: [],
      }
   },

   mounted(){
      api.get('/categories?_sort=name').then((responses) => {
         this.apiCategories = responses.data
         this.apiCategories.forEach((category, index) => {
            this.apiCategories[index].checked = false
         })
      })
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
      sendArticle(){
         if (confirm('Souhaites-tu bien créer l\'article ?')){
            api.post('/articles',
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
   }
}
</script>


<style>

</style>
