<template>
  <div class="topNav">

    <!--active-text-color="#67C23A"-->
    <el-menu active-text-color="#67C23A" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
             @select="handleSelect">

      <el-menu-item>
        <el-link href="" :underline="false" type="primary">
          <img src="../../assets/nvuoit.png" alt="" style=" width: 50px ; height: 50px">
          <span>niit</span>
        </el-link>
      </el-menu-item>

      <!--首页-->
      <el-menu-item index="1">
        <el-link href="" :underline="false" type="primary">
          首页
        </el-link>
      </el-menu-item>

      <!--编程-->
      <el-submenu index="2">
        <template slot="title">在线编程</template>
        <el-submenu index="2-1">
          <template slot="title">Blockly编程</template>
          <el-menu-item index="2-1-1">
            <el-link href="#/blockly-online" :underline="false" type="primary">尝试</el-link>
          </el-menu-item>
          <el-menu-item index="2-1-2">教学案例</el-menu-item>
        </el-submenu>
        <el-submenu index="2-2">
          <template slot="title">Johoy-5编程</template>
          <el-menu-item index="2-2-1">
            <el-link href="#/johnny5-online" :underline="false" type="primary">尝试</el-link>
          </el-menu-item>
          <el-menu-item index="2-2-2">教学案例</el-menu-item>
        </el-submenu>
      </el-submenu>

      <!--博客-->
      <el-submenu index="3">
        <template slot="title">文章</template>

        <el-menu-item index="3-1">
          <el-link href="#/show-blogs" :underline="false">
            查看
          </el-link>
        </el-menu-item>

        <el-menu-item v-show="isLogin" index="3-2">
          <el-link href="#/editor" :underline="false">
            发布
          </el-link>
        </el-menu-item>

      </el-submenu>


      <div class="c-flag-left" v-show="!isLogin">
        <!--登录或注册-->
        <el-link href="#/sign" :underline="false" type="primary">登录/注册</el-link>
      </div>
      <div v-show="isLogin" class="c-flag-left">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar shape="circle" :size="30" :src="customer.avatar"></el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><el-link href="#/update-info" :underline="false">个人设置</el-link></el-dropdown-item>
            <el-dropdown-item><el-link href="#/login" :underline="false">消息中心</el-link></el-dropdown-item>
            <el-dropdown-item><el-link href="#/login" :underline="false">我的收藏</el-link></el-dropdown-item>
            <el-dropdown-item divided><el-link type="warning" :underline="false" @click="logout">退出登录</el-link></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>


    </el-menu>

    
  </div>
</template>

<script>

  export default {
    /*在需要刷新页面的js中注入reload方法*/
    inject: ['reload'],
    name: "topNav",
    data() {
      return {
        
        activeIndex: '1',
        customer: {
          avatar: '',
          nickname: ''
        },
        isLogin: false
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      },

      /*清除sessionStorage中的用户信息*/
      logout(){
        //将store中的信息置空
      }

    },
    //代表着 模板已经在内存中编译完成了，但是尚未把模板渲染(挂载)到页面中去
    mounted() {
      if (this.$store.state.isLogin) {
      this.isLogin = true;
      this.customer = this.$store.state.customer;
      }

      //console.log(this.customer);


    }
  }
</script>

<style scoped>
  .topNav {
    width: 100%;
    position: fixed;
    z-index: 10000;
    text-align: center;
  }

  .c-flag-left {
    position: absolute;
    right: 2%;
    top: 30%;
  }


</style>
