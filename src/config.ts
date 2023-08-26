import {Avatar, Flag, Histogram, HomeFilled, Menu, Opportunity} from "@element-plus/icons-vue";

export default {
  profile: {
    avatarUrl: '/images/biggerstar.png',
    username: 'Biggerstar',
    occupation: '前端工程师',
    contactMe: {
      github: 'https://github.com/biggerstar',
      email: '1458048116@qq.com',
      qq: '1458048116',
    }
  },
  page: {
    welcome: {
      icon: HomeFilled,
      title: 'Welcome',
      desc: '欢迎来到我的主页',
    },
    introduction: {
      icon: Avatar,
      stick: {
        desc: '简介',
        color: '#d3ccd6'
      },
      personInfoTitle: '个人信息',
      personInfo: [
        {
          type: '名称',
          desc: 'Biggerstar'
        },
        {
          type: '性别',
          desc: '男娃子'
        },
        {
          type: '岗位',
          desc: '前端工程师'
        },
        {
          type: '地址',
          desc: '福建 • 厦门'
        },
        {
          type: '电话',
          desc: '15159669885'
        },
        {
          type: '邮箱',
          desc: '1458048116@qq.com'
        },
      ],
      personDescTitle: '个人介绍',
      desc: [
        '大家好，我是一名热爱编程的前端程序员。',
        '我有多年的编程经验，擅长多种编程语言和技术栈。',
        '我有良好的分析和解决问题的能力。',
        '我热衷于解决问题和创造创新的解决方案。',
        '我喜欢挑战自己，并且不断关注前端发展动态和学习掌握前端新的技术。',
        '我是一名有着代码 强迫症 的程序员，我注重代码的质量和可维护性，始终保持代码的清晰、易读和可扩展。',
      ],
      personTagsTitle: '个人标签',
      tags: [
        '搬砖小能手',
        '熬夜小能手',
        '咖啡爱好者',
        '英语苦手',
        '开源爱好者',
        'API大师',
        '学无止境',
        '完美主义',
        '喜欢造轮子的基建狂魔',
        '代码强迫症',
        '精通各语言Hello World',
      ]
    },
    skill: {
      icon: Histogram,
      stick: {
        desc: '技能',
        color: '#dcd1be'
      },
    },
    project: {
      icon: Menu,
      stick: {
        desc: '项目',
        color: '#B8CCE3'
      },
    },
    experience: {
      icon: Flag,
      stick: {
        desc: '经历',
        color: '#ACCCC1'
      },
    },
    about: {
      icon: Opportunity,
      stick: {
        desc: '关于',
        color: '#ebe3c7'
      },
    },
  }
}
