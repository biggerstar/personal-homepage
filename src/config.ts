import {Avatar, Histogram, HomeFilled, Menu, Opportunity} from "@element-plus/icons-vue";

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
          desc: '1515***9885'
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
      /* 前端技能分布模块配置 */
      skillBarChart: {
        title: {
          text: '前端技能分布图',
          left: 'center',
        },
        visualMap: {
          text: ['精通', '小白'],
          inRange: {
            color: ['#aed0ee', '#2ecc71', '#f9ca24', '#FD665F']
          },
        },
        x: {
          category: ['小白', '了解', '熟悉', '掌握', '熟练', '精通']
        },
        y: {
          data: [
            {value: 90, skill: 'Javascript'},
            {value: 76, skill: 'Node.js'},
            {value: 76, skill: 'TypeScript'},
            {value: 74, skill: 'Vue2/Vue3'},
            {value: 70, skill: 'Vite/Rollup'},
            {value: 68, skill: 'Sass/Less/Css3'},
            {value: 60, skill: 'Element-plus/Antd'},
            // {value: 56, skill: 'Express'},
          ]
        }
      },
      /* 其他技能标签和组件映射 */
      otherSkillActiveTagName: 'backend',
      otherSkillCardTitle: '一些奇奇怪怪的技能',
      componentMapping: {
        backend: {
          label: 'Backend',
          items: [
            {
              icon: 'images/expressjs.svg',
              title: 'Express.js',
              desc: 'Node.js后端web服务框架',
            },
            {
              icon: 'images/mysql.svg',
              title: 'MySQL',
              desc: '关系型数据库管理系统',
            },
            {
              icon: 'images/django.svg',
              title: 'Django',
              desc: 'Python后端web服务框架',
            },
            {
              icon: 'images/mongoDB.svg',
              title: 'mongoDB',
              desc: 'NoSQL数据库',
            },
          ]
        },
        other: {
          label: 'Other',
          items: [
            {
              icon: 'images/github.svg',
              title: 'Git',
              desc: '代码管理',
            },
            {
              icon: 'images/scrapy.png',
              title: 'Scrapy',
              desc: 'Python爬虫框架',
            },
            {
              icon: 'images/selenium.svg',
              title: 'Selenium',
              desc: 'Python自动化测试框架',
            },

          ]
        },
      },
      /* 正在学习的技能 */
      skillLearningTitle: '正在学习的技能',
      skillLearningActiveTagName: 'learning',
      skillLearning: {
        learning: {
          label: 'Learning',
          items: [
            {
              icon: 'images/react.svg',
              title: 'React.js',
              desc: '流行前端web框架',
            },
            {
              icon: 'images/vitest.svg',
              title: 'Vitest',
              desc: 'Vite提供支持的极速单元测试框架',
            },
          ]
        },
      }
    },
    project: {
      icon: Menu,
      stick: {
        desc: '项目',
        color: '#B8CCE3'
      },
      projectItemsTitle: '项目展示',
      projectItems: [
        {
          title: 'Personal-homepage',
          type: '个人主页模板',
          image: '/big-images/personal-homepage.png',
          desc: '一款基于Vue3的个人主页模板',
          detail: {
            title: 'Personal-homepage',
            md: '/md/personal-homepage.md',
            baseInfo: {
              git: {
                icon: 'icon-github',
                alias: 'Git',
                link: 'https://github.com/biggerstar/personal-homepage',
                value: '去看看'
              },
              languages: {
                icon: 'icon-code',
                alias: '技术栈',
                value: 'Typescript + Sass + Vue3'
              },
            }
          },
        },
        {
          title: 'vite-run',
          type: '效率工具',
          image: '/big-images/vite-run.png',
          desc: 'Vite 多配置运行支持',
          detail: {
            title: 'vite-run',
            md: '/md/vite-run.md',
            baseInfo: {
              git: {
                icon: 'icon-github',
                alias: 'Git',
                link: 'https://github.com/biggerstar/vite-run',
                value: '去看看'
              },
              languages: {
                icon: 'icon-code',
                alias: '技术栈',
                value: 'Typescript + Commander.js'
              },
            }
          },
        },
        {
          type: '效率工具',
          title: '',
          image: '/big-images/any-grid-layout.png',
          desc: '一款快速网格布局的高性能前端库，支持跨容器拖动元素，无副作用调整大小，响应式布局，静态布局',
          detail: {
            title: 'any-grid-layout',
            md: '/md/any-grid-layout.md',
            baseInfo: {
              git: {
                icon: 'icon-github',
                alias: 'Git',
                link: 'https://github.com/biggerstar/any-grid-layout',
                value: '去看看'
              },
              languages: {
                icon: 'icon-code',
                alias: '语言',
                value: 'TypeScript'
              },
            }
          },
        },
        {
          type: '效率工具',
          title: '',
          image: '/big-images/TiYi.js.png',
          desc: '浏览器记录栈的映射管理控制与功能拓展,支持监听浏览器前进后退',
          detail: {
            title: 'TiYi.js',
            md: '/md/TiYi.js.md',
            baseInfo: {
              git: {
                icon: 'icon-github',
                alias: 'Git',
                link: 'https://github.com/biggerstar/TiYi.js',
                value: '去看看'
              },
              languages: {
                icon: 'icon-code',
                alias: '语言',
                value: 'TypeScript'
              },
            }
          },
        },
        {
          type: 'Vite打包插件',
          image: '/big-images/vite-plugin-copy-dts.png',
          title: ' ',
          desc: '合并「 declare module 」和「 declare global 」ts类型定义到目标dts声明文件中',
          detail: {
            title: 'vite-plugin-copy-dts',
            md: '/md/vite-plugin-copy-dts.md',
            baseInfo: {
              git: {
                icon: 'icon-github',
                alias: 'Git',
                link: 'https://github.com/biggerstar/vite-plugin-copy-dts',
                value: '去看看'
              },
              languages: {
                icon: 'icon-code',
                alias: '语言',
                value: 'Typescript'
              },
            }
          },
        },
        {
          type: '爬虫框架',
          image: '/big-images/ESpider.png',
          title: '',
          desc: '一款node端高并发爬虫框架，支持队列,调度，数据管道，中间件，api简单易用',
          detail: {
            title: 'ESpider',
            md: '/md/ESpider.md',
            baseInfo: {
              git: {
                icon: 'icon-github',
                alias: 'Git',
                link: 'https://github.com/biggerstar/ESpider',
                value: '去看看'
              },
              languages: {
                icon: 'icon-code',
                alias: '语言',
                value: 'Javascript'
              },
            }
          },
        },
        {
          type: '工具',
          image: '/big-images/history-stack-manager.png',
          title: '',
          desc: '浏览器记录栈的映射管理控制与功能拓展,支持监听浏览器前进后退',
          detail: {
            title: 'History-stack-manager',
            md: '/md/history-stack-manager.md',
            baseInfo: {
              git: {
                icon: 'icon-github',
                alias: 'Git',
                link: 'https://github.com/biggerstar/history-stack-manager',
                value: '去看看'
              },
              languages: {
                icon: 'icon-code',
                alias: '语言',
                value: 'TypeScript'
              },
            }
          },
        },

      ],
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

