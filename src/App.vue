<template>
  <div>
    <Navbar :key="key" />
    <h3>Kid Story Ai Generator</h3>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" @update:navbar="key++;" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { ref } from 'vue'
const key = ref(1);
</script>