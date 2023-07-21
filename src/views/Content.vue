<template>
  <div>
    <el-container class="container">
      <div class="button1">
        <el-button type="success" plain @click="dialogVisible = true">磨损筛选</el-button>
      </div>

      <el-dialog
          title="磨损筛选"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
        <div class="block">
          <el-slider
              ref="slider"
              v-model="value"
              range
              :marks="marks"
              :max="1"
              :step="0.01"
          >
          </el-slider>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <el-row>
        <div class="button2">
          <el-button @click="drawer = true" type="primary" plain style="margin-left: 16px;">
            印花筛选
          </el-button>
        </div>
        <el-drawer
            title="印花筛选"
            :visible.sync="drawer"
            :with-header="false">
          <span>印花筛选</span>
          <el-button type="primary" plain>确定</el-button>
        </el-drawer>
      </el-row>


      <div class="date-picker">
        <div class="block">
          <el-date-picker
              v-model="value2"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
          </el-date-picker>
        </div>
      </div>

    </el-container>

    <el-main @scroll="handleScroll">

    <div class="eltable">
          <el-table
              :data="productInfo"
              style="width: 100%"
              v-loading="loading">
            <!-- 表格列定义 -->

            <el-table-column prop="name" label="饰品" width="400"></el-table-column>
            <el-table-column label="贴纸" width="500">
              <template slot-scope="scope">
                <div v-for="(sticker, index) in scope.row.stickers" :key="index" class="sticker-container">
                  <img :src="'data:image/jpeg;base64,' + sticker.imgData.data"
                       class="sticker-image"
                       @mouseover="sticker.showName = true"
                       @mouseout="sticker.showName = false">
                  <div class="sticker-info">
                    <span class="sticker-name">{{ sticker.name }}</span>
                    <span class="sticker-wear">{{ Math.floor(100 - sticker.wear) }}%</span>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="itemFloat" label="磨损" width="200"></el-table-column>
            <el-table-column prop="paintSeed" label="模板" width="150"></el-table-column>

            <el-table-column prop="inspectionImg" label="检视图" width="150">
              <template slot-scope="scope">
                <el-image :src="'data:image/jpeg;base64,' + scope.row.inspectionImg.data"
                          :preview-src-list="[ 'data:image/jpeg;base64,' + scope.row.inspectionImg.data ]">
                  <div slot="placeholder" class="image-slot">
                    <img :src="'data:image/jpeg;base64,' + scope.row.inspectionImg.data" width="100" height="100">
                  </div>
                </el-image>
              </template>
            </el-table-column>

            <el-table-column prop="price" label="价格" width="150"></el-table-column>
            <el-table-column label="交易时间" width="200">
              <template slot-scope="scope">
                {{ scope.row.transactionTime.slice(0, 10) }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      <div v-if="hasMore" class="load-more-container">
        <el-button @click="loadMoreData" type="primary">加载更多</el-button>
      </div>
    </el-main>
  </div>



</template>

<script>
import axios from "axios";



export default {

  name: "Content",
  data() {
    return {

      hasMore: true,
      allDataLoaded: false,
      currentPage: 1,
      pageSize: 10,

      productInfo: [],
      loading: false,
      name: '',
      dialogVisible: false,
      drawer: false,
      value: [0.1, 0.5],
      marks: {
        0: {
          style: {
            color: '#1989FA'
          },
          label: this.$createElement('strong', '0')
        },
        0.07: {
          style: {
            color: '#1989FA'
          },
          label: this.$createElement('strong', '0.07')
        },
        0.15: {
          style: {
            color: '#1989FA'
          },
          label: this.$createElement('strong', '0.15')
        },
        0.38: {
          style: {
            color: '#1989FA'
          },
          label: this.$createElement('strong', '0.38')
        },
        0.45: {
          style: {
            color: '#1989FA'
          },
          label: this.$createElement('strong', '0.45'),
        },
        1: {
          style: {
            color: '#1989FA'
          },
          label: this.$createElement('strong', '1'),
        },
      },

      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ''
    };

  },
  mounted() {
    // 调用getData方法
    this.getProductInfo()
  },

  methods: {

    handleScroll(event) {
      const target = event.target;
      const scrollPosition = target.scrollTop + target.clientHeight;
      const scrollHeight = target.scrollHeight;


      if (scrollPosition === scrollHeight) {
        this.currentPage += 1;
        this.getProductInfo();
      }
    },


    handleClose(done) {
      done();
    },
    getProductInfo() {
      this.loading = true;
      const name = encodeURIComponent(this.$route.query.name);
      const page = this.currentPage;
      const pageSize = this.pageSize;

      axios.get(`http://localhost:8081/api/content?name=${name}&page=${page}&pageSize=${pageSize}`)
          .then((response) => {
            console.log(response.data); // 打印返回的数据

            if (response.data.length < this.pageSize) {
              // 如果返回的数据项数量小于 pageSize，说明是最后一页
              this.productInfo.push(...response.data);
              this.hasMore = false;
            }

            if (this.hasMore) {
              this.productInfo.push(...response.data);
              this.hasMore = response.data.length === this.pageSize;
            }

            this.loading = false;

          })
          .catch((error) => {
            console.error(error);
            this.loading = false;
          });
    },

    loadMoreData() {
      if (this.hasMore) {
        this.currentPage += 1;
        this.getProductInfo();
      }
    },
  },
};
</script>

<style scoped>

.container {
  display: grid;
  grid-template-rows: 100px;
  grid-template-columns: 100px 100px 500px; /* 三列的布局 */
  grid-gap: 1px; /* 设置元素之间的间距 */
  justify-content: start;
}

.button1 {
  grid-column: 1; /* 元素放在第一列 */
}

.button2 {
  grid-column: 2; /* 元素放在第二列 */
}

.date-picker {
  grid-column: 3; /* 元素放在第三列 */
  justify-self: end; /* 元素靠右对齐 */
}

.el-table__header {
  line-height: 50px;
}

.eltable {
  padding-top: 25px;
}

/*stickers图片内容*/
.sticker-container {
  display: inline-block;
  width: 50px;
  margin-right: 10px;
  text-align: center;
}

.sticker-image {
  width: 100%;
  height: auto;
}

.sticker-name {
  display: none;
  font-size: 10px;
}

.sticker-container:hover .sticker-name {
  display: block;
}

.sticker-wear {
  display: block;
  font-size: 8px;
}


</style>
