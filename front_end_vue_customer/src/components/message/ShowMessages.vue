<template>
  <el-container>
    <el-header>
      <top-nav />
    </el-header>
    <el-main>
      <el-tabs
        :value="activeName"
        @tab-click="tabClick"
        tab-position="left"
        style="margin-left: 100px; margin-right: 100px"
      >
        <!-- 默认加载 -->
        <!-- 回复我的 -->
        <el-tab-pane label="回复我的" name="1">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>回复我的</span>
            </div>
            <div class="text item" v-if="replyMeMessages.length > 0">
              <!-- 遍历 -->
              <div
                v-for="message in replyMeMessages"
                :key="message.id"
              >
                <el-row>
                  <el-col :span="3">
                    <el-avatar :src="'http://localhost:8000/yl'+message.avatar"></el-avatar>
                  </el-col>
                  <el-col class="nickname" :span="4" v-text="message.nickname"></el-col>
                  <el-col :span="5">
                    评论了我
                  </el-col>
                  <el-col class="createTime" :span="12">{{ message.createTime | timeFormat }}</el-col>
                </el-row>

                <el-row>
                    <el-col class="content" v-text="message.content"></el-col>
                </el-row>
                <el-divider></el-divider>
              </div>

            </div>
            <div v-else>没有数据</div>
          </el-card>
        </el-tab-pane>

        <!-- 我的消息 -->
        <el-tab-pane label="我的消息" name="2">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>我的消息</span>
            </div>
            <div class="text item" v-if="myMessages.length > 0">
             <div
                v-for="message in myMessages"
                :key="message.id"
              >
                <el-row>
                  <el-col :span="3">
                    <el-avatar :src="'http://localhost:8000/yl'+message.avatar"></el-avatar>
                  </el-col>
                  <el-col class="nickname" :span="4" v-text="message.nickname"></el-col>
                  <el-col :span="5">
                    评论了我
                  </el-col>
                  <el-col class="createTime" :span="12">{{ message.createTime | timeFormat }}</el-col>
                </el-row>

                <el-row>
                    <el-col class="content" v-text="message.content"></el-col>
                </el-row>
                <el-divider></el-divider>

              </div>
            </div>
            <div v-else>没有数据</div>
          </el-card>
        </el-tab-pane>

        <!-- 系统公告 -->
        <el-tab-pane label="系统公告" name="3">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>系统公告</span>
            </div>
            <div class="text item" v-if="systemNotices.length > 0">
              <div
                v-for="notice in systemNotices"
                :key="notice.id"
              >
                <div class="createTime">
                    {{notice.createTime | timeFormat}}
                </div>
                <div class="content">
                    {{notice.content}}
                </div>
                <el-divider></el-divider>
              </div>
            </div>
            <div v-else class="text item">
              没有数据
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <!-- <el-footer>
      <bottom-nav />
    </el-footer> -->
  </el-container>
</template>

<script>
// import BottomNav from "../fragment/BottomNav.vue";
import TopNav from "../fragment/TopNav.vue";
export default {
  name: "ShowMessagesComponent",
  components: {
    TopNav,
    
  },
  data() {
    return {
      replyMeMessages: [],
      myMessages: [],
      systemNotices: [],
      activeName: "1",
      customerId: "",
    };
  },
  methods: {
    //选中tab时触发
    tabClick(tab) {
      this.activeName = tab.name;
      switch (this.activeName) {
        case "1":
          this.getReplyMeMessages();
          break;
        case "2":
          this.getMyMessages();
          break;
        default:
          this.getSystemNotices();
      }
    },
    //获取"回复我的"信息
    getReplyMeMessages() {
      this.$axios
        .get(this.$baseUrl + "/message/replyMeMessages", {
          params: {
            id: this.customerId,
          },
        })
        .then((res) => {
          this.replyMeMessages = res.data.data;
        })
        .catch((err) => {});
    },

    //获取"我的信息"信息
    getMyMessages() {
      this.$axios
        .get(this.$baseUrl + "/message/myMessages", {
          params: {
            id: this.customerId,
          },
        })
        .then((res) => {
          this.myMessages = res.data.data;
        })
        .catch((err) => {});
    },

    //获取"系统公告"信息
    getSystemNotices() {
      this.$axios
        .get(this.$baseUrl + "/message/systemNotices")
        .then((res) => {
          this.systemNotices = res.data.data;
        })
        .catch((err) => {});
    },
  },
  mounted() {
    //获取登录者id
    this.customerId = this.$store.state.customer.id;
    this.getReplyMeMessages();
  },
};
</script>

<style  scoped>
.el-header {
  padding: 0;
}

.el-footer {
  padding: 0;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.createTime{
  font-size: 12px;
  color: darkgray;
}

.content{
  font-size: 18px;

}
</style>

