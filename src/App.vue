<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Postać</RouterLink>
        |
        <RouterLink to="/Ekwipunek">Ekwipunek</RouterLink>
        |
        <RouterLink to="/zaklecia">Zaklęcia</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav{
  position: absolute;
  top: 10%;
  left: 45%;
}

</style>
