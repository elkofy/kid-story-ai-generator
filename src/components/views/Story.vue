<template>
    <h2>{{ Story.title }}</h2>
    <template v-for="chapter in Story.chapters" :key="index">
        <div class="story-block">
            <img :src="chapter.image" />
            <p>{{ chapter.paragraph }}</p>
        </div>
    </template>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import router from '../../router';
const Story = ref({
    title: '',
    chapters: []
});
const getStoryById = (storyId: string) => {
    fetch('http://localhost:8080/api/story/' + storyId, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'x-access-token': localStorage.getItem('token') || ''
        },
    })
        .then(res => res.json())
        .then((response) => {
            Story.value = response;

        })
        .catch((err) => {
            console.log('err', err);
        })
}

onBeforeMount(() => {
    let storyId = router.currentRoute.value.params.id as string;
    getStoryById(storyId);
    console.log('storyId', storyId);
});
</script>