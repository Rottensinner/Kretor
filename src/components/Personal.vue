<template>
    <div class="personal">
        <div>
            <div class="name">
                <label for="label">Imię</label>
                <input class="nameInput" type="text" v-model="person.name" id="name">
                <label for="label">Poziom: </label>
            </div>
            <div class="race">
                <div class="inRace">
                    <label for="label">Rasa:</label>
                    <select name="race" id="races" class="raseSelect" v-model="person.race">
                        <option v-for="race in races" :key="race.Name" :value="race.Name">{{race.Name}}</option>
                    </select>
                </div>
                <div class="inRace" v-if="selectedRace">
                    <label for="label">Podrasa:</label>
                    <select name="subrace" id="subraces" v-model="person.subrace">
                        <option v-for="subrace in selectedRace.Subraces" :key="subrace.Name" :value="subrace.Name">{{subrace.Name}}</option>
                    </select>
                </div>
            </div>
            <div class="Class">
                <div class="inClass">
                    <label for="label">Klasa:</label>
                    <select name="Class" id="Classes" class="ClassSelector" v-model="person.class">
                        <option v-for="cls in classes" :key="cls.Name" :value="cls.Name">{{cls.Name}}</option>
                    </select>
                </div>
                <div class="inClass" v-if="selectedClass">
                    <label for="label">Podklasa:</label>
                    <select name="subClass" id="subClass" v-model="person.subClass">
                        <option v-for="subClass in selectedClass.Subclasses" :key="subClass.Name" :value="subClass.Name">{{subClass.Name}}</option>
                    </select>
                </div>
            </div>
            <div class="origin">
                <label for="label">Pochodzenie:</label>
                <select name="origin" id="origin" v-model="person.origin">
                    <option v-for="origin in origins" :key="origin.Name" :value="origin.Name">{{origin.Name}}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed, watch, onMounted } from 'vue';

const person = reactive({
    name: '',
    race: '',
    subrace: '',
    class: '',
    subClass: '',
    origin: '',
});

const races = reactive([]);
const classes = reactive([]);
const origins = reactive([]);

const selectedRace = computed(() => {
    return races.find(race => race.Name === person.race);
})

const selectedClass = computed(() => {
    return classes.find(cls => cls.Name === person.class);
})
const selectedOrigin = computed(() => {
    return origins.find(origin => origin.Name === person.origin);
})

onMounted( async () => {
    try {
        const response = await fetch('http://localhost:3000/Races');
        const data = await response.json();
        races.push(...data);

        const classResponse = await fetch('http://localhost:3000/Classes');
        const classData = await classResponse.json();
        classes.push(...classData);

        const originResponse = await fetch('http://localhost:3000/Origins'); 
        const originData = await originResponse.json();
        origins.push(...originData);
    } catch (error) {
        console.error("Błąd wczytywania JSON: ",error)
    }
});

watch(person, (newPerson) => {
    console.log('Changes detected:', newPerson);
}, { deep: true });
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
