import Vue from 'vue'
import Router from 'vue-router'

import Index from "../components/Index";
import Sign from "../components/Sign";

import EditorBlog from "../components/article/EditorBlog";
import ShowAllBlog from "../components/article/ShowAllBlog";
import ShowABlog from "../components/article/ShowABlog";

import ShowExamples from "../components/example/ShowExamples"

import ShowMessages from "../components/message/ShowMessages"

import BlocklyOnLine from "../components/blockly/BlocklyOnLine";
import Johnny5OnLine from "../components/johnny5/Johnny5OnLine"

import UpdateInfo from "../components/customerInfo/UpdateInfo";



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: Index
    },
    {
      path: '/index',
      component: Index
    },
    
    {
      path: '/editor',
      component: EditorBlog
    },
    {
      path: '/show-blogs',
      component: ShowAllBlog
    },
    {
      path: '/show-blog',
      component: ShowABlog
    },
    {
      path: '/show-examples',
      component: ShowExamples
    },
    {
      path: '/show-messages',
      component: ShowMessages
    },
    {
      path: '/blockly-online',
      component: BlocklyOnLine
    },
    {
      path: '/update-info',
      component: UpdateInfo
    },
    {
      path: '/sign',
      component: Sign
    },

    {
      path: '/johnny5-onLine',
      component: Johnny5OnLine
    }

  ]
})
