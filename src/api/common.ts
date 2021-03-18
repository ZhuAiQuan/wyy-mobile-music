import axios from '@/util';

interface LoginData {
  password: string;
  email?: string;
  phone?: string;
}
/**
 *
 * @param username
 * @param password
 * @param type type === 1 手机登录 type === 2 邮箱登录 type === 3 二维码登录（暂未）
 * @returns
 */
export const login = (username: string, password: string, type: number) => {
  let url = '';
  const data: LoginData = {
    password
  };
  if (type === 1) {
    url = '/login/cellphone';
    data.phone = username;
  } else if (type === 2) {
    url = '/login';
    data.email = username;
  }
  return axios.request({
    url,
    method: 'post',
    data
  });
};
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const subcount = () => {
  return axios.request({
    url: '/user/subcount',
    method: 'get',
    params: {
      timestamp: new Date().getTime()
    }
  });
};
// 获取用户歌单
export const getUserPlayList = (uid: number, offset = 1, limit = 30) => {
  return axios.request({
    url: '/user/playlist',
    method: 'post',
    data: {
      uid,
      offset: (offset - 1) * limit,
      limit
    },
    params: {
      timestamp: new Date().getTime()
    }
  });
};

export const PlayListDetail = (id: number) => {
  return axios.request({
    url: '/playlist/detail',
    method: 'post',
    data: {
      id
    },
    params: {
      timestamp: new Date().getTime()
    }
  });
};
// 获取音乐 url
export const MusicUrl = (id: number, br = 320000) => {
  return axios.request({
    url: '/song/url',
    method: 'post',
    data: {
      id,
      br
    },
    params: {
      timestamp: new Date().getTime()
    }
  });
};
// 音乐是否可用
export const checkMusic = (id: number, br = 320000) => {
  return axios.request({
    url: '/check/music',
    method: 'post',
    data: {
      id,
      br
    },
    params: {
      timestamp: new Date().getTime()
    }
  });
};
