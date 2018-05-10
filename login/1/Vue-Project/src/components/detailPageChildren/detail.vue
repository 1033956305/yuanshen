<template>
  <div class="detailPages">
    <h1>详情查看</h1>
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
    </table>
    <div id="Pagination" class="pagination"><!-- 这里显示分页 --></div>
    <div class="tip" v-show="tipShow">
      正在加载中...
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import 'jquery.pagination/dist/jquery.pagination.css'
import 'jquery.pagination/dist/jquery.pagination'
import {APP_CONSTANT} from '../../../static/js/app.constant'
export default {
  name: 'detail',
  data () {
    return {
      tableInfos: [],
      tipShow: true
    }
  },
  mounted () {
    var companyId = localStorage.getItem('YASUserCompanyId')
    var userName = localStorage.getItem('YASUserName')
    var num = 1
    var that = this
    $.ajax({
      url: APP_CONSTANT.DETAILURL,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: '{"username":"' + userName + '","companyid": "' + companyId + '","pagenum":"' + num + '","pagesize":"6"}',
      beforeSendL: function () {
        console.log(123)
      },
      success: function (result) {
        if (result[0]) {
          that.tipShow = false
          that.tableInfos = result
          that.init(result[0].totalpages)
        } else {
          that.tipShow = true
          that.tableInfos = []
        }
      },
      error: function (result) {
        that.error = '请输入正确的用户名和密码'
      }
    })
    console.log(companyId)
  },
  methods: {
    init (totalNum) {
      var num = totalNum || 1
      var that = this
      var companyId = localStorage.getItem('YASUserCompanyId')
      var userName = localStorage.getItem('YASUserName')
      var initPagination = function (num) {
        // 创建分页
        var prevNum = 0
        var pageStart = 0
        if (num <= 4) {
          prevNum = 0
          pageStart = 0
        } else {
          prevNum = num - 3
          pageStart = num - 1
        }
        $('#Pagination').pagination({
          pageTotal: num,
          pageStart: pageStart,
          count: 0,
          prevCount: prevNum,
          jump: true,
          coping: false,
          prevContent: '<上一页',
          nextContent: '下一页>',
          jumpBtn: '确定',
          callback: function (api) {
            console.log(api)
            that.tipShow = true
            // 请求分页数据
            $.ajax({
              url: APP_CONSTANT.DETAILURL,
              type: 'POST',
              dataType: 'json',
              contentType: 'application/json',
              data: '{"username":"' + userName + '","companyid": "' + companyId + '","pagenum":"' + api.getCurrent() + '","pagesize":"6"}',
              success: function (result) {
                that.tipShow = false
                that.tableInfos = result
                $(document).scrollTop(0)
              },
              error: function (result) {
                that.error = '请输入正确的用户名和密码'
              }
            })
          }
        })
      }
      initPagination(num)
    }
  }
}
</script>

<style scoped>
  .detailPages {
    padding-top: 15px;
    margin-bottom: 60px;
  }
  .detailPages>h1{
    margin-top: 0;
  }
  table{
    margin: 0 auto 20px;
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
</style>
