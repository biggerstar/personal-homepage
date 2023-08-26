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
      stick: {
        desc: '欢迎',
        color: '#dcd1be'
      },
    },
    introduction: {
      icon: Avatar,
      stick: {
        desc: '介绍',
        color: '#dcd1be'
      },
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
