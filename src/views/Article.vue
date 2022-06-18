<template>
<div class="container flex items-center flex-col">
   <h1 class="text-3xl mb-10 mt-10">{{ tips.title }}</h1>

   <div id="Article" class="w-full px-10" v-html="tips.article"></div>
</div>
</template>

<script>
import highlight from 'highlight.js'
import 'highlight.js/styles/base16/solarized-dark.css'
import { marked } from 'marked'

export default {
   data() {
      return {
         tips: {title: 'Chargement...', article: 'Si vous voyez ce message, c\'est qu\'une erreur est survenue.'},
      }
   },

   methods: {
      requestApi(){
         if(this.$route.params.id !== undefined){
            // Liste des requêtes à l'API
            let urls = [
               '/articles/' + this.$route.params.id,
            ]
   
            let requests = urls.map(url => api.get(url))
   
            // Quand toutes les requêtes sont terminé alors :
            Promise.all(requests).then((responses) => {
               // Rangement des requêtes dans un tableau spécifique
               this.tips = responses[0].data
               this.tips.article = marked(this.tips.article, {
                  highlight(md) {
                     return highlight.highlightAuto(md).value
                  }
               })
               document.title = this.tips.title + 'Tips de Catif'
               document.querySelector('meta[name="description"]').setAttribute('content', this.tips.desc)
               document.querySelector('meta[name="keywords"]').setAttribute('content', defaultTags + this.tips.tags)
            }).catch(err => {
               console.log(err)
               this.$router.push('/')
            })
         } else {
            this.$router.push('/')
         }
      }
   },

   watch: {
      "$route.params": {
         handler() {
            this.requestApi();
         },
         immediate: true,
      },
   }
}
</script>

<style>
#Article :first-child,
#Article h1 + *,
#Article h2 + *,
#Article h3 + *,
#Article hr + *{
   margin-top: 5px !important;
}
#Article hr{border-color: #8FB2DF}
#Article h1,
#Article h2,
#Article h3{
   margin-top: 100px;
   margin-bottom: 5px;
   font-weight: bold;
}
#Article h1{
   font-size: 1.5rem;
   line-height: 2rem;
}
#Article h2{
   font-size: 1.25rem;
   line-height: 1.75rem;
}
#Article h3{
   font-size: 1.125rem;
   line-height: 1.75rem;
}

#Article p{
   font-size: 1rem;
   margin-top: 30px;
}

pre {
   padding: 4px 4px 4px 10px;
   overflow-x: auto;
   background-color: hsl(214, 49%, 10%);
}
code{
   background-color: hsl(214, 49%, 10%);
   padding: 1px 3px;
}
pre code {
   display: inline-block;
   font-size: 14px;
}
.hljs-comment {font-style: italic;}

#Article a,
#Article a:visited {
   text-decoration: underline;
   color: hsl(214, 56%, 90%);
}
#Article a:hover,
#Article a:focus,
#Article a:active {color: hsl(214, 56%, 80%);}

pre,
blockquote {
   border: 1px solid hsl(214, 56%, 50%);
   margin-bottom: 5px !important;
}
blockquote {
   border-left: 6px solid #8FB2DF;
   padding: 1rem;
   border-radius: .3em;
}
pre{border-radius: .5em;}

#Article thead {display: table-header-group;}

#Article img,
#Article canvas,
#Article iframe,
#Article video,
#Article svg,
#Article select,
#Article textarea {
   margin: auto;
   margin-top: 5px;
   border-radius: 4px;
}

#Article ul { 
   list-style-type: disc; 
   list-style-position: inside; 
}
#Article ol { 
   list-style-type: decimal; 
   list-style-position: inside; 
}
#Article ul ul, ol ul { 
   list-style-type: circle; 
   list-style-position: inside; 
   margin-left: 15px; 
}
#Article ol ol, ul ol { 
   list-style-type: lower-latin; 
   list-style-position: inside; 
   margin-left: 15px; 
}

</style>
