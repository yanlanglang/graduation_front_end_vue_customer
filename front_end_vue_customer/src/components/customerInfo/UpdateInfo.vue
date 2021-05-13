<template>
  <el-container>
    <el-header>
      <TopNav />
    </el-header>

    <el-main>
      <!--表单-->
      <el-form
        status-icon
        :model="formModel"
        label-position="left"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <!-- :data 很重要，在这里加上可以将表单的数据和图片同时上传 -->
        <el-upload
          class="avatar-uploader"
          :action="this.$baseUrl + '/customer/editInfo'"
          ref="upload"
          list-type="picture-card"
          :on-exceed="handleExceed"
          :on-change="handleChange"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :auto-upload="false"
          :data="formModel"
          :limit="1"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">如需修改请删除后再上传</div>
        </el-upload>

        <!--账号-->
        <el-form-item label="账号">
          <el-input v-model="formModel.username" :disabled="true"></el-input>
        </el-form-item>

        <!--昵称-->
        <el-form-item label="昵称">
          <el-input v-model="formModel.nickname"></el-input>
        </el-form-item>

        <!--性别-->
        <el-form-item label="性别">
          <el-input v-model="formModel.gender"></el-input>
        </el-form-item>

        <!--邮箱-->
        <el-form-item label="邮箱">
          <el-input v-model="formModel.mail"></el-input>
        </el-form-item>

        <el-col>
          <el-button @click="submitForm('ruleForm')" type="primary" plain>
            确认修改
          </el-button>
          <el-link href="#/index" :underline="false" type="primary">
            <el-button type="success" plain> 返回 </el-button>
          </el-link>
        </el-col>
      </el-form>
    </el-main>

    <br />
    <div style="margin: 40px"></div>
    <el-footer>
      <BottomNav />
    </el-footer>
  </el-container>
</template>

<script>
import TopNav from "../fragment/TopNav";
import BottomNav from "../fragment/BottomNav";
import Qs from "qs";

export default {
  /*注入刷新的reload方法*/
  inject: ["reload"],
  name: "updateInfo",
  components: { BottomNav, TopNav },
  data() {
    return {
      //回显信息
      customer: null,
      file: null,
      formModel: {
        username: "",
        nickname: "",
        gender: "",
        mail: "",
        id: "",
      },
    };
  },
  methods: {
    /*改变时触发*/
    handleChange(file) {
      const typeArr = ["image/png", "image/gif", "image/jpeg", "image/jpg"];
      const isJPG = typeArr.indexOf(file.raw.type) !== -1;
      // image/png, image/jpeg, image/gif, image/jpg
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error("只能是图片!");
        this.$refs.upload.clearFiles();
        this.file = null;
        return;
      }
      if (!isLt3M) {
        this.$message.error("上传图片大小不能超过 3MB!");
        this.$refs.upload.clearFiles();
        this.file = null;
        return;
      }
      this.file = file.raw;
    },
    /*删除前触发*/
    handleRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    /*多选时触发*/
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    /*上传成功后触发*/
    handleSuccess(res, file, fileList) {
      //console.log(res.data);
      var customer = res.data;
      this.$store.commit("changeCustomer", customer);
      //刷新当前页面
      //this.reload();

      this.$router.go(0);
    },

    /*提交信息*/
    submitForm(ruleForm) {
      //判断是否有文件
      if (this.file) {
        //上传图片和相关表单信息
        this.$refs.upload.submit();
      } else {
        this.$axios.post(this.$baseUrl+'/customer/editInfo',Qs.stringify(this.formModel))
        .then(res => {
          
          var customer = res.data.data;
          this.$store.commit("changeCustomer", customer);
          this.$router.go(0);
        })
        .catch(err => {
          this.$message.error("服务器发生错误！");
        })
      }
    },
  },
  mounted() {
    var customer = this.$store.state.customer;
    //初始化表单数据
    this.formModel = {
      username: customer.username,
      nickname: customer.nickname,
      gender: customer.gender,
      mail: customer.mail,
      id: customer.id,
    };
  },
};
</script>

<style scoped>
.el-main {
  text-align: center;
}

.el-container {
  text-align: center;
}

.el-header {
  padding: 0;
}

.el-form {
  width: 50%;
  margin: 50px auto;
  text-align: center;
}

.el-footer {
  padding: 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>
