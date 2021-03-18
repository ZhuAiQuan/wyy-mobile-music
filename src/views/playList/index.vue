<template>
  <van-nav-bar
    title="歌单详情"
    left-text="返回"
    left-arrow
    @click-left="$router.go(-1)"
  />
  <div
    class="head-bg"
    :style="{
      'background-image': `url(${info.playList.creator.backgroundUrl})`
    }"
  >
    <van-image width="80" height="80" :src="info.playList.coverImgUrl" />
    <div class="description">
      <div class="title">
        <strong>{{ info.playList.name }}</strong>
      </div>
      <p>简介: {{ info.playList.description }}</p>
    </div>
  </div>
  <div class="song-opera">
    <van-button round type="primary" icon="play-circle-o" @click="playAll"
      >播放全部</van-button
    >
    <!-- <div class="song-sort">
      <van-icon name="arrow-up" />升序
    </div> -->
  </div>
  <van-cell-group>
    <van-cell
      :title="item.song"
      :value="i"
      :label="`${item.artist}${item.album ? ' - ' : ''}${item.album}`"
      v-for="(item, i) in info.privileges"
      :key="item.id"
      @click="onPlay(item.id)"
    />
  </van-cell-group>
  <!-- <div>detail --- {{ $route.params.id }}</div> -->
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { PlayListDetail } from '@/api/common';
import { useStore } from 'vuex';
import { Toast } from 'vant';

interface Info {
  playList: any;
  privileges: Privileges[];
}
interface Privileges {
  id: number;
  album: string;
  artist: string;
  song: string;
  songId: number;
  userId: number;
}

export default defineComponent({
  name: 'play-list-detail',
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const store = useStore();
    const info: Info = reactive({
      playList: {
        creator: {
          backgroundUrl: ''
        },
        coverImgUrl: '',
        name: '',
        description: ''
      },
      privileges: []
    });

    function getDetail(id: string) {
      PlayListDetail(+id).then((res: any) => {
        if (res.code === 200) {
          console.log(res);
          info.playList = res.playlist;
          info.privileges = res.privileges
            .map((item: any) => {
              if (item.pc) {
                return {
                  id: item.id,
                  album: item.pc.album,
                  artist: item.pc.artist,
                  song: item.pc.song,
                  songId: item.pc.songId,
                  userId: item.pc.userId
                };
              }
            })
            .filter((item: any) => item);
        }
      });
    }
    function onPlay(id: number) {
      store.dispatch('Play', { id }).then((res: any) => {
        console.log(res);
      });
    }
    function playAll() {
      Toast('暂未开发！');
    }

    onMounted(() => {
      getDetail(props.id);
    });

    return {
      info,
      onPlay,
      playAll
    };
  }
});
</script>

<style lang="less" scoped>
.head-bg {
  min-height: 200px;
  background-size: cover;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  .description {
    padding-left: 10px;
    color: #fff;
    width: calc(100% - 80px);
    text-align: left;
    .title {
      font-size: 14px;
      line-height: 26px;
    }
    p {
      font-size: 12px;
      text-align: left;
    }
  }
}
.song-opera {
  margin: 10px;
  // border: 1px solid #333;
  // border-color: #33333350;
  border-radius: 3px;
  text-align: left;
  .song-sort {
    float: right;
  }
}
.van-cell-group {
  text-align: left;
}
</style>
