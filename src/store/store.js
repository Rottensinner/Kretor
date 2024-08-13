import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    name: '',
    clas: '',
    subClass: '',
    race: '',
    subRace: '',
    origin: '',
    classSkills: [],
    tmpClassSkills:[],
    selectedClassSkills: [],
    raceStats: [],
    subRaceStats: [],
    personStat: [],
    lvl: 1,  
    races: [],
    classes: [],
    origins: [],
    MaxSkills: 0,
  }),
  actions: {
    setName(name) {
      this.name = name;
    },
    setClass(clas) {
      this.clas = clas;
    },
    setSubClass(subClass) {
      this.subClass = subClass;
    },
    setRace(race) {
      this.race = race;
    },
    setSubRace(subRace) {
      this.subRace = subRace;
    },
    setOrigin(origin) {
      this.origin = origin;
    },
    setRaceStats(stats) {
      this.raceStats = stats;
    },
    setSubRaceStats(stats) {
      this.subRaceStats = stats;
    },
    setPersonStat(stats) {
      this.personStat = stats;
    },
    setLvl(lvl) {
      this.lvl = lvl;
    },
    setRaces(races) {
      this.races = races;
    },
    setClasses(classes) {
      this.classes = classes;
    },
    setOrigins(origins) {
      this.origins = origins;
    },
    setClassSkills(classSkills) { 
      if(this.tmpClassSkills.length === 0){
      this.tmpClassSkills = this.classSkills;
      }     
      this.classSkills = [...new Set([...this.classSkills, ...classSkills])];
    },
    setSelectedClassSkills(selectedClassSkills) {
      this.selectedClassSkills = selectedClassSkills;
    },
    setMaxSkills(MaxSkills){
      this.MaxSkills = MaxSkills;
    },
    resetClassSkills(){
      this.classSkills = [];
    },
    backClassSkills(){
      if(this.tmpClassSkills.length > 0){
      this.classSkills = this.tmpClassSkills;
      }
    }
  },
  getters: {
    getName: (state) => state.name,
    getClass: (state) => state.clas,
    getSubClass: (state) => state.subClass,
    getRace: (state) => state.race,
    getSubRace: (state) => state.subRace,
    getOrigin: (state) => state.origin,
    getRaceStats: (state) => state.raceStats,
    getSubRaceStats: (state) => state.subRaceStats,
    getPersonStat: (state) => state.personStat,
    getLvl: (state) => state.lvl,
    getRaces: (state) => state.races,
    getClasses: (state) => state.classes,
    getOrigins: (state) => state.origins,
    getClassSkills: (state) => state.classSkills,
    getSelectedClassSkills: (state) => state.selectedClassSkills,
    getMaxSkills: (state) => state.MaxSkills,

  }
});
