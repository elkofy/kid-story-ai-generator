<template>
  <h1>Kid Story Ai Generator</h1>
  <h2 v-if="!isGenerated">Generate your story 📖</h2>
  <PromptForm v-if="!isGenerated" @submit="generateStory" />
  <template v-else>
    <StoryBlock :title="StoryFromApi.title" :story="StoryFromApi.story" @goBack="goBackToGeneration" />
    <button @click="continueStory"> Add </button>
    <button @click="redoStory"> Re do </button>
  </template>
</template>



<script setup lang="ts">
import { ref, toRaw } from "vue";
import PromptForm from "./components/PromptForm.vue";
import StoryBlock from "./components/StoryBlock.vue";

const isGenerated = ref<boolean>(true);
const StoryFromApi = ref({
  title: "Le succès de Mathieu dans le développement",
  story: [
    {
      paragraph: "Mathieu était un jeune homme passionné par l'informatique depuis son plus jeune âge. Il avait toujours rêvé de devenir développeur et de travailler dans une grande entreprise de technologie. Après des années de travail acharné et de formation, Mathieu a finalement réussi à décrocher son premier emploi en tant que développeur junior dans une entreprise de renom. Grâce à ses compétences techniques, son attitude positive et sa capacité à travailler en équipe, Mathieu a rapidement gravi les échelons et a été promu au poste de développeur principal en moins de deux ans. Il était fier de son parcours et de ses accomplissements, mais il savait aussi que le succès n'était pas seulement dû à son travail acharné, mais aussi à sa persévérance. ",
      image: "https://www.imagesource.com/cache/pcache2/00261816.jpg",
    },
  ],
});

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
      'x-access-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViMDBkODI5LWMxMGQtNGRjZC1iZmI5LWNkNmQ2MmUwNmY2NiIsImlhdCI6MTY4MTM3NDI3OSwiZXhwIjoxNjgxNDYwNjc5fQ.e-ZE9j6OQ8w-W54xiPJ45ngmbHyFtspkFfHyqD6FVSc'
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
      'x-access-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViMDBkODI5LWMxMGQtNGRjZC1iZmI5LWNkNmQ2MmUwNmY2NiIsImlhdCI6MTY4MTM3NDI3OSwiZXhwIjoxNjgxNDYwNjc5fQ.e-ZE9j6OQ8w-W54xiPJ45ngmbHyFtspkFfHyqD6FVSc'
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
      'x-access-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViMDBkODI5LWMxMGQtNGRjZC1iZmI5LWNkNmQ2MmUwNmY2NiIsImlhdCI6MTY4MTM3NDI3OSwiZXhwIjoxNjgxNDYwNjc5fQ.e-ZE9j6OQ8w-W54xiPJ45ngmbHyFtspkFfHyqD6FVSc'
    },
    body: JSON.stringify(StoryFromApi.value.story[StoryFromApi.value.story.length-1])}).then(res=>res.json()).then((response)=>{
      console.log(response);
      StoryFromApi.value.story.pop();
      StoryFromApi.value.story.push(response.story[0]);
    })
}

const goBackToGeneration = () =>   {
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