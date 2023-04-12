<template>
  <div>
    <Navbar />
    <h1>Kid Story Ai Generator</h1>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>