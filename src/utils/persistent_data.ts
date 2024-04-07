// 将数据持久化至localStorage中
// 保存用户信息
export const SAVE_USER_TOKEN = (userInfo: string) => {
  localStorage.setItem('USER_INFO', userInfo)
}

// 获取用户信息
export const GET_USER_TOKEN = () => {
  return localStorage.getItem('USER_INFO')
}

// 清楚持久化的用户数据
export const REMOVE_USER_INFO = () => {
  localStorage.removeItem('USER_INFO')
}
