<template>
<div class="container flex items-center flex-col">
   <h1 class="text-3xl mb-10 mt-10">{{ tips.title }}</h1>

   <div v-html="tips.article"></div>
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

         opts: {
            auto: true,
            code: true,
            register: null,
            inline: false,
            hljs: highlight,
            ignoreIllegals: true
         }
      }
   },

   mounted() {
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
</script>

<style>
pre {
   padding: 10px 20px;
   overflow-x: auto;
   background-color: rgba(0, 0, 0, .5);
}

pre code {
   display: inline-block;
   tab-size: 2;
}
</style>
