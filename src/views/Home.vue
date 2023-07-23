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
        </el-menu>
        <div class="line"></div>
      </el-header>

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

export default {
  name: "Home",

  data() {
    return {

      input: '',
      activeIndex: '/Skin',
      activeIndex2: '/Content',
    }
  },
  methods: {

    menuClick(index) {
      this.$router.push(index);
    },
    search() {
      this.$router.replace({ path: '/skin', query: { searchKey: this.input } });
    }
  },
}
</script>


<style scoped>

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
  margin-left: auto;
  display: flex;
  align-items: center;
}

.search-button {
  margin-left: 10px;
}

</style>
