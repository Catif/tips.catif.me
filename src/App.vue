<template>
    <router-link to='/' class="w-fit py-1 px-2 border border-primary rounded-xl">
        <font-awesome-icon icon="fa-solid fa-house" />
    </router-link>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
                <component :is="Component"></component>
        </transition>
    </router-view>
</template>




<script> 

export default {
    name: 'App',
};

</script>






<style>


/* fade transitions */
.fade-enter-from,
.fade-leave-to{
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all .2s ease-out;
}

.fade-enter-from{
    transform: translateY(-50px);
}

.fade-leave-to{
    transform: translateY(50px);
}
</style>