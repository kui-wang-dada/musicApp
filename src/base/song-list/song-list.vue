<!-- 歌曲列表 -->
<template>
  <div class=song-list>
    <ul>
      <li v-for='(song,index) in songs'
          :key='index'
          @click='selectItem(song,index)'
          class=item>
        <div class='content'>
          <h2 class='name'>{{song.name}}</h2>
          <p class='desc'>{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  watch: {

  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    getDesc(song) {
      return `${song.singer}·${song.album}`
    },
    selectItem(song, index) {
      this.$emit('selectItem', song, index)
    }
  }
}
</script>
<style scoped lang='scss'>
@import '~common/styles/variable';
@import '~common/styles/mixin';

.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;

    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;

      .name {
        @include no-wrap();
        color: $color-text;
      }

      .desc {
        @include no-wrap();
        color: $color-text-d;
        margin-top: 4px;
      }
    }
  }
}
</style>
