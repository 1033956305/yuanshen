<template>
    <div class="container">
      <!--<div @click="change">条件查询</div>-->
      <section class="searchCondition container" >
        <div class="row">
          <div class="col-md-2">查询方式</div>
          <div class="col-md-4">
            <div class="btn-group">
              <select class="form-control" v-model="queryMethod">
                <option value="3">请选择查询方式</option>
                <option v-for="(item, key, index) in conditions" v-bind:key="index" v-bind:value="key">
                  {{item}}
                </option>
              </select>
            </div>
          </div>
          <!--<div class="col-md-offset-4" v-show="stateControl.personalSearch">-->
            <!--<button class="btn btn-warning" @click="search">搜索</button>-->
          <!--</div>-->
        </div>

        <div class="conditions" v-show="stateControl.conditionShow">
          <div class="row">
            <div class="col-md-2">查询条件：</div>
            <div class="col-md-offset-8 col-md-2" v-bind:class="conditionClass" @click="conditionShow">{{conditionState}}</div>
          </div>
          <div class="condition-items" v-bind:class="{ limit: stateControl.limit }">
            <div class="row">
              <div class="col-md-2 col-sm-4">部门</div>
              <div class="col-md-4 col-sm-8">
                <div class="btn-group">
                  <select class="form-control" v-model="deptId">
                    <option value="未选择">请选择部门</option>
                    <option v-for="(item, key) in department" v-bind:key="key" v-bind:value="item.deptId">
                      {{item.name}}
                    </option>
                  </select>
                </div>
              </div>
              <div ><!--v-show="stateControl.personShow"-->
                <div class="col-md-2 col-sm-4">报销人</div>
                <div class="col-md-4 col-sm-8">
                  <div class="btn-group">
                    <!--<input type="text" class="form-control" v-model="searchInfo.reimbursement">-->
                    <input type="text" class="form-control" v-model="searchInfo.signature">
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-show="stateControl.financeShow">
              <div class="col-md-2 col-sm-4">报销总金额</div>
              <div class="col-md-2 col-sm-4">
                <div class="btn-group">
                  <input type="number" class="form-control" placeholder="最小值" v-model="totalAmountMoreThan">
                </div>
              </div>
              <div class="col-md-2 col-sm-4">
                <div class="btn-group">
                  <input type="number" class="form-control" placeholder="最大值" v-model="searchInfo.totalAmountLessThan">
                </div>
              </div>
              <div v-show="stateControl.limitShow">
                <div class="col-md-2 col-sm-4">报销限额</div>
                <div class="col-md-4 col-sm-8">
                  <div class="btn-group data">
                    <input type="number" class="form-control" v-model="searchInfo.reimbursement_limit">
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-show="stateControl.financeShow">
              <div class="col-md-2 col-sm-4">项目</div>
              <div class="col-md-6">
                <div class="btn-group">
                  <div class="col-md-4">
                    <select class="form-control" v-model="selected1">
                      <option value="未选择">请选择类型</option>
                      <option v-for="(item, key, index) in projectInfos" v-bind:key="index" :data-id="key" v-bind:value="item.deptReimRightId">
                        {{item.deptReimRightName}}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <select class="form-control" v-model="selected2">
                      <option value="未选择">请选择类型</option>
                      <option v-for="(item2, key2) in projectInfos2" v-bind:key="key2" v-bind:value="item2.category">
                        {{item2.categoryName}}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <select class="form-control" v-model="selected3">
                      <option value="未选择">请选择类型</option>
                      <option v-for="(item3, key3) in projectInfos3" v-bind:key="key3" v-bind:value="item3.item">
                        {{item3.itemName}}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-2 col-sm-4">事由</div>
              <div class="col-md-2 col-sm-8">
                <div class="btn-group">
                  <input type="text" class="form-control" v-model="searchInfo.remark">
                </div>
              </div>
            </div>
            <div class="row"  v-show="stateControl.financeShow">
              <div class="col-md-2 col-sm-4">日期</div>
              <div class="col-md-4">
                <div class="btn-group data">
                  <input type="number" style="width: 30%" placeholder="年" class="form-control" v-model="searchInfo.year">-
                  <input type="number" style="width: 30%" placeholder="月" class="form-control" v-model="searchInfo.month">-
                  <input type="number" style="width: 30%" placeholder="日" class="form-control" v-model="searchInfo.day">
                </div>
              </div>
              <div class="col-md-2 col-sm-4">单笔金额</div>
              <div class="col-md-4 col-sm-8">
                <div class="btn-group">
                  <input type="number" class="form-control" v-model="searchInfo.singleAmount">
                </div>
              </div>

            </div>
            <div class="row"  v-show="stateControl.financeShow">
              <div class="col-md-2 col-sm-4">领导及审批人</div>
              <div class="col-md-4 col-sm-8">
                <div class="btn-group">
                  <input type="text" class="form-control" v-model="searchInfo.leaders">
                </div>
              </div>
              <div class="col-md-2 col-sm-4">审查意见</div>
              <div class="col-md-4 col-sm-8">
                <div class="btn-group">
                  <input type="text" class="form-control" v-model="searchInfo.review_opinion">
                </div>
              </div>
            </div>
            <div class="row"  v-show="stateControl.financeShow">
              <div class="col-md-2 col-sm-4">审批状态</div>
              <div class="col-md-4 col-sm-8">
                <select class="form-control" v-model="isPassApproval">
                  <option value="未选择">请选择</option>
                  <option value="2">审批未通过</option>
                  <option value="0">审批中</option>
                  <option value="1">审批通过</option>
                </select>
              </div>
              <div class="col-md-2 col-sm-4">原借款</div>
              <div class="col-md-4 col-sm-8">
                <div class="btn-group">
                  <input type="number" class="form-control" v-model="searchInfo.original_loan">
                </div>
              </div>
            </div>
            <div class="row"  v-show="stateControl.financeShow">
              <div class="col-md-2 col-sm-4">应退余额</div>
              <div class="col-md-4 col-sm-8">
                <div class="btn-group">
                  <input type="number" class="form-control" v-model="searchInfo.refundable">
                </div>
              </div>
              <div class="col-md-2 col-sm-4">应补差额</div>
              <div class="col-md-4 col-sm-8">
                <div class="btn-group">
                  <input type="number" class="form-control" v-model="searchInfo.supplement_difference">
                </div>
              </div>
            </div>
            <!--<div class="row"  v-show="stateControl.financeShow">-->
              <!--<div class="col-md-2">审批状态</div>-->
              <!--<div class="col-md-4">-->
                <!--<select class="form-control" v-model="searchInfo.IsPassApproval">-->
                  <!--<option value="未选择">请选择</option>-->
                  <!--<option value="审批未通过">审批未通过</option>-->
                  <!--<option value="审批中">审批中</option>-->
                  <!--<option value="审批完成">审批通过</option>-->
                <!--</select>-->
              <!--</div>-->
              <!--<div class="col-md-2">已报销状态</div>-->
              <!--<div class="col-md-4">-->
                <!--<select class="form-control">-->
                  <!--<option value="未选择">请选择</option>-->
                  <!--<option value="未报销">未报销</option>-->
                  <!--<option value="报销中">报销中</option>-->
                  <!--<option value="已报销">已报销</option>-->
                <!--</select>-->
              <!--</div>-->
            <!--</div>-->
            <div class="row">
              <div class="col-md-8">
                提示: 您可选择一个或多个条件进行查询，并支持字段模糊查询哦！
              </div>
              <div class="col-md-4">
                <button class="btn btn-warning" @click="search">搜索</button>
              </div>
            </div>
          </div>

        </div>
        <table border="1" v-for="(item, key, index) in tableInfos" v-bind:key="index">
          <tr>
            <th colspan="2" align="center">费用项目</th>
            <th colspan="3" align="center">事由概要</th>
            <th>金额</th>
          </tr>
          <tr v-for="(cost_item, key1, index1) in item.cost_items" v-bind:key="index1">
            <td colspan="2">{{cost_item.name}}</td>
            <td colspan="3">{{cost_item.detail}}</td>
            <td>{{cost_item.cost}}</td>
          </tr>
          <tr>
            <td colspan="2">报销金额合计</td>
            <td colspan="3">{{item.amount_capital}}</td>
            <td>{{item.cost_total}}</td>
          </tr>
          <tr>
            <td>领导及审批人</td>
            <td>{{item.leaders}}</td>
            <td>审查意见</td>
            <td>{{item.review_opinion}}</td>
            <td>报销人签章</td>
            <td>{{item.signature}}</td>
          </tr>
          <tr>
            <td>原借款</td>
            <td>{{item.original_loan}}</td>
            <td>应退余额</td>
            <td>{{item.refundable}}</td>
            <td>应补差额</td>
            <td>{{item.supplement_difference}}</td>
          </tr>
          <tr>
            <td colspan="6">
              <button class="btn btn-success" @click="downloadClick(item.formId)">下载查看相关附件</button>
            </td>
          </tr>
        </table>
        <table border="1" v-show="stateControl.limitTable">
          <tr>
            <th>部门</th>
            <th>人员</th>
            <th>报销限额</th>
            <th>报销总金额</th>
          </tr>
          <tr v-for="(item, key, index) in limitInfos" v-bind:key="index">
            <td>{{item.deptName}}</td>
            <td>{{item.userName || '无'}}</td>
            <td>{{item.limitQuota || '无'}}</td>
            <td>{{item.totalQuota}}</td>
          </tr>
        </table>
      </section>

      <pagingDiv :child-msg="msg" @upup="pageChange" v-show="stateControl.paging"></pagingDiv>
      <div class="tip" v-show="tipShow">
        正在加载中...
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
import pagingDiv from '../pagingComponent/paging'
import {APP_CONSTANT} from '../../../static/js/app.constant'
export default {
  name: 'searchPage',
  components: {
    'pagingDiv': pagingDiv
  },
  data () {
    return {
      msg: 1,
      queryMethod: 3,
      conditions: ['报销单查询', '报销限额查询'],
      department: [],
      paging: false,
      project: '请选择',
      projectInfos: [],
      projectInfos2: [],
      projectInfos3: [],
      conditionState: '隐藏',
      tip: '您可以输入单/多个条件进行查询，例如: 张三 2018-1-2 2000元',
      tableInfos: [],
      limitInfos: [],
      tipShow: false,
      selected1: '未选择',
      selected2: '未选择',
      selected3: '未选择',
      isPassApproval: '未选择',
      deptId: '未选择',
      stateControl: {
        personShow: true, // 报销人
        limitShow: true, // 限额
        limit: true,
        limitTable: false, // 限额表单
        financeShow: true, // 财务
        conditionShow: false, // 查询条件
        personalSearch: false, // 个人查询
        paging: false // 分页
      },
      totalAmountMoreThan: null,
      searchInfo: {
        queryMethod: 3, // 查询方式
        reimbursement: '', // 报销人
        remark: '', //  事由概要
        singleAmount: null, // 单笔报销金额
        totalAmountMoreThan: null,
        totalAmountLessThan: null,
        reimbursement_limit: null, // 报销限额
        leaders: null, // 领导及审批人签章
        review_opinion: '', // 审查意见
        signature: null, // 报销人签章
        original_loan: null, // 原借款
        refundable: null, // 应退余额
        supplement_difference: null, // 应补差额
        deptId: '未选择', // 部门
        year: '',
        month: '',
        day: '', // 年月日
        isPassApproval: '未选择', // 审批状态
        reimbursement_state: '未选择', // 报销状态
        username: null,
        companyid: null,
        pagenum: '1',
        pagesize: '6'
      }
    }
  },
  computed: {
    conditionClass: function () {
      return {
        'conditionHide': this.conditionState === '隐藏',
        'conditionShow': this.conditionState === '显示'
      }
    },
    projectId: function () {
      return [this.selected1 === '未选择' ? null : this.selected1, this.selected2 === '未选择' ? null : this.selected2, this.selected3 === '未选择' ? null : this.selected3]
    }
  },
  mounted () {
    var that = this
    var userCompanyId = localStorage.getItem('YASUserCompanyId')
    var userName = localStorage.getItem('YASUserName')
    if (!userCompanyId || !userName) {
      that.$router.push({path: '/login'})
    }
    $(document).scrollTop(0)
    $.ajax({
      url: APP_CONSTANT.API_HOST + '/selectdept.do',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: '{"username":"' + userName + '","companyid": "' + userCompanyId + '"}',
      success: function (res) {
        console.log(res)
        that.department = res
      }
    })
    $.ajax({
      url: APP_CONSTANT.API_HOST + '/selecproject.do',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: '{"username":"' + userName + '","companyid": "' + userCompanyId + '"}',
      success: function (res) {
        console.log(res)
        $.each(res, function (n, k) {
          if (that.projectInfos[k.categoryName]) {
            that.projectInfos[k.categoryName].push(k)
          } else {
            that.$set(that.projectInfos, k.categoryName, [k])
          }
        })
        that.projectInfos = res
        console.log(that.projectInfos['业务招待费'])
        // that.department = res
      }
    })
  },
  methods: {
    pageChange (data) {
      console.log('pageChange')
      this.searchInfo.pagenum = data + ''
      if (this.searchInfo.reimbursement_limit) {
        this.searchInfo.reimbursement_limit = Number(this.searchInfo.reimbursement_limit)
      }
      var that = this
      console.log(localStorage.getItem('YASUserCompanyId'))
      this.searchInfo.companyid = localStorage.getItem('YASUserCompanyId')
      this.searchInfo.username = localStorage.getItem('YASUserName')
      this.searchInfo.isPassApproval = this.isPassApproval && Number(this.isPassApproval)
      this.searchInfo.deptId = this.deptId

      // 报销限额
      for (var k in this.searchInfo) {
        if (this.searchInfo[k] === '未选择' || this.searchInfo[k] === '') {
          this.searchInfo[k] = null
        }
      }
      console.log(this.searchInfo)
      $.ajax({
        url: APP_CONSTANT.API_HOST + '/selectform.do',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(this.searchInfo),
        success: function (res) {
          if (res[0]) {
            that.msg = res[0].totalpages
            that.tableInfos = res
          } else {
            that.msg = 1
            that.tableInfos = []
          }
        }
      })
    },
    conditionShow () {
      if (this.conditionState === '显示') {
        console.log($('.condition-items'))
        $('.condition-items').removeClass('cHide')
      } else {
        $('.condition-items').addClass('cHide')
      }
      this.conditionState = (this.conditionState === '显示' ? '隐藏' : '显示')
    },
    clearInput () {
      this.searchInfo = {
        queryMethod: 3, // 查询方式
        reimbursement: '', // 报销人
        remark: '', //  事由概要
        singleAmount: null, // 单笔报销金额
        totalAmountMoreThan: null,
        totalAmountLessThan: null,
        reimbursement_limit: null, // 报销限额
        leaders: null, // 领导及审批人签章
        review_opinion: '', // 审查意见
        signature: null, // 报销人签章
        original_loan: null, // 原借款
        refundable: null, // 应退余额
        supplement_difference: null, // 应补差额
        deptId: '未选择', // 部门
        year: '',
        month: '',
        day: '', // 年月日
        isPassApproval: '未选择', // 审批状态
        reimbursement_state: '未选择', // 报销状态
        username: null,
        companyid: null,
        pagenum: '1',
        pagesize: '6'
      }
    },
    change (data) {
      this.msg = 5
      // console.log(data)
    },
    download (res) {
      console.log(this.downloadClick)
    },
    // 下载事件点击
    downloadClick: function (formId) {
      var formIdList = [formId]
      console.log(formIdList)
      // return
      var that = this
      var xhr = new XMLHttpRequest()
      // var companyId = localStorage.getItem('YASUserCompanyId')
      // var userName = localStorage.getItem('YASUserName')
      xhr.open('POST', APP_CONSTANT.API_HOST + '/downloadbyformid.do', true) // 也可以使用POST方式，根据接口
      xhr.responseType = 'blob' // 返回类型blob
      xhr.setRequestHeader('Content-type', 'application/json')
      // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
      xhr.onload = function () {
        // 请求完成
        if (this.status === 200) {
          // 返回200
          var blob = this.response
          // return
          that.downloadFile('test.zip', blob)
        } else {
          that.error = '下载失败'
        }
      }
      // 发送ajax请求
      xhr.send('{"formIdList":[' + formId + ']}')
    },
    // 下载文件
    downloadFile: function (fileName1, content) {
      var blob = new Blob([content], {
        type: 'application/zip'
      })
      var fileName = fileName1 || '123.zip'
      downFile(blob, fileName)
      // 下载格式
      function downFile (blob, fileName) {
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob)
        } else {
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          // link.download = fileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      }
    },
    img () {
      var xhr = new XMLHttpRequest()
      xhr.open('POST', APP_CONSTANT.API_HOST + '/test.do', true) // 也可以使用POST方式，根据接口
      xhr.responseType = 'blob' // 返回类型blob
      xhr.setRequestHeader('Content-type', 'application/json')
      // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
      xhr.onload = function () {
        // 请求完成
        if (this.status === 200) {
          // 返回200
          var reader = new window.FileReader()
          reader.readAsDataURL(this.response)
          reader.onloadend = function () {
            var base64data = reader.result
            console.log(base64data)
          }
        } else {
          // that.error = '下载失败'
        }
      }
      // 发送ajax请求
      xhr.send('{"username":"admin","companyid": "4"}')
    },
    projectSelect (e) {
      console.log($(e.target).siblings('.dropdown-menu'))
      if ($(e.target).siblings('.dropdown-menu').length === 0) {
        this.project = e.target.innerText
      } else {
        $('.nav>.dropdown').addClass('open')
      }
    },
    search () {
      console.log('search')
      this.searchInfo.projectId = this.projectId
      this.searchInfo.totalAmountMoreThan = this.totalAmountMoreThan
      if (this.searchInfo.totalAmountLessThan && this.searchInfo.totalAmountMoreThan && (this.searchInfo.totalAmountLessThan < this.searchInfo.totalAmountMoreThan)) {
        this.searchInfo.totalAmountMoreThan = null
        this.totalAmountMoreThan = null
      }
      this.searchInfo.isPassApproval = this.isPassApproval && Number(this.isPassApproval)
      this.searchInfo.deptId = this.deptId
      $(document).scrollTop(0)
      // 报销限额
      for (var k in this.searchInfo) {
        if (this.searchInfo[k] === '未选择' || this.searchInfo[k] === '') {
          this.searchInfo[k] = null
        }
      }
      if (this.searchInfo.reimbursement_limit) {
        this.searchInfo.reimbursement_limit = Number(this.searchInfo.reimbursement_limit)
      }
      console.log(this.IsPassApproval)
      this.searchInfo.companyid = localStorage.getItem('YASUserCompanyId')
      this.searchInfo.username = localStorage.getItem('YASUserName')
      console.log(JSON.stringify(this.searchInfo))
      var that = this
      that.tipShow = true
      if (this.queryMethod === 0) {
        this.searchInfo.queryMethod = '报销单查询'
        this.stateControl.limitTable = false
        $.ajax({
          url: APP_CONSTANT.API_HOST + '/selectform.do',
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify(this.searchInfo),
          success: function (res) {
            that.tipShow = false
            if (res[0]) {
              that.msg = res[0].totalpages
              that.tableInfos = res
            } else {
              that.msg = 1
              that.tableInfos = []
            }
            that.stateControl.paging = true
            // that.department = res
          }
        })
      } else if (this.queryMethod === 1) {
        this.searchInfo.queryMethod = '报销限额查询'
        this.stateControl.limitTable = true
        $.ajax({
          url: APP_CONSTANT.API_HOST + '/selectquota.do',
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify(this.searchInfo),
          success: function (res) {
            that.tipShow = false
            that.stateControl.limitTable = true
            if (res[0]) {
              that.limitInfos = res
            } else {
              that.limitInfos = [{'deptName': '无', 'userName': '无', 'totalQuota': '无', 'limitQuota': '无'}]
            }

            that.tableInfos = []
            that.stateControl.paging = false
            // that.department = res
          }
        })
      }
    }
  },
  watch: {
    queryMethod: function (newInfo, oldInfo) {
      console.log(newInfo)
      if (newInfo === 0) {
        this.stateControl.personShow = false
        this.stateControl.limitShow = false
        this.stateControl.financeShow = true
        this.stateControl.conditionShow = true
        this.stateControl.personalSearch = false
        this.clearInput()
        this.msg = 1
        this.stateControl.limit = false
        this.stateControl.limitTable = false
        this.tableInfos = []
      } else if (newInfo === 1) {
        this.stateControl.personShow = true
        this.stateControl.limitShow = true
        this.stateControl.financeShow = false
        this.stateControl.conditionShow = true
        this.stateControl.personalSearch = false
        this.stateControl.limit = true
        this.stateControl.limitTable = false
        this.clearInput()
        this.msg = 2
        this.tableInfos = []
      } else if (newInfo === '3') {
        this.stateControl.conditionShow = false
        this.stateControl.personalSearch = false
        this.clearInput()
        this.msg = 3
        this.stateControl.limit = false
        this.stateControl.limitTable = false
        this.tableInfos = []
      }
      this.stateControl.paging = false
    },
    // 费用类型1
    selected1: function (newInfo, oldInfo) {
      console.log(newInfo)
      if (newInfo !== oldInfo && newInfo !== '未选择') {
        console.log(this.projectInfos[this.selected1 - 1])
        this.projectInfos2 = this.projectInfos[this.selected1 - 1].reimCatagoryArrayList
        this.selected3 = '未选择'
      } else if (newInfo === '未选择') {
        this.projectInfos2 = []
        this.selected3 = '未选择'
      }
      this.selected2 = '未选择'
    },
    // 费用类型2
    selected2: function (newInfo, oldInfo) {
      if (newInfo !== oldInfo && newInfo !== '未选择') {
        console.log(this.projectInfos[this.selected1 - 1])
        this.projectInfos3 = this.projectInfos[this.selected1 - 1].reimCatagoryArrayList[this.selected2 - 2].itemArrayList
      } else if (newInfo === '未选择') {
        this.projectInfos3 = []
        this.selected3 = '未选择'
      }
      this.selected3 = '未选择'
    },
    totalAmountMoreThan: function (newInfo, oldInfo) {
      console.log(newInfo)
      if (this.searchInfo.totalAmountLessThan && newInfo > this.searchInfo.totalAmountLessThan) {
        console.log(newInfo)
        this.totalAmountMoreThan = null
      }
    }
  }
}
// console.log(App)
</script>

