<template>
    <div class="download">
      <h1>下载</h1>
      <button type="button" @click="downloadClick" class="btn btn-primary">下载信息</button>
    </div>
</template>

<script>
import {APP_CONSTANT} from '../../../static/js/app.constant'
import $ from 'jquery'
export default {
  name: 'download',
  mounted () {
    $(document).scrollTop(0)
  },
  methods: {
    // 下载事件点击
    downloadClick: function () {
      var that = this
      var xhr = new XMLHttpRequest()
      var companyId = localStorage.getItem('YASUserCompanyId')
      var userName = localStorage.getItem('YASUserName')
      xhr.open('POST', APP_CONSTANT.API_HOST + '/downloadform.do', true) // 也可以使用POST方式，根据接口
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
      xhr.send('{"username":"' + userName + '","companyid": "' + companyId + '"}')
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
    }
  }
}
</script>

<style scoped>
.download>h1{
  margin-top: 0;
  padding-top: 20px;
}
</style>
