<template>
    <h2>{{ Story.title }}</h2>
    <template v-for="chapter in Story.story" :key="index">
        <div class="story-block">
            <img :src="chapter.image" />
            <p>{{ chapter.paragraph }}</p>
        </div>
    </template>
    <button @click="addAChapter">Ajouter un chapitre</button>
    <button @click="redoAChapter">Régénérer le dernier chapitre</button>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import router from '../../router';
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
    console.log("add a chapter");
    /*Story.value.story.push(
        {
            paragraph: "Camille avait toujours rêvé de partir en voyage autour du monde, mais elle avait toujours eu une bonne raison de repousser ce rêve : le travail, la famille, les obligations. Mais un jour, elle a décidé qu'elle en avait assez d'attendre et qu'il était temps de partir à l'aventure. Elle a réservé un billet d'avion pour le lendemain et a commencé à préparer ses affaires. Elle était excitée et un peu effrayée à l'idée de partir seule, mais elle savait que c'était quelque chose qu'elle devait faire.",
            image: "https://www.imagesource.com/cache/pcache2/00261816.jpg",
        }
    )*/
    continueStory()
};

const redoAChapter = () => {
    console.log("redo a chapter");
    /*Story.value.story.push(
        {
            paragraph: "Camille avait toujours rêvé de partir en voyage autour du monde, mais elle avait toujours eu une bonne raison de repousser ce rêve : le travail, la famille, les obligations. Mais un jour, elle a décidé qu'elle en avait assez d'attendre et qu'il était temps de partir à l'aventure. Elle a réservé un billet d'avion pour le lendemain et a commencé à préparer ses affaires. Elle était excitée et un peu effrayée à l'idée de partir seule, mais elle savait que c'était quelque chose qu'elle devait faire.",
            image: "https://www.imagesource.com/cache/pcache2/00261816.jpg",
        }
    )*/
    redoStory()
};

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

const continueStory = async () =>{
  console.log(JSON.stringify(Story.value.story[Story.value.story.length-1]))
  await fetch(`http://localhost:8080/api/story/continue`,{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'x-access-token' : localStorage.getItem("token") || ""
    },
    body: JSON.stringify(Story.value)}).then(res=>res.json()).then((response:any)=>{
      console.log(response);
      Story.value.story.push(response.story[0]);
    })
}

const redoStory = async () =>{
  console.log(JSON.stringify(Story.value.story[Story.value.story.length-1]))
  await fetch(`http://localhost:8080/api/story/remake`,{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'x-access-token' : localStorage.getItem("token") || ""
        },
    body: JSON.stringify(Story.value)}).then(res=>res.json()).then((response:any)=>{
      console.log(response);
      Story.value.story.pop();
      Story.value.story.push(response.story[0]);
    })
}


onBeforeMount(() => {
    let storyId = router.currentRoute.value.params.id as string;
    getStoryById(storyId);
    console.log('storyId', storyId);
});
</script>