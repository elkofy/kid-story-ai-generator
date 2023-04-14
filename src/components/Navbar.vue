<template>
        <nav>
            <ul>
                <li  v-if="isLoggedin"><router-link to="/">Accueil</router-link></li>
                <li v-if="isLoggedin"><router-link to="/stories">Histoire</router-link> </li>
                <li v-if="!isLoggedin"><router-link to="/login">Connexion</router-link></li>
                <li v-if="!isLoggedin"><router-link to="/register">Inscription</router-link></li>
                <li v-if="isLoggedin" @click="logoutUser"><router-link to="/login">Se deconnecter</router-link></li>
            </ul>
        </nav>
</template>
<script setup lang="ts">
import { ref } from "vue";
let isLoggedin = ref(localStorage.getItem('isLoggedIn') == 'true')
const logoutUser = () => {
    localStorage.setItem('token', '')
    localStorage.setItem('username', '')
    localStorage.setItem('isLoggedIn', 'false')
    isLoggedin.value = localStorage.getItem('isLoggedIn') == 'true';
}
</script>