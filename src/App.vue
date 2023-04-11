<template>
  <h1>Kid Story Ai Generator</h1>
  <h2 v-if="!isGenerated">Generate your story 📖</h2>
  <PromptForm v-if="!isGenerated" @submit="generateStory" />
  <StoryBlock v-else :title="StoryFromApi.title" :story="StoryFromApi.story" @goBack="goBackToGeneration" />
</template>


<script setup lang="ts">
import { ref, toRaw } from "vue";
import PromptForm from "./components/PromptForm.vue";
import StoryBlock from "./components/StoryBlock.vue";

const isGenerated = ref<boolean>(true);
const StoryFromApi = ref({
  title: "Titre",
  story: [
    {
      paragraph: "Camille avait toujours rêvé de partir en voyage autour du monde, mais elle avait toujours eu une bonne raison de repousser ce rêve : le travail, la famille, les obligations. Mais un jour, elle a décidé qu'elle en avait assez d'attendre et qu'il était temps de partir à l'aventure. Elle a réservé un billet d'avion pour le lendemain et a commencé à préparer ses affaires. Elle était excitée et un peu effrayée à l'idée de partir seule, mais elle savait que c'était quelque chose qu'elle devait faire.",
      image: "https://www.imagesource.com/cache/pcache2/00261816.jpg",
    },
    {
      paragraph: "Camille a parcouru des milliers de kilomètres, visité des paysages magnifiques et a rencontré des gens incroyables. Elle a passé une semaine sur une plage paradisiaque en Thaïlande, a marché dans les rues animées de Tokyo et a fait de la randonnée dans les montagnes suisses. Mais ce qui l'a le plus marqué, ce sont les rencontres qu'elle a faites. Elle a rencontré des gens de tous les horizons, des artistes, des entrepreneurs, des étudiants. Ils ont partagé des histoires et des expériences qui ont changé sa vie.",
      image: "https://www.tutorialspoint.com/assets/questions/media/426142-1668760872.png",
    },
    {
      paragraph: "Le voyage n'était pas toujours facile. Il y avait des moments où Camille se sentait seule, perdue et épuisée. Elle a dû faire face à des situations difficiles, comme lorsqu'elle a raté son avion pour le Laos et a dû passer la nuit dans un aéroport bondé. Elle a également été confrontée à des barrières linguistiques et culturelles qui ont rendu la communication difficile. Mais chaque fois qu'elle a surmonté un défi, elle a ressenti un sentiment de fierté et d'accomplissement.",
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
  }
};

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