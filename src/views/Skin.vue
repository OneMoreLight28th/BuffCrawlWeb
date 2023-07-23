<template v-if="itemList && itemList.length">

  <el-row class="tac" v-loading="loading">
    <el-col :span="3">
      <div class="sidebar">
        <el-menu
            ref="menu"
            default-active="1"
            :collapse-transition="true"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :unique-opened="true"
        >

          <el-submenu index="1">
            <template slot="title">
              <i><img src="../assets/buqiang.png" width="40" height="25">&nbsp&nbsp&nbsp&nbsp</i>
              <span>步枪</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="updateSearchKey('加利尔 AR')">加利尔 AR</el-menu-item>
              <el-menu-item index="1-2" @click="updateSearchKey('SCAR-20')">SCAR-20</el-menu-item>
              <el-menu-item index="1-3" @click="updateSearchKey('AWP')">AWP</el-menu-item>
              <el-menu-item index="1-4" @click="updateSearchKey('AK-47')">AK-47</el-menu-item>
              <el-menu-item index="1-5" @click="updateSearchKey('法玛斯')">法玛斯</el-menu-item>
              <el-menu-item index="1-6" @click="updateSearchKey('M4A4')">M4A4</el-menu-item>
              <el-menu-item index="1-7" @click="updateSearchKey('M4A1 消音版')">M4A1 消音版</el-menu-item>
              <el-menu-item index="1-8" @click="updateSearchKey('SG 553')">SG 553</el-menu-item>
              <el-menu-item index="1-9" @click="updateSearchKey('SSG 08')">SSG 08</el-menu-item>
              <el-menu-item index="1-10" @click="updateSearchKey('AUG')">AUG</el-menu-item>
              <el-menu-item index="1-11" @click="updateSearchKey('G3SG1')">G3SG1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i><img src="../assets/shouqiang.png" width="40" height="25">&nbsp&nbsp&nbsp&nbsp</i>
              <span>手枪</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="updateSearchKey('P2000')">P2000</el-menu-item>
              <el-menu-item index="2-2" @click="updateSearchKey('USP 消音版')">USP 消音版</el-menu-item>
              <el-menu-item index="2-3" @click="updateSearchKey('格洛克 18 型')">格洛克 18 型</el-menu-item>
              <el-menu-item index="2-4" @click="updateSearchKey('P250')">P250</el-menu-item>
              <el-menu-item index="2-5" @click="updateSearchKey('FN57')">FN57</el-menu-item>
              <el-menu-item index="2-6" @click="updateSearchKey('CZ75 自动手枪')">CZ75 自动手枪</el-menu-item>
              <el-menu-item index="2-7" @click="updateSearchKey('Tec-9')">Tec-9</el-menu-item>
              <el-menu-item index="2-8" @click="updateSearchKey('R8 左轮手枪')">R8 左轮手枪</el-menu-item>
              <el-menu-item index="2-9" @click="updateSearchKey('沙漠之鹰')">沙漠之鹰</el-menu-item>
              <el-menu-item index="2-10" @click="updateSearchKey('双持贝瑞塔')">双持贝瑞塔</el-menu-item>

            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i><img src="../assets/bishou.png" width="40" height="25">&nbsp&nbsp&nbsp&nbsp</i>
              <span>匕首</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="updateSearchKey('鲍伊猎刀')">鲍伊猎刀</el-menu-item>
              <el-menu-item index="3-2" @click="updateSearchKey('蝴蝶刀')">蝴蝶刀</el-menu-item>
              <el-menu-item index="3-3" @click="updateSearchKey('弯刀')">弯刀</el-menu-item>
              <el-menu-item index="3-4" @click="updateSearchKey('折叠刀')">折叠刀</el-menu-item>
              <el-menu-item index="3-5" @click="updateSearchKey('穿肠刀')">穿肠刀</el-menu-item>
              <el-menu-item index="3-6" @click="updateSearchKey('猎杀者匕首')">猎杀者匕首</el-menu-item>
              <el-menu-item index="3-7" @click="updateSearchKey('刺刀')">M9、刺刀</el-menu-item>
              <el-menu-item index="3-8" @click="updateSearchKey('爪子刀')">爪子刀</el-menu-item>
              <el-menu-item index="3-9" @click="updateSearchKey('暗影双匕')">暗影双匕</el-menu-item>
              <el-menu-item index="3-10" @click="updateSearchKey('短剑')">短剑</el-menu-item>
              <el-menu-item index="3-11" @click="updateSearchKey('熊刀')">熊刀</el-menu-item>
              <el-menu-item index="3-12" @click="updateSearchKey('折刀')">折刀</el-menu-item>
              <el-menu-item index="3-13" @click="updateSearchKey('锯齿爪刀')">锯齿爪刀</el-menu-item>
              <el-menu-item index="3-14" @click="updateSearchKey('海豹短刀')">海豹短刀</el-menu-item>
              <el-menu-item index="3-15" @click="updateSearchKey('系绳匕首')">系绳匕首</el-menu-item>
              <el-menu-item index="3-16" @click="updateSearchKey('求生匕首')">求生匕首</el-menu-item>
              <el-menu-item index="3-17" @click="updateSearchKey('流浪者匕首')">流浪者匕首</el-menu-item>
              <el-menu-item index="3-18" @click="updateSearchKey('骷髅匕首')">骷髅匕首</el-menu-item>

            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i><img src="../assets/shoutao.png" width="40" height="25">&nbsp&nbsp&nbsp&nbsp</i>
              <span>手套</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" @click="updateSearchKey('血猎手套')">血猎手套</el-menu-item>
              <el-menu-item index="4-2" @click="updateSearchKey('驾驶手套')">驾驶手套</el-menu-item>
              <el-menu-item index="4-3" @click="updateSearchKey('手部束带')">手部束带</el-menu-item>
              <el-menu-item index="4-4" @click="updateSearchKey('摩托手套')">摩托手套</el-menu-item>
              <el-menu-item index="4-5" @click="updateSearchKey('专业手套')">专业手套</el-menu-item>
              <el-menu-item index="4-6" @click="updateSearchKey('运动手套')">运动手套</el-menu-item>
              <el-menu-item index="4-7" @click="updateSearchKey('九头蛇手套')">九头蛇手套</el-menu-item>
              <el-menu-item index="4-7" @click="updateSearchKey('狂牙手套')">狂牙手套</el-menu-item>

            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i><img src="../assets/chongfengqiang.png" width="40" height="25">&nbsp&nbsp&nbsp&nbsp</i>
              <span>微冲</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" @click="updateSearchKey('P90')">P90</el-menu-item>
              <el-menu-item index="5-2" @click="updateSearchKey('MAC-10')">MAC-10</el-menu-item>
              <el-menu-item index="5-3" @click="updateSearchKey('UMP-45')">UMP-45</el-menu-item>
              <el-menu-item index="5-4" @click="updateSearchKey('MP7')">MP7</el-menu-item>
              <el-menu-item index="5-5" @click="updateSearchKey('PP-野牛')">PP-野牛</el-menu-item>
              <el-menu-item index="5-6" @click="updateSearchKey('MP9')">MP9</el-menu-item>
              <el-menu-item index="5-7" @click="updateSearchKey('MP5-SD')">MP5-SD</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </el-col>
    <!-- 内容   -->
    <el-col
        :align="'top'"
        :span="3"
        v-for="(o, index) in itemList"
        :key="o.id"
        :offset="index > 0 ? 1 : 0"
        style="margin: 10px"
    >
      <el-card :body-style="{ padding: '0.5px' }" shadow="hover">
        <router-link :to="{ name: 'Content', query: { name: o.name } }" class="button">
          <img :src="'data:image/png;base64,' + o.icon_data.data" class="image">
        </router-link>
        <div class="text-container">
          <router-link :to="{ name: 'Content', query: { name: o.name } }">
            <el-button type="text" class="button" placement="top-start"
                       :title="o.name"
                       width="200"
                       trigger="hover">
              <span style="white-space: break-spaces" class="hoverText">{{ o.name }}</span>
            </el-button>
          </router-link>
        </div>
      </el-card>
    </el-col>

    <!--分页-->
    <el-col>
      <el-pagination
          background
          layout="prev, pager, next"
          :total="totalItems"
          :page-size="pageSize"
          @current-change="handlePageChange"
          :current-page="currentPage"
      >
      </el-pagination>
    </el-col>
  </el-row>

