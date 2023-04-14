<template>
    <div class="card-container">
        <template v-if="Stories.length === 0">
            <p style="width: max-content;">
                Vous n'avez aucune histoires pour le moment... 😔<br>Commencez par en créer une ! 🤗
            </p>
            <button class="submit-btn" @click="() => { router.push('/') }">Créer une histoire</button>
        </template>
        <template v-else v-for="story in Stories" :key="story.id">
            <div class="history-card" @click="gotToStory(story.id)">
                <p>
                    {{ story.title }}
                </p>
                <img :src="story.cover" />
                <p class="text-desc">
                    {{ story.firstParagraph }}
                </p>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import router from '../../router';
const Stories = ref<any[]>([]);

const getUserStories = () => {
    fetch('http://localhost:8080/api/story/all', {
        headers: {
            "Content-Type": "application/json",
            'x-access-token': localStorage.getItem('token') || ''
        },
    })
        .then(response => response.json())
        .then(data => {
            Stories.value = data.stories;
        })


}
onBeforeMount(() => {
    getUserStories();
}
);


const gotToStory = (id: number) => {
    router.push({ name: 'Story', params: { id } });
}

const checkIfImageExists = (url: string) => {
    const img = new Image();
    img.src = url;
    if (img.complete) {
        return url
    } else {
        return "https://media.tenor.com/V9Z08mOcTJwAAAAC/this-content-is-not-available.gif";

    }
};
</script>

<style scoped>
.history-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.history-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
}

.history-card p {
    font-size: 14px;
    font-weight: 500;
    color: #000;
    margin: 0;
}

.history-card p:first-child {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.card-container {
    width: 50%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 10px;
    justify-items: center;
    align-items: center;
    justify-self: center;

}

.text-desc {
    font-size: 14px;
    height: 10.8rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
    overflow: hidden;
}
</style>