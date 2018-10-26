<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <audio :src="currentSong"
           autoplay></audio>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  },
  components: {
    MHeader,
    Tab
  }
}
</script>

<style scoped lang='scss'>
@import 'common/styles/variable.scss';
#app {
  color: $color-theme;
}
</style>
