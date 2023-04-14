
<template>
    <div id="ai-form">
        <div class="text-input">
            <textarea placeholder="C'est l'histoire de ..." v-model="formModel.story"></textarea>
        </div>
        <div class="text-input">
            <label for="genre">Genre:</label>
            <select v-model="formModel.genre">
                <option disabled value="">Selectionnez un genre</option>
                <option>Fantastique</option>
                <option>Educatif</option>
                <option>Aventure</option>
            </select>
        </div>
        <div class="text-input">
            <label for="genre">Style:</label>
            <select v-model="formModel.style">
                <option disabled value="">Selectionnez un genre</option>
                <option>Cartoon</option>
                <option>Aquarelle</option>
                <option>Enfantin</option>
            </select>
        </div>
        <button @click="addCharacter">Ajouter un personnage</button>
        <template v-if="characters.length">
            <label for="genre">Personnages:</label>      
            <div class="text-input" v-for="(character, index) in characters">
                <div class="character-input">
                    <input type="text" id="sujet" v-model="formModel.characters[index]" />
                    <button @click="removeCharacter(index)">🗑</button>
                </div>
            </div>
        </template>
      
        <div class="submit-panel-btn">
            <button class="submit-btn" @click="$emit('submit', formModel)">Generez 💫</button>
            <button class="submit-btn" @click="$emit('submit:ia', formModel)">L'IA décide 🤖</button>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
let characters = ref<string[]>([]);

let formModel = ref({
    story: '',
    genre: '',
    style: '',
    characters: [],
});
let charactersModel = ref<string[]>([]);
const prompt = ref<string>('');
defineEmits(['submit']);

watch(charactersModel.value, () => {
    console.log(charactersModel.value);
})

const addCharacter = () => {
    characters.value.push('');
}
const removeCharacter = (index: number) => {
    characters.value.splice(index, 1);
}
</script>
<style scoped>
#ai-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 35%;
    height: 50%;
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    gap: 12px;
    font-family: Avenir;
}

input[type=text],
select {
    width: 100%;
    padding: 12px 7px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type=submit] {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

label {
    font-weight: bolder;
    color: #000;
}

.text-input {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: left;
    width: 100%;
    gap: 8px;
}

textarea {
    width: 100%;
    height: 150px;
    padding: 8px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    color: #000;
    font-size: 16px;
    resize: none;
    outline: none;
    font-family: Avenir;
    font-weight: bold;
}

.character-input {
    display: grid;
    grid-template-columns: 3fr 1fr;
    width: 100%;
    gap: 4px;
}
.submit-panel-btn{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 8px;
}

.submit-btn {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
}
</style>