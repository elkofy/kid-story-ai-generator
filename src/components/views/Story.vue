<template>
    <StoryBlock :is-loaded="isLoaded" :title="Story.title" :story="Story.story" />
    <div v-if="loadAnimation" class="lds-hourglass"></div>
    <div class="btn-panel">
        <button @click="redoAChapter" :disabled="!isLoaded || loadAnimation">Régénérer le dernier chapitre</button>
        <button @click="addAChapter" :disabled="!isLoaded || loadAnimation">Ajouter un chapitre</button>
        <button @click="exportPDF" :disabled="!isLoaded || loadAnimation">Exporter en pdf</button>
    </div>
    <canvas id="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import router from '../../router';
import StoryBlock from '../StoryBlock.vue';
const isLoaded = ref<boolean>(false);
const loadAnimation = ref<boolean>(false);

const Story = ref({
    title: '',
    story: [{
        paragraph: "",
        image: "",
    },
    ],
    storyId: "",
});


const addAChapter = () => {
    continueStory()
};

const redoAChapter = () => {
    redoStory()
};

const exportPDF = async () => {
    var divContents = document.getElementById("PdfToPrint")?.innerHTML;
    var a = window.open('', '', 'height=500, width=500');
    a?.document.write('<html>');
    a?.document.write('<body >');
    a?.document.write(divContents || '');
    a?.document.write('</body></html>');
    a?.document.close();
    a?.print();
}
const getStoryById = (storyId: string) => {
    isLoaded.value = false;
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
            Story.value.storyId = storyId;
        })
        .catch((err) => {
            console.log('err', err);
        })
    isLoaded.value = true;
}

const continueStory = async () => {
    loadAnimation.value = true;
    await fetch(`http://localhost:8080/api/story/continue`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token") || ""
        },
        body: JSON.stringify(Story.value)
    }).then(res => res.json()).then((response: any) => {
        Story.value.story.push(response.story[0]);
    })
    loadAnimation.value = false;
}

const redoStory = async () => {
    isLoaded.value = false;
    await fetch(`http://localhost:8080/api/story/remake`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token") || ""
        },
        body: JSON.stringify(Story.value)
    }).then(res => res.json()).then((response: any) => {
        Story.value.story.pop();
        Story.value.story.push(response.story[0]);
    })
    isLoaded.value = true;

}


onBeforeMount(() => {
    let storyId = router.currentRoute.value.params.id as string;
    getStoryById(storyId);
});

</script>

<style>
.btn-panel {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-top: 20px;
}

.btn-panel button {
    margin: 10px;
    min-width: 256px;
    font-size: 16px;
}

.lds-hourglass {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-hourglass 1.2s infinite;
}

@keyframes lds-hourglass {
    0% {
        transform: rotate(0);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    50% {
        transform: rotate(900deg);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    100% {
        transform: rotate(1800deg);
    }
}
</style>