<style scoped>
input{
  line-height: 28px;
}
.data>input{
  display: inline-block;
}
div.container{
  padding-top: 25px;
}
section{
  padding: 15px;
  background-color: #fff;
  border-radius: 15px;
}
.btn-group{
  width: 100%;
}
.row{
  line-height: 34px;
  margin: 0 130px;
  border-bottom: 1px dashed rgb(204 204 204);
  padding: 8px 0;
}
table{
  margin: 15px auto 20px;
  width: 800px;
  border: 1px solid #000;
  border-collapse: collapse;
}
td{
  text-align: left;
  padding: 5px 10px;
}
th{
  text-align: center;
}
.tip{
  position: absolute;
  top: 170px;
  left: 50%;
  width: 200px;
  color: #fff;
  background-color: rgba(50,50,50,0.5);
  padding: 10px;
  transform: translate(-50%,0%);
}

.condition-items{
  height: 438px;
  /*overflow: hidden;*/
  /*transition: all 1s ease;*/
}
@media (max-width: 992px) {
  .condition-items{
    height: 900px;
  }
}
.condition-items.limit{
  height: 160px;
}
.condition-items.cHide{
  height: 8px;
  overflow: hidden;
}
.conditions{
  margin-bottom: -20px;
}
/*向下箭头*/
.conditionHide,.conditionShow{
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select:none;
  -ms-user-select:none;
  color: #1588F5;
}
.conditionHide:hover,.conditionShow:hover {
  cursor: pointer;
}
.conditionHide:after,.conditionShow:after{
  content: '';
  width: 10px;
  border: 10px solid transparent;
  border-bottom-color: #999;
  display: block;
  position: absolute;
  top: 2px;
  left: 10%;
}
.conditionShow:after{
  border-bottom-color: transparent;
  border-top-color: #999;
  top: 11px;
}
/*多级下拉*/
.dropdown-submenu {
  position: relative;
}
.dropdown-submenu > .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -6px;
  margin-left: -1px;
  -webkit-border-radius: 0 6px 6px 6px;
  -moz-border-radius: 0 6px 6px;
  border-radius: 0 6px 6px 6px;
}
.dropdown-submenu:hover > .dropdown-menu {
  display: block;
}
.dropdown-submenu > a:after {
  display: block;
  content: " ";
  float: right;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px 0 5px 5px;
  border-left-color: #ccc;
  margin-top: 5px;
  margin-right: -10px;
}
.dropdown-submenu:hover > a:after {
  border-left-color: #fff;
}
.dropdown-submenu.pull-left {
  float: none;
}
.dropdown-submenu.pull-left > .dropdown-menu {
  left: -100%;
  margin-left: 10px;
  -webkit-border-radius: 6px 0 6px 6px;
  -moz-border-radius: 6px 0 6px 6px;
  border-radius: 6px 0 6px 6px;
}
.dropdown>a{
  border: 1px solid #aaa;
  color: #000;
  padding: 6px 17px;
}
.dropdown a {
  cursor: pointer;
}
.btn .caret {
  margin-left: 10px;
}
.btn-group>div{
  padding-left: 0;
}
</style>
