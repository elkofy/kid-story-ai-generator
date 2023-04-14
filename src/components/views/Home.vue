<template>
    <h2 v-if="!isGenerated">Generate your story 📖</h2>
    <PromptForm v-if="!isGenerated" @submit="generateStory" @submit:ia="generateWithIa" />
    <template v-else>
        <StoryBlock :isLoaded="isLoaded" :title="StoryFromApi.title" :story="StoryFromApi.story"
            @goBack="goBackToGeneration" />
        <div v-if="loadAnimation" class="lds-hourglass"></div>

        <div class="btn-panel">
            <button @click="addAChapter" :disabled="!isLoaded || loadAnimation">Ajouter un chapitre</button>
            <button @click="redoAChapter" :disabled="!isLoaded || loadAnimation">Régénérer le dernier chapitre</button>
        </div>
    </template>
</template>
<script setup lang="ts">
import { ref, toRaw } from "vue";
import PromptForm from "../PromptForm.vue";
import StoryBlock from "../StoryBlock.vue";

const isGenerated = ref<boolean>(false);
const isLoaded = ref<boolean>(false);
const loadAnimation = ref<boolean>(false);
const StoryFromApi = ref({
    title: "empty",
    story: [
        {
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


const generateWithIa = (formObject: any) => {
    isGenerated.value = true;
    callServer(formObject);
}

const generateStory = (formObject: any) => {
    let object = toRaw(formObject);

    if (object.story === '') {
        alert('Entrer une histoire');
    }
    else if (object.genre === '') {
        alert('Entrer un genre');
    }
    else if (object.style === '') {
        alert('Entrer un style');
    }
    else {
        isGenerated.value = true;
        callServer(object);
    }
};

const callServer = async (object: any) => {
    isLoaded.value = false;
    await fetch(`http://localhost:8080/api/story/new`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token") || ""
        },
        body: JSON.stringify(object)
    }).then(res => res.json()).then((response) => {
        console.log(response);
        StoryFromApi.value = response;
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
        body: JSON.stringify(StoryFromApi.value)
    }).then(res => res.json()).then((response) => {
        console.log(response);
        StoryFromApi.value.story.push(response.story[0]);
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
        body: JSON.stringify(StoryFromApi.value)
    }).then(res => res.json()).then((response) => {
        StoryFromApi.value.story.pop();
        StoryFromApi.value.story.push(response.story[0]);
    })
    isLoaded.value = true;

}

const goBackToGeneration = () => {
    isGenerated.value = false;
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
</style>