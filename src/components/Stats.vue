<template>
    <div class="container">
      <h2>Staty</h2>
      <h4>Punkty statystyk {{statPoint}}</h4>
      <div v-for="(value, key) in stats" :key="key" class="stat-item">
        <button @click="decreaseStat(key)" class="stat-button">-</button>
        <div class="stat-value">
          {{ key }} : {{ value +(raceStats[key] || 0)+(subRaceStats[key] || 0) }}
        </div>
       
        <button @click="increaseStat(key)" class="stat-button">+</button>
      </div>
    </div>
  </template>
  
  <script setup>
import { computed, reactive, ref,  watch } from 'vue';
import { useMainStore } from '@/store/store.js';
  const store = useMainStore();
  const statPoint = ref( 27 );
  const raceStats = computed(() => store.raceStats);
  const subRaceStats = computed(() => store.subRaceStats);

  const stats = reactive({
    STR: 8,
    DEX: 8,
    CON: 8,
    INT: 8,
    WIS: 8,
    CHA: 8,
  });
  
  const increaseStat = (key) => {

    if ((stats[key] < 13 && stats[key] >= 8) && statPoint.value >0) {
      stats[key]++;
      statPoint.value--;
    }else if(stats[key]>=13 && stats[key]<15 && statPoint.value >1){
      stats[key]++;
      statPoint.value-=2;
    }
  };
  
  const decreaseStat = (key) => {
    if (stats[key] > 8 && stats[key]<14) {
      stats[key]--;
      statPoint.value++;
    }else if(stats[key]<=15 && stats[key]>13){
      stats[key]--;
      statPoint.value+=2;
    }
  };
    watch(raceStats, (newRaceStats) =>{
      console.log('New Race Stats:', newRaceStats);
    })

  </script>
  
  <style scoped>
  .container {
    text-align: center;
    font-family: Arial, sans-serif;
    position: absolute;
    left: 40%;
    top: 20%;
    width: 15%;
    height: 50%;
    font-size: 25px;

  }
  
  h2 {
    color: #d9d9d9;
  }
  
  .stat-item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }
  
  .stat-button {
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 0 10px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .stat-button:hover {
    background-color: #8b8b8b;
  }
  
  .stat-value {
    font-size: 18px;
    color: #d9d9d9;
    min-width: 120px;
    text-align: center;
  }
  </style>
  