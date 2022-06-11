<template>
    <transition name="fade" appear>
        <router-link :to="'/category/' + Category.url" class="w-1/5 h-16 flex justify-center items-center flex-wrap py-2 px-4 bg-black/30 rounded-xl group">
            <p class="text-lg group-hover:text-white">{{ Category.name }}</p>
        </router-link>
    </transition>
</template>




<script>
export default {
    props: {
        Category : {
            type: Object,
            default: {
            }
        }
    }

}
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition-property: opacity;
        transition-duration: .8s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>