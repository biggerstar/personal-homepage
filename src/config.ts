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
    },
    introduction: {
      icon: Avatar,
    },
    skill: {
      icon: Histogram,
    },
    project: {
      icon: Menu,
    },
    experience: {
      icon: Flag,
    },
    about: {
      icon: Opportunity,
    },
  }
}
