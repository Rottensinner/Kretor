<template>
  <div class="skills-container">
    <h2>Umiejętności Klasy</h2>
    <div v-if="classSkills.length > 0">
      <p v-for="skill in classSkills" :key="skill">
        <input
          type="checkbox"
          :value="skill"
          v-model="selectedSkills"
        >
        {{ skill }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { useMainStore } from '@/store/store.js';
import { computed, ref, watch } from 'vue';

const store = useMainStore();
const selectedSkills = ref([]);
const classSkills = computed(() => store.classSkills);
const MaxSkills = computed(() => store.MaxSkills)


watch(
  selectedSkills,
  () => {
    console.log("liczba MAXSkillsów:", MaxSkills.value);
    console.log("skille: ", selectedSkills.value);
  },
  { deep: true }
);
</script>


  <style scoped>
  .skills-container {
    text-align: center;
    font-family: Arial, sans-serif;
    position: absolute;
    left: 70%;
    top: 20%;
    width: 15%;
    height: 50%;
    font-size: 25px;
  }
  
  h2 {
    color: #d9d9d9;
  }
  
  p {
    text-align: left;
    font-size: 0.6em;
  }
  </style>
  