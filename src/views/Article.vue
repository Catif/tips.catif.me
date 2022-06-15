<template>
<div class="container flex items-center flex-col">
   <h1 class="text-3xl mb-10 mt-10">{{ tips.title }}</h1>

   <div id="Article" class="w-full px-10" v-html="tips.article"></div>
</div>
</template>

<script>
import highlight from 'highlight.js'
import 'highlight.js/styles/base16/solarized-dark.css'
import {
   marked
} from 'marked'

export default {
   data() {
      return {
         tips: [],
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
            })
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
pre {
   padding: 4px 4px 4px 10px;
   overflow-x: auto;
   background-color: hsl(214, 49%, 10%);
}

code{
   background-color: hsl(214, 49%, 10%);
}

pre code {
   display: inline-block;
   font-size: 14px;
}

.hljs-comment {
   font-style: italic;
}

#Article a,
#Article a:visited {
   text-decoration: underline;
   color: hsl(214, 56%, 90%);
}

#Article a:hover,
#Article a:focus,
#Article a:active {
   color: hsl(214, 56%, 80%);
}

pre,
blockquote {
   border: 1px solid hsl(214, 56%, 50%);
}
pre{
   border-radius: .5em;
}
blockquote{
   border-radius: .3em;
}

#Article thead {
   display: table-header-group;
}

#Article p{
   font-size: 1rem;
   margin-top: 30px;
}

#Article h1,
#Article h2,
#Article h3{
   font-weight: 700;
   margin-top: 25px;
   margin-bottom: 5px;
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

#Article img,
#Article canvas,
#Article iframe,
#Article video,
#Article svg,
#Article select,
#Article textarea {
   max-width: 90%;
   margin: auto;
}

#Article blockquote {
   border-left: 6px solid #8FB2DF;
   padding: 1rem;
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

#Article hr{
   border-color: #8FB2DF
}
</style>
