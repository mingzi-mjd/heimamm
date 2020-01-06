<template>
  <div class="subject-container">
    <el-card class="box-card top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline top-form">
        <el-form-item class="fist-item" label="学科编号">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item class="two-item" label="学科名称">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item class="three-item" label="创建者">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item class="four-item" label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            <i class="el-icon-plus"></i> 新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card bottom">
      <el-table class="bottom-table" :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.serial }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学科编号" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学科名称">
          <template slot-scope="scope">
            <span>{{ scope.row.subjectName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="简称">
          <template slot-scope="scope">
            <span>{{ scope.row.abbreviation }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建者">
          <template slot-scope="scope">
            <span>{{ scope.row.creator }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.state }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">禁用</el-button>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          serial: "1", //序号
          number: "王小虎", // 学科编号
          subjectName: "上海市普陀区金沙江路 1518 弄", // 学科名称
          abbreviation: "前端", // 简称
          creator: "我自己", // 创建者
          date: "日期", // 创建日期
          state: "禁用" // 状态
        },
        {
          serial: "2",
          number: "王小虎",
          subjectName: "上海市普陀区金沙江路 1517 弄",
          abbreviation: "前端",
          creator: "我自己",
          date: "日期",
          state: "禁用"
        },
        {
          serial: "3",
          number: "王小虎",
          subjectName: "上海市普陀区金沙江路 1519 弄",
          abbreviation: "前端",
          creator: "我自己",
          date: "日期",
          state: "禁用"
        },
        {
          serial: "4",
          number: "王小虎",
          subjectName: "上海市普陀区金沙江路 1516 弄",
          abbreviation: "前端",
          creator: "我自己",
          date: "日期",
          state: "禁用"
        }
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    onSubmit() {
      window.console.log("submit!");
    },

    // 分页组件
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang='less'>
.subject-container {
  .top {
    height: 100px;
    display: flex;
    align-items: center;
    background-color: #fff;
    margin-bottom: 20px;
    .el-form-item.fist-item {
      margin-left: 20px;
    }
    .el-form-item {
      margin-right: 11px;
    }
  }
  .bottom {
    .bottom-table {
      margin-bottom: 30px;
    }
    .block {
      text-align: center;
    }
  }
}
</style>