<template>
  <el-container>
    <el-header>
      <TopNav />
    </el-header>

    <el-main align="center">
      <!-- 默认3000ms自动切换的走马灯 -->
      <el-carousel :interval="3000" trigger="click" height="300px" type="card">
        <el-carousel-item v-for="src in urls" :key="src">
          <el-image :src="src" fit="fill" style="height: 100%"></el-image>
        </el-carousel-item>
      </el-carousel>

      <el-divider><i class="el-icon-sunny"></i></el-divider>

      <!-- Blockly -->
      <div class="introduce">
        <h1 class="title" v-text="defineBlocklyIntroduce.title">TITLE</h1>
        <!-- 图片 -->
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="11" :xl="10">
            <el-image
              src="static\images\introduce_blockly.png"
              fit="fill"
            ></el-image>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="13" :xl="14">
            <h2 class="content" v-text="defineBlocklyIntroduce.content">
              content
            </h2>
          </el-col>
        </el-row>
      </div>

      <el-divider><i class="el-icon-sunny"></i></el-divider>

      <!-- Johnny-Five -->
      <div class="introduce">
        <h1 class="title" v-text="defineJ5Introduce.title">TITLE</h1>
        <!-- 图片 -->
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="13" :xl="14">
            <h2 class="content" v-text="defineJ5Introduce.content">content</h2>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="11" :xl="10">
            <el-image
              src="static\images\introduce_j5.png"
              fit="fill"
            ></el-image>
          </el-col>
        </el-row>
      </div>

      <el-divider><i class="el-icon-sunny"></i></el-divider>

      <!-- Articles -->
      <div>
        <el-link href="/#/show-blogs" :underline="false"><h2>Articles</h2></el-link>
        <el-row :gutter="10">
          <!-- customer-Articles -->
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <h3>用户文章</h3>
            <div v-if="customerArticles.length > 0">
              <div v-for="article in customerArticles" :key="article.id">
                <el-link
                  :underline="false"
                  type="primary"
                  @click="readArticle(article)"
                  >{{ article.title }}</el-link
                >
              </div>
            </div>
          </el-col>
          <!-- admin-Articles -->
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <h3>管理员文章</h3>
            <div v-if="adminArticles.length > 0">
              <div v-for="article in adminArticles" :key="article.id">
                <el-link
                  :underline="false"
                  type="success"
                  @click="readArticle(article)"
                  >{{ article.title }}</el-link
                >
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-divider><i class="el-icon-sunny"></i></el-divider>

      <!-- Examples -->
      <div>
        <el-link href="/#/show-examples" :underline="false"><h2>Examples download</h2></el-link>
        <el-row :gutter="10">
          <!-- blockly-examples -->
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <h3>Blockly</h3>
            <div v-if="blocklyExamples.length > 0">
              <div v-for="example in blocklyExamples" :key="example.id">
                <a
                  @click="
                    downloadFile(example.fileMapPath, 'blocklyExample.xml')
                  "
                  >{{ example.content | stringSplit }}</a
                >
              </div>
            </div>
          </el-col>
          <!-- j5-examples -->
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <h3>Johnny-Five</h3>
            <div v-if="j5Examples.length > 0">
              <div v-for="example in j5Examples" :key="example.id">
                <a
                  @click="downloadFile(example.fileMapPath, 'j5Example.xml')"
                  >{{ example.content | stringSplit }}</a
                >
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>

    <el-footer>
      <BottomNav />
    </el-footer>
  </el-container>
</template>

<script>
import BottomNav from "./fragment/BottomNav";
import TopNav from "./fragment/TopNav";
import { blocklyIntroduce, johnnyFiveIntroduce } from "@/api/others/index";

export default {
  name: "Index",
  components: { TopNav, BottomNav },
  data() {
    return {
      blocklyExamples: [],
      j5Examples: [],
      customerArticles: [],
      adminArticles: [],
      defineBlocklyIntroduce: { title: "", content: "" },
      defineJ5Introduce: { title: "", content: "" },
      //设置附件的前缀
      prefixAccessory: "",
      urls: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      ],
    };
  },
  methods: {
    //下载文件
    downloadFile(fileMapPath, fileName) {
      var x = new XMLHttpRequest();
      //this.prefixAccessory : 路径前缀
      x.open("GET", this.prefixAccessory + fileMapPath, true);
      x.responseType = "blob";
      x.onload = function (e) {
        var url = window.URL.createObjectURL(x.response);
        var a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
      };
      x.send();
    },

    //查看文章详情
    readArticle(article) {
      //将文章详情保存在store中
      this.$store.commit("changeArticle", article);

      //跳转页面
      this.$router.push("/show-blog");
    },
  },

  mounted() {
    //获取最新的blockly
    this.$axios
      .get(this.$baseUrl + "/blocklyExamples")
      .then((res) => {
        //console.log(res);
        this.blocklyExamples = res.data.data;
      })
      .catch((err) => {});

    //获取最新的j5
    this.$axios
      .get(this.$baseUrl + "/j5Examples")
      .then((res) => {
        //console.log(res);
        this.j5Examples = res.data.data;
      })
      .catch((err) => {});

    //获取最新的admin文章
    this.$axios
      .get(this.$baseUrl + "/adminArticles")
      .then((res) => {
        //console.log(res);
        this.adminArticles = res.data.data;
      })
      .catch((err) => {});

    //获取最新的customer文章
    this.$axios
      .get(this.$baseUrl + "/customerArticles")
      .then((res) => {
        //console.log(res);
        this.customerArticles = res.data.data;
      })
      .catch((err) => {});

    //设置附件的前缀
    this.prefixAccessory = "http://localhost:8000/yl";

    this.defineBlocklyIntroduce = blocklyIntroduce;
    this.defineJ5Introduce = johnnyFiveIntroduce;
  },
};
</script>

<style scoped>
.el-header {
  padding: 0;
}

.el-footer {
  padding: 0;
}
.item {
  margin-top: 20px;
  margin-right: 40px;
}
h3 {
  margin: 5px;
}

.introduce {
  margin: 10px;
  padding: 20px;
}

.introduce .title {
  font-size: 60px;
  font-weight: 400;
  letter-spacing: -0.5px;
  line-height: 72px;
}

.introduce .content {
  font-size: 30px;
  font-weight: 300;
  letter-spacing: -0.5px;
  line-height: 50px;
  text-align: left;
}
</style>
