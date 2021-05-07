<template>
  <el-container>
    <el-main>
      <!-- 父评论 -->
      <el-row>
        <!-- 头像 -->
        <el-col :span="2">
          <el-avatar
            :src="'http://localhost:8000/yl' + parentComment.avatar"
          ></el-avatar>
        </el-col>
        <!-- 昵称 -->
        <el-col :span="4">
          <!-- 判断是不是作者 -->
          <span
            ><el-tag type="success" v-if="parentComment.authorComment"
              >作者</el-tag
            >{{ parentComment.nickname }}</span
          >
        </el-col>
        <el-col :span="13"> {{ parentComment.content }} </el-col>
        <!-- 发布时间 -->
        <el-col :span="3">{{ parentComment.createTime | timeFormat }}</el-col>
        <el-col :span="2">
          <!-- 获取被回复人的昵称 -->
          <el-button type="text" @click="replyBtn()">回复</el-button>
        </el-col>
      </el-row>



      <!-- 遍历子评论 -->
      <comment-model
        @updatePlaceholder="updatePlaceholder"
        v-for="childrenComment in parentComment.replyComments"
        :key="childrenComment.id"
        :articleAuthorId="articleAuthorId"
        :parentComment="childrenComment"
        :update="update"
        :articleId="articleId"
      />
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "commentModel",
  components: {},
  props: {
    articleId: {
      type: Number,
    },
    parentComment: {
      type: Object,
    },
    articleAuthorId: {
      type: Number,
    },
    update: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      replyInput: "",
      replyObj: null
    };
  },
  methods: {
    //作为子评论或子孙评论进行输入提交,文本域中出现被评论人的昵称
    replyBtn() {
        this.$emit("updatePlaceholder", {
        id: this.parentComment.customerId,
        nickname: this.parentComment.nickname,
        commentId: this.parentComment.id
      });
      
    },

    updatePlaceholder(data){
      this.replyObj = data;
      //向父组件传值(冒泡)
      this.$emit("updatePlaceholder", this.replyObj);
    }
    
  },
  mounted() {

  },
};
</script>

<style  scoped>
</style>
