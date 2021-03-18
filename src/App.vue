<template>
  <router-view />
  <audio style="display: none" id="audio" ref="audio" src=""></audio>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'APP',
  setup() {
    const audio = ref(null);
    const store = useStore();
    onMounted(() => {
      store.commit('setAudio', audio.value);
    });
    return {
      audio
    };
  }
});
</script>
