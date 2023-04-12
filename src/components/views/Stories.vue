<template>
    <div class="card-container">
        <template v-for="story in Stories" :key="story.id">
            <div class="history-card" @click="gotToStory(story.id)">
                <p>
                    {{ story.title }}
                </p>
                <img :src="story.cover" />
                <p>
                    {{ story.firstParagraph }}
                </p>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
const Stories = ref<any[]>([]);
onBeforeMount(() => {
    console.log('Stories');
    Stories.value = [
        {   
            id: 1,
            title: 'Le petit chaperon rouge',
            cover: 'https://images.unsplash.com/photo-1512331455279-c8ae8178f586?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80',
            firstParagraph: 'Le petit chaperon rouge est une histoire de conte de fées. Elle raconte l\'histoire d\'une fillette qui va rendre visite à sa grand-mère malade. Elle se fait attaquer par un loup-garou et est sauvée par un chasseur.'
        },
        {
            id: 2,
            title: 'Le grand méchant loup',
            cover: 'https://images.unsplash.com/photo-1462759353907-b2ea5ebd72e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhaXJ5JTIwdGFsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            firstParagraph: 'Le petit chaperon rouge est une histoire de conte de fées. Elle raconte l\'histoire d\'une fillette qui va rendre visite à sa grand-mère malade. Elle se fait attaquer par un loup-garou et est sauvée par un chasseur.'
        },
        {
            id: 3,
            title: 'Les trois petits cochons',
            cover: 'https://images.unsplash.com/photo-1558127920-90f28455f888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZhaXJ5JTIwdGFsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            firstParagraph: 'Le petit chaperon rouge est une histoire de conte de fées. Elle raconte l\'histoire d\'une fillette qui va rendre visite à sa grand-mère malade. Elle se fait attaquer par un loup-garou et est sauvée par un chasseur.'
        },
    ];

}
);


const gotToStory = (id: number) => {
    console.log('go to story', id);
}
</script>

<style scoped>
.history-card {
    width: 300px;
    height: 400px;
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

</style>