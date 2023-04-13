    <template>
    <h2 v-if="!isGenerated">Generate your story 📖</h2>
    <PromptForm v-if="!isGenerated" @submit="generateStory" />
    <template v-else>
        <button @click="addAChapter">Ajouter un chapitre</button>
        <button @click="redoAChapter">Régénérer le dernier chapitre</button>
        <StoryBlock :title="StoryFromApi.title" :story="StoryFromApi.story" @goBack="goBackToGeneration" />
    </template>
</template>
<script setup lang="ts">
import { ref, toRaw } from "vue";
import PromptForm from "../PromptForm.vue";
import StoryBlock from "../StoryBlock.vue";

const isGenerated = ref<boolean>(false);
const StoryFromApi = ref({
    title: "empty",
    story: [
        {
            paragraph: "MOCK paragraph",
            image: "https://www.imagesource.com/cache/pcache2/00261816.jpg",
        },
    ],
});

const addAChapter = () => {
    console.log("add a chapter");
    /*StoryFromApi.value.story.push(
        {
            paragraph: "Camille avait toujours rêvé de partir en voyage autour du monde, mais elle avait toujours eu une bonne raison de repousser ce rêve : le travail, la famille, les obligations. Mais un jour, elle a décidé qu'elle en avait assez d'attendre et qu'il était temps de partir à l'aventure. Elle a réservé un billet d'avion pour le lendemain et a commencé à préparer ses affaires. Elle était excitée et un peu effrayée à l'idée de partir seule, mais elle savait que c'était quelque chose qu'elle devait faire.",
            image: "https://www.imagesource.com/cache/pcache2/00261816.jpg",
        }
    )*/
    continueStory()
};

const redoAChapter = () => {
    console.log("redo a chapter");
    /*StoryFromApi.value.story.push(
        {
            paragraph: "Camille avait toujours rêvé de partir en voyage autour du monde, mais elle avait toujours eu une bonne raison de repousser ce rêve : le travail, la famille, les obligations. Mais un jour, elle a décidé qu'elle en avait assez d'attendre et qu'il était temps de partir à l'aventure. Elle a réservé un billet d'avion pour le lendemain et a commencé à préparer ses affaires. Elle était excitée et un peu effrayée à l'idée de partir seule, mais elle savait que c'était quelque chose qu'elle devait faire.",
            image: "https://www.imagesource.com/cache/pcache2/00261816.jpg",
        }
    )*/
    redoStory()
};


const generateStory = (formObject: any) => {
    let object = toRaw(formObject);

    if (object.story === '') {
        alert('Please enter a story');
    }
    else if (object.genre === '') {
        alert('Please enter a genre');
    }
    else if (object.style === '') {
        alert('Please enter a style');
    }
    else if (object.characters.length === 0) {
        alert('Please enter a characters');
    }
    else {
        isGenerated.value = true;
        console.log(object);
        callServer(object);
    }
};

const callServer = async (object:any) =>{
  await fetch(`http://localhost:8080/api/story/new`,{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'x-access-token' : localStorage.getItem("token") || ""
    },
    body: JSON.stringify(object)}).then(res=>res.json()).then((response)=>{
      console.log(response);
      StoryFromApi.value = response;
    })
}

const continueStory = async () =>{
  console.log(JSON.stringify(StoryFromApi.value.story[StoryFromApi.value.story.length-1]))
  await fetch(`http://localhost:8080/api/story/continue`,{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'x-access-token' : localStorage.getItem("token") || ""
    },
    body: JSON.stringify(StoryFromApi.value.story[StoryFromApi.value.story.length-1])}).then(res=>res.json()).then((response)=>{
      console.log(response);
      StoryFromApi.value.story.push(response.story[0]);
    })
}

const redoStory = async () =>{
  console.log(JSON.stringify(StoryFromApi.value.story[StoryFromApi.value.story.length-1]))
  await fetch(`http://localhost:8080/api/story/remake`,{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
      'x-access-token' : localStorage.getItem("token") || ""
    },
    body: JSON.stringify(StoryFromApi.value.story[StoryFromApi.value.story.length-1])}).then(res=>res.json()).then((response)=>{
      console.log(response);
      StoryFromApi.value.story.pop();
      StoryFromApi.value.story.push(response.story[0]);
    })
}

const goBackToGeneration = () => {
    isGenerated.value = false;
    console.log("go back to generation");
};

</script>
<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}


#snackbar {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
}
</style>