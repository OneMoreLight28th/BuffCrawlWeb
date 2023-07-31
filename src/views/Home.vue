<template>
  <div>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item><a href="Home.vue"><img src="./ak.png" width="50" height="50"></a></el-menu-item>
          <el-menu-item index="/Skin" @select="menuClick">首页</el-menu-item>
          <el-menu-item><a href="https://github.com/OneMoreLight28th" target="_blank">反馈</a></el-menu-item>
          <div class="search-container">
            <el-input v-model="input" placeholder="输入物品名称" @keyup.native.enter="search"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search" class="search-button">
              搜索
            </el-button>
          </div>


          <!--头像-->
          <div class="avatar-container" @click="handleAvatarClick" @mouseover="isAvatarHovered = true"
               @mouseleave="isAvatarHovered = false">
            <el-avatar icon="el-icon-user-solid" :class="{ 'avatar-hover': isAvatarHovered }"></el-avatar>
            <span v-if="loggedIn" class="username">{{ userId }}</span>
          </div>
        </el-menu>
        <div class="line"></div>
      </el-header>


      <el-dialog :visible.sync="showUserInfoDialog" title="用户登录" @close="handleUserInfoDialogClose" :width="dialogWidth">
        <!-- 用户登录表单 -->
        <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules">
          <el-form-item label="用户名" prop="userId">
            <el-input v-model="loginForm.userId"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPwd">
            <el-input v-model="loginForm.userPwd" type="password"></el-input>
          </el-form-item>
          <!-- 其他登录字段... -->
        </el-form>
        <el-button slot="footer" type="primary" @click="handleLogin">登录</el-button>
        <el-button slot="footer" @click="handleRegister">注册</el-button>

      </el-dialog>

      <!-- 用户注册弹窗 -->
      <el-dialog :visible.sync="showRegisterDialog" title="用户注册" @close="handleRegisterDialogClose" :width="dialogWidth">
        <!-- 用户注册表单 -->
        <el-form ref="registerForm" :model="registerForm" :rules="registerFormRules">
          <el-form-item label="用户名" prop="userId">
            <el-input v-model="registerForm.userId"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPwd">
            <el-input v-model="registerForm.userPwd" type="password"></el-input>
          </el-form-item>
          <!-- 其他注册字段... -->
        </el-form>
        <el-button slot="footer" type="primary" @click="handleRegisterSubmit">注册</el-button>
        <el-button slot="footer" @click="showRegisterDialog = false">取消</el-button>
      </el-dialog>


      <el-main>
        <router-view/>
      </el-main>

      <el-footer>
        <a class="fontClass" href="https://buff.163.com/" target="_blank">数据支持:网易buff</a>
      </el-footer>
    </el-container>
    <div class="line"></div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState , mapMutations } from "vuex";


export default {
  name: "Home",

  data() {
    return {
      dialogWidth: '400px',
      showUserInfoDialog: false,   // 控制用户登录弹窗的显示状态
      showRegisterDialog: false,   // 控制用户注册弹窗的显示状态
      isAvatarHovered: false,      // 头像是否处于hover状态
      loginForm: {
        userId: '',
        userPwd: '',
      },
      loginFormRules: {
        userId: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        userPwd: [{required: true, message: '请输入密码', trigger: 'blur'}],
      },
      registerForm: {
        userId: '',
        userPwd: '',
      },
      registerFormRules: {
        userId: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        userPwd: [{required: true, message: '请输入密码', trigger: 'blur'}],
      },
      input: '',
      activeIndex: '/Skin',
      activeIndex2: '/Content',
    }
  },

  computed: {
    ...mapState(["loggedIn"]),
  },



  methods: {

    handleUserInfoDialogClose() {
      // 用户信息弹窗关闭时，重置弹窗的显示状态
      this.showUserInfoDialog = false;
    },

    handleRegister() {
      // 打开用户注册弹窗
      this.showRegisterDialog = true;
    },
    handleRegisterDialogClose() {
      // 处理注册弹窗关闭事件的逻辑
      this.showRegisterDialog = false;
    },

    handleRegisterSubmit() {
      // 检查是否输入了有效的用户名和密码以及其他必要的注册信息
      if (!this.registerForm.userId || !this.registerForm.userPwd) {
        this.$message.error("请输入完整的注册信息");
        return;
      }

      // 将响应式对象转换为普通JSON对象
      const requestData = JSON.parse(JSON.stringify(this.registerForm));

      // 发送注册请求，根据后端返回的结果进行处理
      axios.post("http://localhost:8081/api/users/register", requestData)
          .then(response => {
            // 注册成功处理
            this.$message.success(response.data);
            this.showRegisterDialog = false;
          })
          .catch(error => {
            // 注册失败处理
            this.$message.error("注册失败：" + error.response.data);
          });
    },

    ...mapMutations(['setLoggedIn']),
    handleLogin() {
      // 检查是否输入了有效的用户名和密码
      if (!this.loginForm.userId || !this.loginForm.userPwd) {
        this.$message.error("请输入用户名和密码");
        return;
      }

      // 将响应式对象转换为普通JSON对象
      const requestData = JSON.parse(JSON.stringify(this.loginForm));

      // 发送登录请求，根据后端返回的结果进行处理
      axios.post("http://localhost:8081/api/users/login", requestData)
          .then(response => {

            this.$message.success(response.data);
            this.showUserInfoDialog = false;

            // 使用 Vuex 提交 mutation 将 loggedIn 设置为 true
            this.setLoggedIn(true);

            this.userId = this.loginForm.userId; // 保存用户ID，以便显示在页面上

            if (this.$router.currentRoute.path !== '/Skin') {
              this.$router.push('/Skin');
            }

          })
          .catch(error => {
            if (error.response) {
              if (error.response.status === 401) {
                this.$message.error(error.response.data);
              } else {
                this.$message.error("登录失败：未知错误");
              }
            }
          });
    },



    handleAvatarClick() {
      // 点击头像时，显示用户信息弹窗
      this.showUserInfoDialog = true;
    },


    menuClick(index) {
      this.$router.push(index);
    },


    search() {
      this.$router.replace({path: '/skin', query: {searchKey: this.input}});
    },

  }
}
</script>


<style scoped>

.username {
  font-family: 'Arial', sans-serif; /* Example font family */
  font-size: 18px; /* Example font size */
  font-weight: bold; /* Example font weight */

}

.avatar-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
  right: 100px;
}

.avatar-hover {
  border: 2px solid #409EFF;
  border-radius: 50%;
  transition: border-color 0.3s;
}


.el-header, .el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.fontClass {
  font-size: 12px;
  font-family: Arial, sans-serif;
  color: rgb(139 137 137);
  text-align: center;
  text-decoration: none;
}

.el-menu-demo {
  display: flex;
}

.search-container {
  margin-left: 10px;
  display: flex;
  align-items: center;
}

.search-button {
  margin-left: 10px;
}

.avatar-container {
  display: flex;
  margin-left: auto;
  align-items: center;
}


</style>
