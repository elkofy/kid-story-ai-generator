<template>
    <div>
        <h2>{{ title }}</h2>
        <template v-for="chapter in story" :key="index">
            <div>
                <img :src="chapter.image" />
                <p>{{ chapter.paragraph }}</p>
            </div>
        </template>


    </div>
    <button class="submit-btn" @click="$emit('goBack')">Go Back to Generation 💫</button>
</template>
<script setup lang="ts">
const props =
    defineProps({
        title: {
            type: String,
            required: true
        },
        story: {
            type: Array,
            required: true
        }
    },


    )

</script>
<style></style>
