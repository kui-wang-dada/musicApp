<template>
    <div class='player'
         v-show='playlist.length>0'>
        <div v-show='fullScreen'
             class='normal-player'>
            <div class=back
                 @click='back'>点我回到歌曲列表</div>
        </div>
        <div v-show='!fullScreen'
             class='mini-player'>
            我是小化的播放器
        </div>
        <audio :src="currentSong.url"
               autoplay></audio>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  components: {},
  props: {},
  data() {
    return {
    }
  },
  watch: {

  },
  computed: {
    ...mapGetters([
      'playlist', 'fullScreen', 'currentSong'
    ])
  },
  created() {

  },
  mounted() {

  },
  methods: {
    back() {
      this.back()
    },
    ...mapActions([
      'back'
    ])
  }
}
</script>
<style scoped lang='scss'>
@import '~common/styles/variable';
@import '~common/styles/mixin';
.player {
  .normal-player {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: $color-background;
    @include dis-flex();
    .back {
      height: 50px;
      width: 160px;
      line-height: 50px;
      background: red;
    }
  }
  .mini-player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    @include dis-flex();
    background: $color-background;
  }
}
</style>