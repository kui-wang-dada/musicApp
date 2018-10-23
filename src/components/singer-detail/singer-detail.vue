<template>
  <transition name='slide'>
    <music-list :songs='songList'
                :title='title'
                :bgImage='bgImage'></music-list>
  </transition>

</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {createSong} from 'common/js/song.js'
import MusicList from 'components/music-list/music-list'

export default {
  components: {MusicList},
  props: {},
  data() {
    return {
      songList: [],
      currentSong: ''
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
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
      if (!this.singer.id) {
        this.$router.push('/singer')
      }

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