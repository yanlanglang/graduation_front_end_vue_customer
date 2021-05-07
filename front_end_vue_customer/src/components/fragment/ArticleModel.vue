<template>
  <div
    style="
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    "
  >
    <!-- 分割线 -->
    <el-divider><i class="el-icon-sunny"></i></el-divider>

    <!-- 其它信息 -->
    <el-container>
      <!-- 包含头像(avatar)、昵称(nickname)、发布时间(createTime) -->
      <el-header>
        <el-row class="baseInfo">
          <!-- 头像 -->
          <el-col :span="6">
            <el-avatar :src="'http://localhost:8000/yl/'+articleObj.customer.avatar"
              
            ></el-avatar>
          </el-col>
          <!-- 昵称 -->
          <el-col :span="6"
            ><span v-text="articleObj.customer.nickname">昵称</span></el-col
          >
          <!-- 发布时间 -->
          <el-col :span="6"
            ><span >{{articleObj.createTime | timeFormat}}</span></el-col
          >
          <!-- 分类名字 -->
          <el-col :span="6"
            ><span v-text="articleObj.type.name">分类</span></el-col
          >
        </el-row>
      </el-header>
      <!-- 包含标题(title)、简介(description)、正文(mainBody) -->
      <el-main>
        <el-collapse @change="updateComment" accordion>
          <!-- 标题 -->
          <el-row class="title">
            <b v-text="articleObj.title" style="font-size: 20px">
              标题
            </b>
          </el-row>
          <!-- 简介 -->
          <el-row class="description">
            <q  v-text="articleObj.description" style="font-size: 18px">
              简介
            </q>
          </el-row>
          <!-- 正文(初始化时不显示) -->
          <el-row >
            <!-- 折叠面板的方式显示正文 -->
            <el-collapse-item title="正文">
              <div v-html="articleObj.content" style="font-size: 14px">    
              </div>
            </el-collapse-item>
          </el-row>
        
          <!-- 评论 -->
          <el-row >
            <!-- 折叠面板的方式显示正文 -->
            <el-collapse-item title="评论" :name="articleObj.id + 'comments'">
              <!-- 点击之后加载 -->
              <div style="font-size: 14px">
                <!-- 限制长短的输入框 -->
                <el-row>
                  <!-- v-model="textarea" -->
                  <el-col :span="20">
                    <el-input
                      type="textarea"
                      v-model="replyInput"
                      :placeholder="placeholderWithNickname"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      maxlength="30"
                      show-word-limit
                    >
                    </el-input>
                  </el-col>
                  <el-col :span="4">
                    <!-- 提交按钮 -->
                    <el-button type="success" @click="parentCommentSubmit"
                      >提交</el-button
                    >
                  </el-col>
                </el-row>
                <el-row>
                  <span style="color:#409EFF " v-show="showTip">该篇文章还没有评论...</span>
                </el-row>

                <!-- 遍历commentInfo模板 -->
                <div v-for="parentComment in parentComments" :key="parentComment.id">
                  <comment-model
                    @updatePlaceholder="updatePlaceholder"
                    :articleAuthorId="articleObj.customerId"
                    :parentComment="parentComment"
                    :articleId="articleObj.id"
                    :update="updateComment"
                  />
                </div>
              </div>
            </el-collapse-item>
          </el-row>

         
        </el-collapse>
      </el-main>
      
    </el-container>
  </div>
</template>

<script>

import CommentModel from "../fragment/CommentModel";


export default {
  name: "articleModel",
  components: {
    CommentModel
  },

  //在props属性里接受父组件传递过来的数据
  props: {
      //article里面的content需要动态加载
    articleObj: {
      type: Object,
    },
  },

  data() {
    return {
      visible: false,
      replyInput: "",
      parentComments: [],
      showTip: true,
      placeholderWithNickname: '请输入评论内容...',
      replyObj: null
    };
  },
  methods: {
    //判断作为子评论提交的依据
    updatePlaceholder(data){
      this.replyObj = data;
      //console.log(this.replyObj);
      this.placeholderWithNickname = '回复 @'+data.nickname;
    },

    //相关判断
    judge() {
      
    },

    //点开'评论'进行加载评论信息
    updateComment() {
        //获取评论信息
      this.$axios
        .get(this.$baseUrl + "/comment/search", {
          params: {
            articleId: this.articleObj.id,
          },
        })
        .then((res) => {
          
          //一篇文章的所有父级(根节点)评论(Array)
          this.parentComments = res.data.data;

          console.log(this.parentComments);

          if(this.parentComments.length===0){
            this.showTip = true;
          }else{
            this.showTip = false;
          }
          
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //提交评论
    parentCommentSubmit() {
      //判断当前用户是否登录
      if (!this.$store.state.isLogin) {
        this.$message.error("请先登录！");
        return false;
      }

      //获取输入框的值
      if (this.replyInput) {
        //console.log(this.replyInput);
        //判断是否是作者的评论
        var loginId = this.$store.state.customer.id;
        var articleAuthorId = this.articleObj.customer.id;
        var isAuthorComment = false;
        if (loginId === articleAuthorId) {
          isAuthorComment = true;
        }

        //判断是否作为父评论提交
        if(this.replyObj===null){
          //作为父评论提交
          this.$axios
          .get(this.$baseUrl + "/comment/saveParentReply", {
            params: {
              authorComment: isAuthorComment,
              customerId: loginId,
              content: this.replyInput,
              articleId: this.articleObj.id,
            },
          })
          .then((res) => {
            this.$message.success("提交评论成功!");

            this.replyInput = "";
            
            this.updateComment();
          })
          .catch((err) => {
            console.log(err);
          });
        }else{
          //作为子评论提交
          this.$axios
          .get(this.$baseUrl + "/comment/saveChildrenReply", {
            params: {
              authorComment: isAuthorComment,
              customerId: loginId,
              content: this.replyInput,
              articleId: this.articleObj.id,
              commentId: this.replyObj.commentId,
            },
          })
          .then((res) => {
            this.$message.success("提交评论成功!");
            this.replyInput = "";
            
            this.updateComment();
          })
          .catch((err) => {
            console.log(err);
          });
        }

        return false;

        
      } else {
        this.$message.error("评论不能为空!");
      }
     
    },
  },
  mounted() {
    
    //console.log(this.articleObj);
  }
};
</script>

<style  scoped>
.baseInfo {
  text-align: center;
}

.title {
  text-align: center;
}

.description {
  text-align: center;
  }


</style>
