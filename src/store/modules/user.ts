import { login, MusicUrl } from '@/api/common';
import { checkValidate } from '@/util/libs';
import localforage from 'localforage';

interface State {
  info: any;
  audio: any;
}
interface Mutations<T, U> {
  [key: string]: (state: T, payload: U) => void;
}
export interface Store {
  state: State;
  // getters: Getters<State>;
  // 箭头函数定义
  commit: (type: string, payload: unknown) => void;
  // 普通函数定义
  dispatch(type: string, payload: unknown): void;
}
interface Actions<T, U> {
  [key: string]: (store: T, payload: U) => void;
}

const state: State = {
  info: {},
  audio: null
};
const mutations: Mutations<State, unknown> = {
  setUserInfo(state, info) {
    state.info = info;
  },
  setAudio(state, ref) {
    state.audio = ref;
  },
  setPlaySrc(state, src) {
    state.audio.src = src;
    setTimeout(() => {
      state.audio.play();
    }, 300);
  }
};
const actions: Actions<Store, unknown> = {
  Login(store, data) {
    const username = (data as { username: string }).username;
    const password = (data as { password: string }).password;
    const type = checkValidate(username);
    return new Promise((resolve, reject) => {
      login(username, password, type)
        .then((res: unknown) => {
          if ((res as { code: number }).code === 200) {
            localforage.setItem('userInfo', res);
            store.commit('setUserInfo', (res as { profile: unknown }).profile);
            resolve({
              msg: `${(res as { profile: any }).profile.nickname}登录成功！`
            });
          } else {
            reject(res);
          }
        })
        .catch(() => {
          reject({
            msg: '网络错误',
            code: 0
          });
        });
    });
  },
  Play({ commit }, { id }: any) {
    return new Promise((resolve, reject) => {
      MusicUrl(id).then((res: any) => {
        if (res.code === 200) {
          resolve(res.data);
          commit('setPlaySrc', res.data[0].url);
        } else {
          reject(res);
        }
      });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
