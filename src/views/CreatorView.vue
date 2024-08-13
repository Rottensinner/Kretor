<template>
    <div>
        <Personal/>
        <Stats/>
        <Skills></Skills>
        <button class="save" @click="saveCharacter">Save</button>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import Personal from '@/components/Personal.vue';
import Stats from '@/components/Stats.vue';
import Skills from '@/components/Skills.vue';

const person = reactive({});
const stats = reactive({
    STR: 8,
    ZRE: 8,
    KON: 8,
    INT: 8,
    MDR: 8,
    CHA: 8,
});

const saveCharacter = () => {
    // Functionality to save character
    console.log("Saving character:", { person, stats });
};
</script>

<style lang="css">
.save{
    position: absolute;
    left: 90%;
    top: 90%;
}
</style>