</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.searchKey = this.$route.query.searchKey || '';
    window.addEventListener('scroll', this.handleScroll);
    this.handleRouteChange(this.$route);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  data() {
    return {
      imgbase: "",
      itemList: [],
      pageSize: 24,
      currentPage: 1,
      totalItems: 0,
      loading: false,
    };
  },

  methods: {

    fetchDataOrSearchData(searchKey = null) {
      this.loading = true;
      const url = searchKey ? 'http://localhost:8081/api/search' : 'http://localhost:8081/api/getItemData';
      axios
          .get(url, {
            params: {
              page: this.currentPage,
              pageSize: this.pageSize,
              searchKey: searchKey || this.searchKey,
            },
          })
          .then(response => {
            this.itemList = response.data.items;
            this.totalItems = response.data.totalItems;
            this.loading = false;
          })
          .catch(error => {
            console.log(error);
            this.loading = false;
          });
    },

    handlePageChange(page) {
      this.currentPage = page;
      this.$router.push({ query: { ...this.$route.query, page: this.currentPage } })
          .then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Call fetchDataOrSearchData with the searchKey to decide the type of request
            this.fetchDataOrSearchData(this.searchKey);
          })
          .catch(err => {
            if (err.name !== 'NavigationDuplicated') {
              throw err;
            }
          });
    },

    handleRouteChange(to) {
      this.searchKey = to.query.searchKey || '';
      this.currentPage = Number(to.query.page) || 1;
      this.fetchDataOrSearchData(this.searchKey);
    },
  },

  watch: {
    $route(to, from) {
      this.handleRouteChange(to);
    },
  },
};
</script>




<style scoped>

.text-container {

  display: inline-block;
  max-width: 200px;

}

.hoverText:hover {
  color: chocolate;
}

/*菜单属性*/
.sidebar {
  height: 1400px;
  width: 220px;
  float: left;
  margin-right: 20px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  text-align: center;
  width: 100%;
  display: block;
  background: url("~@/views/item_bg.png");
  background-size: cover
}


</style>
