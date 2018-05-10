<template>
  <div class="pagination">分页</div>
</template>

<script>
import $ from 'jquery'
import 'jquery.pagination/dist/jquery.pagination.css'
import 'jquery.pagination/dist/jquery.pagination'
export default {
  name: 'paging',
  props: {
    childMsg: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      totalNum: this.childMsg
    }
  },
  methods: {
    up () {
      this.$emit('upup', 'hehe')
    },
    init (totalNum) {
      var num = totalNum || 1
      var that = this
      // var companyId = localStorage.getItem('YASUserCompanyId')
      // var userName = localStorage.getItem('YASUserName')
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
        $('.pagination').pagination({
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
            that.$emit('upup', api.getCurrent())
            that.tipShow = true
            // 请求分页数据
          }
        })
      }
      initPagination(num)
    }
  },
  mounted () {
    console.log(this.childMsg)
    this.init(this.childMsg)
  },
  watch: {
    childMsg: function (newMsg, oldMsg) {
      console.log(this)
      if (newMsg !== oldMsg) {
        this.init(newMsg)
      }
      // console.log(newMsg)
      // console.log(oldMsg)
    }
  }
}
</script>

<style scoped>

</style>
