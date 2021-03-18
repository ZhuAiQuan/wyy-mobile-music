/**
 * @param str 传入的登录账号 判断是邮箱还是手机号
 * @returns
 */
export const checkValidate = (str: string): number => {
  const regEmail = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
  const regPhone = /^1[3456789]\d{9}$/;
  if (regPhone.test(str)) return 1;
  else if (regEmail.test(str)) return 2;
  else return 0;
};

/**
 *
 * @param timestramp 传入的时间戳
 * @returns 返回时间格式
 */
export const resetDate = (timestramp: number): string => {
  const time = new Date(timestramp);
  const now = new Date();
  const y = time.getFullYear();
  const M = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();

  const ny = now.getFullYear();
  const nM = now.getMonth() + 1;
  const nd = now.getDate();
  const nh = now.getHours();
  const nm = now.getMinutes();
  const ns = now.getSeconds();

  const mon = M > 10 ? `${M}` : `0${M}`;
  const day = d > 10 ? `${d}` : `0${d}`;
  const hour = h > 10 ? `${h}` : `0${h}`;
  const min = m > 10 ? `${m}` : `0${m}`;
  const second = s > 10 ? `${s}` : `0${s}`;

  if (ny === y) {
    if (M === nM) {
      if (d === nd) {
        if (h === nh) {
          if (m === nm) {
            if (s === ns) {
              return '刚刚';
            } else return `${ns - s}秒前`;
          } else return `${nm - m}分钟前`;
        } else {
          return `${nh - h}个小时前`;
        }
      } else {
        return `${nd - d}天前`;
      }
    } else {
      return `${nM - m}个月前`;
    }
  } else {
    return `${y}-${mon}-${day} ${hour}:${min}:${second}`;
  }
};
