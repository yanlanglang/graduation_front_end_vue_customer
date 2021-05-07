<template>
  <el-container>
    <el-main class="signMain">
        <h2>南京工业职业技术大学</h2>
      <el-divider></el-divider>

        <el-button type="text"  @click="isLoginFlag=true" >登录</el-button>
        <el-divider direction="vertical"></el-divider>
  <el-button type="text" @click="isLoginFlag=false" >注册</el-button>
<el-divider></el-divider>

 
        <!-- 登录 -->
          <!--表单-->
          <el-form
          v-show="isLoginFlag===true"
            :model="ruleInForm"
            status-icon
            label-position="left"
            :rules="inRules"
            ref="ruleInForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input v-model="ruleInForm.username"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                v-model="ruleInForm.password"
                show-password
              ></el-input>
            </el-form-item>

            <el-col>
              <el-button
                type="success"
                plain
                @click="submitInForm('ruleInForm')"
                >登录</el-button
              >
              <el-button plain>忘记密码</el-button>
            </el-col>
          </el-form>
        
        <!-- 注册 -->
          <!--表单-->
          <el-form
          v-show="isLoginFlag===false"
            status-icon
            :model="ruleUpForm"
            label-position="left"
            :rules="upRules"
            ref="ruleUpForm"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input v-model="ruleUpForm.username"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="mail">
              <el-input v-model="ruleUpForm.mail"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                autocomplete="off"
                v-model="ruleUpForm.password"
                show-password
              ></el-input>
            </el-form-item>

            <el-form-item label="再次输入密码" prop="rePassword">
              <el-input
                autocomplete="off"
                v-model="ruleUpForm.rePassword"
                show-password
              ></el-input>
            </el-form-item>

            <el-col>
              <el-button
                @click="submitUpForm('ruleUpForm')"
                type="success"
                plain
              >
                注册
              </el-button>
            </el-col>
          </el-form>
    </el-main>
  </el-container>
</template>

<script>
import Qs from "qs";
import request from "@/utils/request"

export default {
  name: "",
  components: {},
  data() {
    /*自定义注册的rules*/
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleUpForm.rePassword !== "") {
          this.$refs.ruleUpForm.validateField("rePassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleUpForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
        //默认是登录
        isLoginFlag: true,

      //登录表单
      ruleInForm: {
        username: "",
        password: "",
      },
      /*使用elementUi定义的校验规则*/
      inRules: {
        username: [
          {
            type: "string",
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            type: "string",
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
      //注册表单
      ruleUpForm: {
        username: "",
        password: "",
        rePassword: "",
        mail: "",
      },
      /*使用element的rules*/
      upRules: {
        username: [
          {
            type: "string",
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
          {
            min: 8,
            max: 16,
            message: "长度在 8 到 16 个字符",
            trigger: "blur",
          },
        ],
        mail: [
          {
            type: "email",
            required: true,
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        password: [
          { validator: validatePass, required: true, trigger: "blur" },
        ],
        rePassword: [
          { validator: validatePass2, required: true, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    
    //登录
    submitInForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          //校验通过
          //远程请求
            request({
                url: 'customer/signIn',
                method: 'post',
                params: {
                    username: this.ruleInForm.username,
                    password: this.ruleInForm.password
                }
            }).then(
                (res)=> {
                    this.$refs['ruleInForm'].resetFields();
                    
                    //在store中存储不敏感的数据
                    this.$store.commit("changeIsLogin",true);
                    this.$store.commit("changeCustomer",res.data);
                    this.$router.push({path: '/'});
                },
                (err) => {
                    console.log(err);
                    this.$refs['ruleInForm'].resetFields();
                }
            )
        } else {
          //校验失败
          console.log("false");
          return false;
        }
      });
    },
    //注册
    submitUpForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
            //远程请求
            request({
                url: 'customer/signUp',
                method: 'post',
                params: {
                    username: this.ruleUpForm.username,
                    mail: this.ruleUpForm.mail,
                    password: this.ruleUpForm.password
                }
            }).then(
                (res)=> {
                    console.log(res);
                    this.$refs['ruleUpForm'].resetFields();
                    //默认是登录
                    this.isLoginFlag =  true;
                },
                (err) => {
                    console.log(err);
                    this.$refs['ruleUpForm'].resetFields();
                }
            )

        } else {
             //校验失败
          console.log("false");
          return false;
        }
      });
    },
  },
};
</script>

<style  scoped>
.signMain{
    text-align: center;
}


</style>

