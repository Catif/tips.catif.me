<template>
    <router-link :to="'/article/' + Tips.id" class="w-96 h-32 flex justify-between flex-col py-2 px-3 bg-black/30 rounded-xl group">
        <p class="text-sm group-hover:text-white">{{ Tips.title }}</p>
        <div>
            <ul class="flex flex-row gap-2 text-xs">
                <li class="w-fit py-1 px-2 border border-primary rounded-xl hover:border-white hover:text-white" v-for="(categoryTip, index) in Tips.category" :key="index">
                    <router-link :to="'/category/' + categoryTip.url">{{ categoryTip.title }}</router-link>
                </li>
            </ul>
            <p class="text-right text-xs pt-1 group-hover:text-white">{{ Tips.createdAt }}</p>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        Tips : {
            type: Object,
            default: {
            }
        },
        Category : {
            type: Object,
            default: {
            }
        }
    }
}
</script>
