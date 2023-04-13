<template>
    <h2>{{ Story.title }}</h2>

    <template v-for="chapter in Story.chapters" :key="index">
        <div class="story-block">
            <img :src="chapter.image" />
            <p>{{ chapter.paragraph }}</p>
        </div>
    </template>
    <button @click="exportPDF"> Exporter en pdf</button>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import router from '../../router';
import { jsPDF } from "jspdf";


const Story = ref({
    title: '',
    chapters: [{
        image: '',
        paragraph: ''
    }]
});

const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(Story.value.title, 35, 25);
    for (let i = 0; i < Story.value.chapters.length; i++) {
        doc.addImage('https://plus.unsplash.com/premium_photo-1675537857054-8c7e518553af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1754&q=80', 'JPEG', 100, 100, 180, 160);
        doc.text(Story.value.chapters[i].paragraph, 50, 50);
        doc.addPage();
    }
    doc.save('a4.pdf')

}
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