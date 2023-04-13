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
    <button @click="exportPDF"> Exporter en pdf</button>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import router from '../../router';
import { jsPDF } from "jspdf";


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
            Story.value.storyId = storyId;

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
  console.log(JSON.stringify(Story.value))
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