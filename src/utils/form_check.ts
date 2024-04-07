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
//密码长度为6~16位
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length > 16 || value.length < 6) {
    callback(new Error('密码长度为6~16位'))
  } else {
    callback()
  }
}
// 姓名校验
const validatorName = (rule: any, value: any, callback: any) => {
  const reg =
    /^(\u3007|[\u3400-\u9FFF]|[\uE000-\uF8FF]|[\uD840-\uD87F][\uDC00-\uDFFD]|[\uD880-\uD8BF][\uDC00-\uDFFD])+(\u00B7(\u3007|[\u3400-\u9FFF]|[\uE000-\uF8FF]|[\uD840-\uD87F][\uDC00-\uDFFD]|[\uD880-\uD8BF][\uDC00-\uDFFD])+)*$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入中国人姓名'))
  }
}
// 证件类型校验
const validatorCertificateType = (rule: any, value: any, callback: any) => {
  if (value == '10' || value == '20') {
    callback()
  } else {
    callback(new Error('请选择证件类型'))
  }
}
// 证件号码校验
const validatorCertificateNo = (rule: any, value: any, callback: any) => {
  // 身份证号码校验
  const cardReg =
    /^[1-9][0-9]{5}(18|19|20)[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])[0-9]{3}([0-9]|X)$/
  const bookReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  // 户口本号码校验
  if (cardReg.test(value) || bookReg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的身份证号码或户口本号码'))
  }
}
// 证件照是否上传校验
const validatorCertificateUrl = (rule: any, value: any, callback: any) => {
  // 证件照校验
  if (value.length > 0) {
    callback()
  } else {
    callback(new Error('请上传证件照'))
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
  contactsPhone: [
    {
      validator: validatorMobile,
      trigger: 'change'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入6位验证码'
    },
    {
      validator: validatorCode,
      trigger: 'change'
    }
  ],
  name: [
    {
      // 用户姓名校验，只需要存在即可
      required: true,
      message: '请输入中国人姓名'
    },
    {
      validator: validatorName,
      trigger: 'change'
    }
  ],
  contactsName: [
    {
      validator: validatorName,
      trigger: 'change'
    }
  ],
  certificatesType: [
    {
      // 证件类型校验，不仅需要存在、还需符合国内姓名规则
      required: true,
      message: '请选择证件类型'
    },
    {
      validator: validatorCertificateType,
      trigger: 'change'
    }
  ],
  contactsCertificatesType: [
    {
      validator: validatorCertificateType,
      trigger: 'change'
    }
  ],
  contactsCertificatesNo: [
    {
      validator: validatorCertificateNo,
      trigger: 'change'
    }
  ],
  certificatesNo: [
    {
      // 证件类型校验，不仅需要存在、还需符合国内证件号规则
      required: true,
      message: '请输入正确的身份证号码或户口本号码'
    },
    {
      validator: validatorCertificateNo,
      trigger: 'change'
    }
  ],
  certificatesUrl: [
    {
      required: true,
      message: '请上传证件照'
    },
    {
      validator: validatorCertificateUrl,
      trigger: 'change'
    }
  ],
  birthdate: [
    {
      required: true,
      message: '请选择出生日期'
    }
  ],
  address: [
    {
      required: true,
      message: '请输入详细地址'
    }
  ],
  addressSelected: [
    {
      required: true,
      message: '请选择当前住址'
    }
  ],
  isMarry: [
    {
      required: true,
      message: '请选择婚姻状况'
    }
  ],
  isInsure: [
    {
      required: true,
      message: '请选择医保类型'
    }
  ],
  sex: [
    {
      required: true,
      message: '请选择性别'
    }
  ]
}
