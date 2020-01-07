<template>
<!-- 权限模块 -->
  <div class="jurisdiction-container">
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
          <el-button type="primary" @click="dialogFormVisible = true">
            <i class="el-icon-plus"></i> 新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card bottom">
      <el-table class="bottom-table" :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column label="学科编号">
          <template slot-scope="scope">
            <span>{{ scope.row.rid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="学科名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="简称">
          <template slot-scope="scope">
            <span>{{ scope.row.short_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建者">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">
            <span>{{ scope.row.update_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="handleDisabled(scope.row)"
            >{{scope.row.status === 0 ? "启用" : "禁用"}}</el-button>
            <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="新增学科"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      width="600px"
      :center="true"
      top="20vh"
      custom-class="form-title"
    >
      <el-form :model="addForm" :rules="addRules" ref="addForm" class="formContent">
        <el-form-item label="学科编号" prop="scienceid" class="addForm-one">
          <el-input v-model="addForm.scienceid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="sciencename" class="addForm-two">
          <el-input v-model="addForm.sciencename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="abbreviation">
          <el-input v-model="addForm.abbreviation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科介绍" prop="introduce">
          <el-input v-model="addForm.introduce" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
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
      tableData: [],
      currentPage: 1,
      pageSizes: [10, 20, 30, 40, 50], // 每页的可选页数选项
      pageSize: 10, // 每页显示条目个数
      total: 0, // 总数据

      page: 0,
      pageList: 0,

      //  弹出的表单
      dialogTableVisible: false,
      dialogFormVisible: false,
      addForm: {
        scienceid: "", // 学科编号
        sciencename: "", // 学科名称
        abbreviation: "", // 学科简称
        introduce: "", // 学科介绍
        remark: "" // 学科备注
      },
      addRules: {
        scienceid: [
          { required: true, message: "学科编号不能为空", trigger: "blur" }
        ],
        sciencename: [
          { required: true, message: "学科名称不能为空", trigger: "blur" },
          {
            min: 3,
            max: 8,
            message: "学科名称长度为3~8个字符",
            trigger: "blur"
          }
        ]
      },
      flag: false
    };
  },
  methods: {
    onSubmit() {},
     // 分页组件
    handleSizeChange(pageList) {
      window.console.log(`每页 ${pageList} 条`);
      this.pageSize = pageList;
      this.page = 1;
      this.getList();
    },
    handleCurrentChange(page) {
      window.console.log(`当前页: ${page}`);
      this.page = page;
      this.getList();
    },
  },
}
</script>

<style lang='less'>
.jurisdiction-container {
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
  .el-form.formContent {
    .el-form-item {
      display: flex;
      justify-content: space-between;
      .el-input {
        .el-input__inner {
          width: 460px;
        }
      }
    }
    .addForm-one {
      .el-form-item__label {
        margin-left: -7px;
      }
    }
    .addForm-two {
      .el-form-item__label {
        margin-left: -7px;
      }
    }
  }
  .el-dialog__header {
    background: linear-gradient(
      to right,
      rgba(1, 198, 250, 1),
      rgba(20, 147, 250, 1)
    );
    .el-dialog__title {
      color: #fff;
    }
  }
}
</style>