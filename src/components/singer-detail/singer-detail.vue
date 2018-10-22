<template>
  <transition name='slide'>

    <scroll>
      <div class='singer-detail'>
        <div v-for='(item,index) in songList'
             class='song-item'
             @click='select(item)'
             :key='index'>
          <img :src="item.image"
               class='song-img'
               alt="">
          <p>{{item.name}}</p>
        </div>
        <audio :src="currentSong.url"
               autoplay
               class='audio'></audio>
      </div>

    </scroll>

  </transition>

</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {createSong} from 'common/js/song.js'
import Scroll from 'base/scroll/scroll'

export default {
  components: {Scroll},
  props: {},
  data() {
    return {
      songList: [],
      currentSong: ''
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getSingerDetail()
  },
  mounted() {

  },
  methods: {
    select(item) {
      this.currentSong = item
    },
    _getSingerDetail() {
      getSingerDetail(this.singer.id).then((res) => {
        this.songList = this._normalizeSong(res.data.list)
      })
    },
    _normalizeSong(list) {
      return list.map((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albummid) {
          return createSong(musicData)
        }
      })
    }
  },
  watch: {

  }
}
</script>
<style scoped lang='scss'>
@import '~common/styles/variable';
.singer-detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: $color-background;
  .song-item {
    display: flex;
    align-items: center;
    padding: 5px;
    .song-img {
      width: 50px;
      height: 50px;
    }
  }
  .audio {
    position: absolute;
    top: 300px;
  }
}

// vue的动画
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>