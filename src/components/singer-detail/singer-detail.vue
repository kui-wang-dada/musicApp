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
      // 歌曲列表
      songList: [],
      // 默认播放歌曲
      currentSong: ''
    }
  },
  computed: {
    // 歌手详情页标题
    title() {
      return this.singer.name
    },
    // 歌手详情页背景图
    bgImage() {
      return this.singer.avatar
    },
    // vuex的get方法
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    // 抓取数据
    this._getSingerDetail()
  },
  mounted() {

  },
  methods: {
    // 切歌
    select(item) {
      this.currentSong = item
    },
    // 边界处理
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
      // 获取歌曲列表并对数据进行处理
      getSingerDetail(this.singer.id).then((res) => {
        this.songList = this._normalizeSong(res.data.list)
      })
    },
    // 处理接口返回的数据为我们需要的样式结构
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