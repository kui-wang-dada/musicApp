<!-- 歌曲列表 -->
<template>
  <div class=song-list>
    <ul>
      <li v-for='(song,index) in songs'
          :key='index'
          @click='selectItem(song,index)'
          class=item>
        <!-- 加入rank适配 -->
        <div class="rank"
             v-show="rank">
          <span :class="getRankCls(index)"
                v-text="getRankText(index)"></span>
        </div>
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
    },
    rank: {
      type: Boolean,
      default: false
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
    },
    getRankCls(index) {
      if (index <= 2) {
        return `icon icon${index}`
      } else {
        return 'text'
      }
    },
    getRankText(index) {
      if (index > 2) {
        return index + 1
      }
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
    .rank {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 30px;
      text-align: center;
      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        &.icon0 {
          @include bg-image('first');
        }

        &.icon1 {
          @include bg-image('second');
        }

        &.icon2 {
          @include bg-image('third');
        }
      }

      .text {
        color: $color-theme;
        font-size: $font-size-large;
      }
    }

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
