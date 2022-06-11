<template>
    <div class="container flex items-center flex-col">
        <h1 class="text-3xl mb-10 mt-10">{{ tips.title }}</h1>

        <div>
            <p>{{tips.article}}</p>
        </div>
    </div>
</template>





<script>
export default {
    data(){
        return {
            tips: [],
        }
    },

    mounted(){
        // Liste des requêtes à l'API
        let urls = [
            '/articles/' + this.$route.params.id,
        ]

        let requests = urls.map(url => api.get(url))

        // Quand toutes les requêtes sont terminé alors :
        Promise.all(requests).then((responses) => {
            // Rangement des requêtes dans un tableau spécifique
            this.tips = responses[0].data
        })
    }
}

</script>






<style>

</style>