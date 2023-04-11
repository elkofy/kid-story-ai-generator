<template>
    <div>
        <h2>{{ title }}</h2>
        <template v-for="chapter in story" :key="index">
            <div class="story-block">
                <img :src="chapter.image" />
                <p >{{ chapter.paragraph }}</p>
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
            type: Array<any>,
            required: true
        }
    }
    );

</script>
<style>
.story-block {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: center;
    margin: 2rem;
}

.story-block img {
    width: 20rem;
    height: 20rem;
    object-fit: cover;
    margin-right: 2rem;
    margin-top: 8px;;
}

.story-block p {
    width: 50%;
    font-size: 1.5rem;
    text-align: justify;
    margin: 0;
}


</style>
