//框架核心配置
import ColorUI from '../mp-cu/main'
export const colorUI = new ColorUI({
  config: {
    theme: 'auto',
    main: 'blue',
    text: 1,
    footer: true,
    share: true,
    shareTitle: '小贝校招',
    homePath: '/pages/home/home',
    tabBar: [{
        title: '内推',
        icon: '/static/tab_icon/tpl.png',
        curIcon: '/static/tab_icon/tpl_cur.png',
        url: '/pages/referral/home',
        type: 'tab'
      },
      {
        title: '日程',
        icon: '/static/tab_icon/custom.png',
        curIcon: '/static/tab_icon/custom_cur.png',
        url: '/pages/schedule/home',
        type: 'tab'
      },
      {
        title: '首页',
        icon: '/static/tab_icon/document.png',
        curIcon: '/static/tab_icon/document_cur.png',
        url: '/pages/home/home',
        type: 'tab'
      },
      {
        title: '刷题',
        icon: '/static/tab_icon/test.png',
        curIcon: '/static/tab_icon/test_cur.png',
        url: '/pages/interview/home',
        type: 'tab'
      },
      {
        title: '我的',
        icon: '/static/tab_icon/my.png',
        curIcon: '/static/tab_icon/my_cur.png',
        url: '/pages/my/home',
        type: 'tab'
      }
    ],
  }
})