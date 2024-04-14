//自定义校验规则:手机号码自定义校验规则
const validatorMobile = (rule: any, value: any, callBack: any) => {
  //rule:即为表单校验规则对象
  //value:即为当前文本的内容
  //callBack:回调函数
  const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
  if (reg.test(value)) {
    callBack()
  } else {
    callBack(new Error('请输入正确的手机号码格式'))
  }
} //自定义校验规则:邮箱自定义校验规则
const validatorEmail = (rule: any, value: any, callBack: any) => {
  //rule:即为表单校验规则对象
  //value:即为当前文本的内容
  //callBack:回调函数
  const reg = /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/
  if (reg.test(value)) {
    callBack()
  } else {
    callBack(new Error('请输入正确的邮箱格式'))
  }
}
//验证码自定义校验规则
const validatorCode = (rule: any, value: any, callBack: any) => {
  //rule:即为表单校验规则对象
  //value:即为当前文本的内容
  //callBack:回调函数
  if (/^\d{6}$/.test(value)) {
    callBack()
  } else {
    callBack(new Error('请输入正确的验证码格式'))
  }
}
// 姓名校验
const validatorNickName = (rule: any, value: any, callback: any) => {
  if (value.length < 50) {
    callback()
  } else {
    callback(new Error('昵称最大程度为50'))
  }
}
// 照片是否上次
const validatorAvatar = (rule: any, value: any, callback: any) => {
  // 证件照校验
  if (value.length > 0) {
    callback()
  } else {
    callback(new Error('请上传头像'))
  }
}

export default {
  phone: [
    {
      // 手机号
      required: true,
      message: '请输入11位手机号'
    },
    {
      validator: validatorMobile,
      trigger: 'change'
    }
  ],
  code: [
    {
      // 验证码
      required: true,
      message: '请输入6位数字的验证码'
    },
    {
      validator: validatorCode,
      trigger: 'change'
    }
  ],
  email: [
    {
      // 邮箱
      required: false,
      message: '请输入正确格式的邮箱'
    },
    {
      validator: validatorEmail,
      trigger: 'change'
    }
  ],
  nickName: [
    {
      // 用户姓名校验，只需要存在即可
      required: false
    },
    {
      validator: validatorNickName,
      trigger: 'change'
    }
  ],
  avatar: [
    {
      required: false,
      message: '请上传头像'
    },
    {
      validator: validatorAvatar,
      trigger: 'change'
    }
  ],
  sex: [
    {
      required: true,
      message: '请选择性别'
    }
  ]
}
