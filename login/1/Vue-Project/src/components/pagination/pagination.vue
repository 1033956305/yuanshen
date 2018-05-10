<template>
  <div>
    <div id="Pagination" class="pagination"><!-- 这里显示分页 --></div>
    <div id="Searchresult">分页初始化完成后这里的内容会被替换。</div>
    <div id="hiddenresult" style="display:none;">
      <!-- 列表元素 -->
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import 'jquery.pagination/dist/jquery.pagination.css'
import 'jquery.pagination/dist/jquery.pagination'

export default {
  name: 'pagination',
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var initPagination = function () {
        // 创建分页
        $('#Pagination').pagination({
          pageTotal: 6,
          pageStart: 5,
          count: 0,
          prevCount: 3,
          jump: true,
          coping: false,
          prevContent: '<上一页',
          nextContent: '下一页>',
          jumpBtn: '确定',
          callback: function (api) {
            console.log(api)
            console.log(api.getCurrent())
          }
        })
      }
      initPagination()
      // ajax加载
      // $('#hiddenresult').load('load.html', null, initPagination)
    }
  }
}
</script>

<style scoped>

</style>
