<template>
   <div class="container h-full flex flex-col justify-center">
      <Alert v-if="alert.length != 0" :alert="alert"/>
      <h1 class="text-3xl text-center mb-5 mt-10">Accès administrateur</h1>
      <form
         id="login"
         @submit.prevent="checkForm"
         class="w-96 flex flex-col items-center py-2 px-3 bg-black/30 rounded-xl mx-auto" 
      >
         <input required
            id="identifiant" 
            v-model="identifiant"
            type="text" 
            name="identifiant" 
            placeholder="Identifiant" 
            class="w-full mb-2 rounded bg-black/40 py-2 px-3 placeholder:text-primary/40"
         >
         <input required
            id="password" 
            v-model="password"
            type="password" 
            name="password" 
            placeholder="Mot de passe" 
            class="w-full mb-2 rounded bg-black/40 py-2 px-3 placeholder:text-primary/40"
         >

         <input 
            type="submit" value="Se connecter"
            class="bg-black/50 w-3/4 min-w-fit py-1 px-2 rounded hover:cursor-pointer"
         >
      </form>
   </div>
</template>

<script>
import Alert from "@/components/Alert.vue"

export default {
   components:{
      Alert
   },
   data() {
      return {
         identifiant: '',
         password: '',

         alert: []
      }
   },

   methods: {
      checkForm: function (e){
         if (this.identifiant !== '' && this.password !== ''){
            apiBase.post('/auth/local', {
               identifier: this.identifiant,
               password: this.password
            }).then(res => {
               this.$store.commit('setToken', res.data.jwt)
               this.$store.commit('setName', res.data.user.username)
               console.log(this.$store)

               this.$router.push('/panel')
               
               this.alert = ['success', 'Vous allez être redirigé vers le panel administrateur']
               setTimeout(() => {
                  this.alert = []
               }, 5000)
            }).catch(e => {
               this.alert = ['error', 'Identifiant ou mot de passe incorrect.']
               setTimeout(() => {
                  this.alert = []
               }, 5000)
            })
         }
      }
   }
}
</script>

<style>

</style>
