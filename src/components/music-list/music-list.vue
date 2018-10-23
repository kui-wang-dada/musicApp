<!--歌手详情页样式-->
<template>
    <div class=music-list>
        <div class=back>
            <i class='icon-back'></i>
        </div>
        <h1 class='title'
            v-html='title'></h1>
        <div class=bg-image
             :style='bgStyle'
             ref='bgImage'>
            <div class=filter
                 ref=filter></div>
        </div>
        <div class=bg-layer
             ref=layer></div>
        <scroll :data='songs'
                @scroll='scroll'
                :probe-type='probeType'
                :listen-scroll='listenScroll'
                class='list'
                ref='list'>
            <div class=song-list-wrapper>
                <song-list :songs="songs"></song-list>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'

const RESERVED_HEIGHT = 40
export default {
  components: {Scroll, SongList},
  props: {
    //   背景图
    bgImage: {
      type: String,
      default: ''
    },
    // 歌曲列表
    songs: {
      type: Array,
      default: () => []
    },
    // 歌手title
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scrollY: 0
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  created() {
    // 组件不双向绑定的变量
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y
    }
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTranslateY, newY)
      this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
      this.$refs.layer.style['webkitTransform'] = `translate3d(0,${translateY}px,0)`
    }
  }
}
</script>
<style scoped lang='scss'>
@import '~common/styles/variable';
@import '~common/styles/mixin';

.music-list {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: $color-background;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    .song-list-wrapper {
      padding: 20px 30px;
    }
  }
}
</style>