<template>
    <template v-if="isLoaded">
        <div id="PdfToPrint">
            <h1>{{ title }}</h1>
            <template v-for="chapter in story">
                <div class="story-block">
                    <img :src="chapter.image" alt="image" />
                    <p>{{ chapter.paragraph }}</p>
                </div>
            </template>
        </div>
    </template>
    <template v-else>
        <template v-for="chapter in story" :key="index">
            <div class="story-block-loading">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png" />
                <p> L'Ia vous invente une histoire</p>
            </div>
        </template>
    </template>
</template>
<script setup lang="ts">

defineProps({
    title: {
        type: String,
        required: true
    },
    story: {
        type: Array<any>,
        required: true
    },
    isLoaded: {
        type: Boolean,
    }
}
);



</script>
<style>
:root {
    --loading-grey: #ededed;
}

.story-block {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: center;
    margin: 2rem;
}

.story-block img {
    width: 20rem;
    height: 20rem;
    object-fit: cover;
    margin-right: 2rem;
    border-radius: 8px;
}

.story-block p {
    width: 50%;
    min-height: 18rem;
    font-size: 1.4rem;
    text-align: justify;
    margin: 0;
    color: #000;
    background-color: #fff;
    border-radius: 8px;
    padding: 1rem;
}

.story-block-loading {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: center;
    margin: 2rem;
}

.story-block-loading img {
    width: 20rem;
    height: 20rem;
    object-fit: cover;
    margin-right: 2rem;
    background-color: var(--loading-grey);
    background: linear-gradient(100deg,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, .5) 50%,
            rgba(255, 255, 255, 0) 60%) var(--loading-grey);
    background-size: 200% 100%;
    background-position-x: 180%;
    animation: 1s loading ease-in-out infinite;
    border-radius: 8px;
}

@keyframes loading {
    to {
        background-position-x: -20%;
    }
}

.story-block-loading p {
    width: 50%;
    height: 20rem;
    font-size: 1.5rem;
    text-align: justify;
    margin: 0;
    color: #000;
    font-family: Avenir;
    background-color: var(--loading-grey);
    background: linear-gradient(100deg,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, .5) 50%,
            rgba(255, 255, 255, 0) 60%) var(--loading-grey);
    background-size: 200% 100%;
    background-position-x: 180%;
    animation: 1s loading ease-in-out infinite;
    border-radius: 8px;

}

@media print {
    .PdfToPrint {
        background-color: white;
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        margin: 0;
        padding: 15px;
        font-size: 14px;
        line-height: 18px;
    }
}
</style>
