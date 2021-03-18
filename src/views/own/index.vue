<template>
  <div class="content">
    <div class="ctx">
      <div class="head">
        <van-image
          width="50px"
          height="50px"
          round
          :src="info.avatarUrl"
          class="avator"
        />
        <div class="head-title">{{ info.nickname }}</div>
        <span>{{ info.signature }}</span>
      </div>
      <van-search
        v-model="keywords"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
      <div class="coll">
        <div v-for="(item, i) in Object.keys(subCount)" :key="item">
          <van-icon :name="icon[i]" size="30"></van-icon>
          <span>{{ subCount[item] }}</span>
        </div>
      </div>
      <div class="play-list">
        <div
          class="play-ctx"
          v-for="item in info.playList"
          :key="item.id"
          @click="$router.push(`/playListDetail/${item.id}`)"
        >
          <div class="play-ctx-avator">
            <van-image
              width="50"
              height="50"
              lazy-load
              :src="item.coverImgUrl"
            />
          </div>
          <div class="play-ctx-content">
            <div>{{ item.name }}</div>
            <div>{{ item.description }}</div>
          </div>
          <div class="play-ctx-ctime">
            {{ item.createTime }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-content"
      :style="{ 'background-image': `url(${info.backgroundUrl})` }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import localforage from 'localforage';
import { subcount, getUserPlayList } from '@/api/common';
import { resetDate } from '@/util/libs';

interface UserInfo<T> {
  [propName: string]: T;
}

export default defineComponent({
  name: 'own-info',
  setup() {
    const info: UserInfo<unknown> = reactive({
      playList: [
        {
          coverImgUrl:
            'https://p1.music.126.net/Rn66mjPk6JABc0gKLXP9GA==/109951165596188360.jpg',
          name: 'item.name',
          userId: 'item.userId',
          id: 14934193,
          description: 'item.description',
          createTime: 1401199049240
        }
      ]
    });
    /**
     * artistCount 关注歌手数量
     * createDjRadioCount 个人电台
     * createdPlaylistCount 创建歌单数量
     * djRadioCount 收藏播单
     * mvCount 收藏MV数量
     * newProgramCount 收藏专辑数量
     * programCount
     * subPlaylistCount 收藏歌单
     */
    const subCount: UserInfo<number> = reactive({
      artistCount: 0,
      createDjRadioCount: 0,
      createdPlaylistCount: 0,
      djRadioCount: 0,
      mvCount: 0,
      newProgramCount: 0,
      programCount: 0,
      subPlaylistCount: 0
    });
    const icon: string[] = [
      'fire-o',
      'cluster-o',
      'label-o',
      'goods-collect-o',
      'video-o',
      'flower-o',
      'brush-o',
      'apps-o'
    ];
    const keywords = ref('');

    localforage.getItem('userInfo').then((data: any) => {
      for (const item in data.profile) {
        info[item] = data.profile[item];
      }
      info.id = data.account.id;
      getUserList(+(info as { id: number }).id);
    });

    const getSubCount = () => {
      subcount().then((res: unknown) => {
        if ((res as { code: number }).code === 200) {
          for (const item in subCount) {
            subCount[item] = (res as UserInfo<number>)[item];
          }
        }
      });
    };
    const onSearch = (val: string) => {
      console.log(val);
    };
    // 获取用户播放列表
    function getUserList(uid: number): void {
      getUserPlayList(uid).then((res: unknown) => {
        if ((res as { code: number }).code === 200) {
          info.playList = (res as { playlist: any[] }).playlist.map(
            (item: any) => {
              return {
                coverImgUrl: item.coverImgUrl,
                name: item.name,
                userId: item.userId,
                id: item.id,
                description: item.description,
                createTime: resetDate(item.createTime)
              };
            }
          );
        }
      });
    }

    onMounted(() => {
      getSubCount();
    });

    return {
      info,
      subCount,
      icon,
      keywords,
      onSearch,
      resetDate
    };
  }
});
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  width: 100%;
  position: relative;
  .bg-content {
    height: 100%;
    width: 100%;
    background-size: cover;
    filter: blur(3px);
    position: absolute;
    top: 0;
    z-index: 0;
  }
  .ctx {
    z-index: 99;
    color: #fff;
    position: relative;
    padding-top: 30px;
    height: 100%;
    padding-bottom: 50px;
    .head {
      margin: 0 10px 0 10px;
      background: #ffffff80;
      min-height: 50px;
      border-radius: 5px;
      text-align: left;
      position: relative;
      padding-left: 60px;
      .avator {
        position: absolute;
        top: -20px;
        left: 5px;
      }
      &-title {
        position: relative;
        top: -8px;
      }
      & > span:last-child {
        font-size: 12px;
      }
    }
    .coll {
      background: #ffffff90;
      margin: 0 10px 10px 10px;
      min-height: 50px;
      border-radius: 5px;
      display: flex;
      flex-wrap: wrap;
      & > div {
        width: 25%;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        & > i,
        & > span {
          width: 100%;
        }
        span {
          margin-top: 5px;
          font-size: 12px;
        }
      }
    }
    .van-search {
      background-color: transparent;
    }
    .play-list {
      margin: 10px;
      height: calc(100% - 252px);
      overflow-y: auto;
      .play-ctx {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
        background: #ffffff90;
        border-radius: 5px;
        .play-ctx-ctime {
          font-size: 12px;
          display: flex;
          align-items: center;
        }
        .play-ctx-content {
          width: calc(100% - 170px);
          padding: 0 10px;
          div {
            height: 50%;
            display: flex;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &:first-child {
              align-items: flex-end;
              font-weight: 500;
              font-size: 12px;
            }
            &:last-child {
              font-size: 12px;
            }
          }
        }
        .play-ctx-avator {
          .van-image {
            display: block;
          }
        }
      }
    }
  }
}
</style>
