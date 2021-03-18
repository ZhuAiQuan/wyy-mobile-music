<template>
  <div class="home"></div>
</template>

<script lang="ts">
// import { Options, Vue } from "vue-class-component";
// import localforage from 'localforage'

// @Options({
//   mounted() {
//     localforage.setItem('test', [1, {s: 'm'}, false, []])
//     localforage.getItem('test').then((val) => {
//       console.log(val)
//     })
//   }
// })
// export default class Home extends Vue {}
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'home',
  setup() {
    return {};
  }
});
</script>
