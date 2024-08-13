<template>
  <div class="personal">
    <div>
      <div class="name">  
        <label for="name">Imię</label>
        <input class="nameInput" type="text" v-model="name" id="name">
        <label for="level">Poziom:</label>
        <input type="number" v-model="lvl" min="1" max="20" id="level">
      </div>
      <div class="race">
        <div class="inRace">
          <label for="races">Rasa:</label>
          <select name="race" id="races" class="raceSelect" v-model="race">
            <option v-for="race in allRaces" :key="race.Name" :value="race.Name">{{ race.Name }}</option>
          </select>
        </div>
        <div class="inRace" v-if="selectedRace">
          <label for="subraces">Podrasa:</label>
          <select name="subrace" id="subraces" v-model="subRace">
            <option v-for="subrace in selectedRace.Subraces" :key="subrace.Name" :value="subrace.Name">{{ subrace.Name }}</option>
          </select>
        </div>
      </div>
      <div class="Class">
        <div class="inClass">
          <label for="Classes">Klasa:</label>
          <select name="Class" id="Classes" class="ClassSelector" v-model="clas">
            <option v-for="cls in allClasses" :key="cls.Name" :value="cls.Name">{{ cls.Name }}</option>
          </select>
        </div>
        <div class="inClass" v-if="canShowSubClass">
          <label for="subClass">Podklasa:</label>
          <select name="subClass" id="subClass" v-model="subClass">
            <option v-for="subClass in selectedClass.Subclasses" :key="subClass.Name" :value="subClass.Name">{{ subClass.Name }}</option>
          </select>
        </div>
      </div>
      <div class="origin">
        <label for="origin">Pochodzenie:</label>
        <select name="origin" id="origin" v-model="origin">
          <option v-for="origin in allOrigins" :key="origin.Name" :value="origin.Name">{{ origin.Name }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch, onMounted } from 'vue';
import { useMainStore } from '@/store/store.js';
import Skills from '@/components/Skills.vue';

const store = useMainStore();

const name = computed({
  get: () => store.name,
  set: (value) => store.setName(value),
});
const clas = computed({
  get: () => store.clas,
  set: (value) => store.setClass(value),
});
const subClass = computed({
  get: () => store.subClass,
  set: (value) => store.setSubClass(value),
});
const race = computed({
  get: () => store.race,
  set: (value) => store.setRace(value),
});
const subRace = computed({
  get: () => store.subRace,
  set: (value) => store.setSubRace(value),
});
const origin = computed({
  get: () => store.origin,
  set: (value) => store.setOrigin(value),
});
const lvl = computed({
  get: () => store.lvl,
  set: (value) => store.setLvl(value),
});

const allRaces = reactive([]);
const allClasses = reactive([]);
const allOrigins = reactive([]);

const selectedRace = computed(() => {
  return allRaces.find(race => race.Name === store.race);
});
const selectedSubRace = computed(() => {
  return selectedRace.value?.Subraces.find(subrace => subrace.Name === store.subRace);
});

const selectedClass = computed(() => {
  return allClasses.find(cls => cls.Name === store.clas);
});

const canShowSubClass = computed(() => {
  return selectedClass.value && store.lvl >= selectedClass.value.LevelSubclass;
});

const selectedOrigin = computed(() => {
  return allOrigins.find(origin => origin.Name ===store.origin)
})

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/Races');
    const data = await response.json();
    allRaces.push(...data);

    const classResponse = await fetch('http://localhost:3000/Classes');
    const classData = await classResponse.json();
    allClasses.push(...classData);

    const originResponse = await fetch('http://localhost:3000/Origins');
    const originData = await originResponse.json();
    allOrigins.push(...originData);
  } catch (error) {
    console.error("Błąd wczytywania JSON: ", error);
  }
});

watch(() => lvl.value, (newLevel) => {
  if (selectedClass.value && newLevel < selectedClass.value.LevelSubclass) {
    store.setSubClass('');
  }
});

watch(selectedRace, (newRace) => {
  if (newRace) {
    store.setRaceStats(newRace.Attributes);
    store.setSubRace('');
    store.setSubRaceStats({});
  }
});

watch(selectedSubRace, (newSubRace) => {
  if (newSubRace) {
    store.setSubRaceStats(newSubRace.Attributes);
    console.log(store.subRaceStats);
  }
});

watch(selectedClass, (newClass) => {
  if (newClass) {
    store.resetClassSkills();
    store.setClassSkills(newClass.ClassSkills);
    store.setMaxSkills(newClass.MaxSkills)
    console.log(newClass.MaxSkills);
  }
});
watch(selectedOrigin, (newOrigin) =>{
  if(newOrigin ){
    store.backClassSkills();
    store.setClassSkills(newOrigin.Skills)
  }
})

</script>

<style scoped>
.personal {
  position: absolute;
  left: 10%;
  top: 20%;
  width: 15%;
  height: 50%;
  font-size: 25px;
}
label {
  position: relative;
}
.nameInput {
  top: 10%;
  font-size: 25px;
}
.race {
  position: relative;
  padding-right: 15%;
  left: 0%;
  top: 30%;
  font-size: 25px;
}
.inRace {
  width: 50%;
  display: inline-block;
}
.Class {
  position: relative;
  padding-right: 15%;
  left: 0%;
  top: 30%;
  font-size: 25px;
}
.inClass {
  width: 50%;
  display: inline-block;
}
.origin {
  position: relative;
  left: 0%;
  top: 20%;
  width: 15%;
  height: 5%;
  font-size: 25px;
}
</style>
