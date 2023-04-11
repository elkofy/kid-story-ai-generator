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
const isGenerated = ref<boolean>(false);
const StoryFromApi = ref({
  title: "Titre",
  story: [
    {
      paragraph: "test",
      image: "https://www.imagesource.com/cache/pcache2/00261816.jpg",
    },
    {
      paragraph: "test",
      image: "https://www.imagesource.com/cache/pcache2/00261816.jpg",
    },
    {
      paragraph: "test",
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
  else if (object.characters === []) {
    alert('Please enter a characters');
  }
  else {
    isGenerated.value = true;
    console.log(object);
    console.log("generate story");
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

