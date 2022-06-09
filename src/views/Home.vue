<template>
    <div class="container flex items-center flex-col">
        <!-- <pre>
            {{tabTips}}
        </pre> -->



        <h1 class="text-3xl mb-5">Tips de Catif</h1>
        <div>
            <p>Bienvenue sur mon site dédié à mes tips. Pour être plus précis, sur ce site vous trouverez toutes les astuces que j'ai trouvé pour résoudre des problèmes chiants à trouver sur internet !</p>
            <p>Le genre d'information que vous métriez du temps à trouver car vous êtes tout seul à la chercher. :D</p><br>
            <p>Bien sûr, ce site ne contiendra pas QUE des informations de niche, mais aussi des informations simple qui sur internet sont mal ou très peu expliquées.</p>
        </div>




        <h1 class="text-3xl mb-5 mt-10">Derniers tips publiées</h1>
        <div id="Last-tips" class="w-full flex justify-center gap-10 ">
            <CardTips :Tips="Tips" :Category="tabCategory" v-for="(Tips, index) in tabTips" :key="index"/>
        </div>



        <h1 class="text-3xl mb-5 mt-10">Liste des catégories</h1>


    </div>
</template>





<script>
import CardTips from '@/components/Card-Tips.vue'

export default {
    components: {
        CardTips
    },

    data () {
        return {
            tabTips: null,
            tabCategory: null
        }
    },
    
    mounted () {
        let urls = [
            '/articles?page=1&limit=3&sortBy=createdAt&order=desc',
            '/category'
        ]

        let requests = urls.map(url => api.get(url))

        Promise.all(requests).then((responses) => {
            this.tabTips = responses[0].data
            this.tabCategory = responses[1].data

            this.tabTips.forEach((tips, tipsId) => {
                let date = new Date(tips.createdAt * 1000)
                this.tabTips[tipsId].createdAt = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + date.getFullYear();
                
                tips.category.forEach((category, categoryId) => {
                    let url = this.tabCategory.find(el => el.name === category).url
                    
                    this.tabTips[tipsId].category[categoryId] = {'title': category, 'url': url}
                })
            });
        })
    }
}
</script>