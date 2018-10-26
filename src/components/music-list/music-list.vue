<!--歌手详情页样式-->
<template>
  <div class=music-list>
    <!-- 返回键 -->
    <div class=back>
      <i class='icon-back'></i>
    </div>
    <!-- 主标题 -->
    <h1 class='title'
        v-html='title'></h1>
    <!-- 背景图 -->
    <div class=bg-image
         :style='bgStyle'
         ref='bgImage'>
      <div class=filter
           ref=filter></div>
    </div>
    <!-- 上拉下拉效果层 -->
    <div class=bg-layer
         ref=layer></div>
    <!-- 歌曲列表 -->
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
// 头部高度
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
    // 背景图
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
    // 因为图片的高度是百分比表示，故动态获得图片高度赋值给歌曲列表
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  methods: {
    // 监听歌曲列表滚动的位置，有scroll组件返回
    scroll(pos) {
      this.scrollY = pos.y
    }
  },
  watch: {
    // 监听位置
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