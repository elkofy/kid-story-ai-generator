<template>
    <div class="login-form">
        <h3>Content de vous revoir 😁</h3>

        <label for="username">Username</label>
        <input v-model="loginForm.username" type="text" placeholder="username" id="username">

        <label for="password">Mot de passe</label>
        <input v-model="loginForm.password" type="password" placeholder="Mot de passe" id="password">
        <button @click="loginUser">Se connecter</button>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import router from "../../router";
const loginForm = ref({
    username: '',
    password: ''
})
const emit = defineEmits(['update:navbar'])

const loginUser = async () => {
    fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm.value)
    })
        .then(res => res.json())
        .then((response) => {
            localStorage.setItem('token', response.accessToken)
            localStorage.setItem('username', response.username)
            localStorage.setItem('isLoggedIn', 'true')
            emit('update:navbar')
            router.push('/');
        })
        .catch((err) => {
            localStorage.setItem('isLoggedIn', 'false')
        })

}
</script>
<style>
*,
*:before,
*:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.login-form {
    height: 520px;
    width: 400px;
    background-color: rgba(255, 255, 255, 0.13);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
}

.login-form * {
    font-family: Avenir, sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}

.login-form h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
}

label {
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}

input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
}

::placeholder {
    color: #e5e5e5;
}
</style>