<template>
  <van-divider>登录</van-divider>
  <van-form @submit="onSubmit">
    <van-field
      v-model="state.username"
      name="username"
      label="账号"
      placeholder="手机号/邮箱"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="state.password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';

interface State {
  username: string;
  password: string;
}
interface ResultCode {
  msg: string;
  message?: string;
}

export default defineComponent({
  name: 'login',
  setup() {
    const store = useStore();
    const router = useRouter();
    const state: State = reactive({
      username: '',
      password: ''
    });
    const onSubmit = (val: State): void => {
      // 提交
      store
        .dispatch('Login', val)
        .then((result: ResultCode) => {
          Toast.success(result.msg);
          router.push('/own');
        })
        .catch((result: ResultCode) => {
          Toast.fail(result.msg);
        });
    };
    return {
      state,
      onSubmit
    };
  }
});
</script>

<style lang="less" scoped>
div {
  height: auto;
}
</style>
