<template>
  <div class="blog-container">
    <div class="blog-pages">
      <!-- 用于渲染『文章列表』和『文章内容』 -->
      <router-view/>

      <div class="col-md-3 main-col pull-left">
        <div class="panel panel-default corner-radius">
          <div class="panel-body text-center topic-author-box blog-info">
            <div class="image blog-cover">
              <router-link :to="`/${userName}`">
                <img :src="userAvatar" class="avatar-112 avatar img-thumbnail">
              </router-link>
            </div>
            <div class="blog-name">
              <h4>
                <router-link :to="`/${userName}`">{{ userName }} 的专栏</router-link>
              </h4>
            </div>
            <hr>
            <!--<router-link :to="`/${userName}`">-->
              <!--<li class="list-group-item"><i class="text-md fa fa-list-ul"></i> 专栏文章（{{ articleNum }}）</li>-->
            <!--</router-link>-->
            <h4>
              <div>年龄：{{user.userage}}</div>

            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import global_ from '@/Global.vue'

export default {
  name: 'Column',
  data() {
    return {
      user:'',
      userName: '', //  对应用户姓名
      userNickname:'',
      userAvatar: '', //  对应用户头像
      articles: [], //  对应用户文章
      isUser: true
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    articleNum() {
      return this.articles.length
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 确认渲染该组件的对应路由时，通过 to.params 参数设置用户和文章数据
      vm.setDataByParams(to.params)
    })
  },
  watch: {
    '$route'(to) {
      // 在子页面之间相互切换时，通过 to.params 参数设置用户和文章数据
      this.setDataByParams(to.params)
    }
  },
  methods: {
    setDataByParams(params) {
      // this.$axios.get(global_.Url +'users/myPosts',{
      //   params:{
      //     UID:this.$store.state.user.uid
      //   }
      // })
      //   .then((response)=>{
      //     console.log("response profile data:\n");
      //     console.log(response.data);
      //     console.log(this.$store.state)
      //     var tem = response.data.result;
      //     var temp = [];
      //     for (let i = 0; i < tem.length; i++){
      //       temp.push({
      //         articleId: tem[i].post_id,
      //         title: tem[i].post_theme,
      //         time: tem[i].post_time
      //       })
      //     }
      //     this.articles = temp
      //   })
      //   .catch((error)=>{
      //     console.log("ERRPR message:"+error);
      //   })
      const user = params.user
      const articleId = params.articleId
      // 当前文章
      const article = this.$store.getters.getArticleById(articleId)

      // 存在当前文章时，设置用户数据为当前文章的用户信息，并使用文章的 uname 获取对应用户文章
      if (article) {
        this.userName = article.name
        this.userNickname = article.nickname
        this.userAvatar = article.avatar
        this.articles = this.$store.getters.getArticlesByUid(article.uid, article.uname)
      } else if (user) {
        // 存在 user 参数时，使用路由的 user 获取对应用户文章
        const articles = this.$store.getters.getArticlesByUid(user.uid, user)
        this.user= this.$store.state.user

        // 存在至少一篇用户文章时，设置用户数据为第一篇文章的用户信息
        if (articles.length) {
          this.userName = articles[0].uname
          this.userAvatar = articles[0].uavatar
        } else if (this.user) {
          // 不存在用户文章时，设置用户数据为当前用户的用户信息
          this.userName = this.user.name
          this.userAvatar = this.user.avatar
        }

        this.articles = articles
      }
      // if (this.isUser){
      //   this.userNickname = this.$store.state.user.nickname
      //   this.userAvatar = this.$store.state.user.avatar
      //   this.$axios.get(global_.Url +'users/myPosts',{
      //     params:{
      //       UID:this.$store.state.user.uid
      //     }
      //   })
      //     .then((response)=>{
      //       console.log("response profile data:\n");
      //       console.log(response.data);
      //       console.log(this.$store.state)
      //       var tem = response.data.result;
      //       var temp = [];
      //       for (let i = 0; i < tem.length; i++){
      //         temp.push({
      //           articleId: tem[i].post_id,
      //           title: tem[i].post_theme,
      //           time: tem[i].post_time,
      //           uavatar: this.$store.state.user.avatar
      //         })
      //       }
      //       this.articles = temp
      //     })
      //     .catch((error)=>{
      //       console.log("ERRPR message:"+error);
      //     })
      // }else{
      //   this.userName = params.user.name
      //   this.userAvatar = params.user.avatar
      //   this.userNickname = params.user.nickname
      //   this.$axios.get(global_.Url +'users/myPosts',{
      //   params:{
      //     UID:params.user.uid
      //   }
      // })
      //   .then((response)=>{
      //     console.log("response profile data:\n");
      //     console.log(response.data);
      //     console.log(this.$store.state)
      //     var tem = response.data.result;
      //     var temp = [];
      //     for (let i = 0; i < tem.length; i++){
      //       temp.push({
      //         articleId: tem[i].post_id,
      //         title: tem[i].post_theme,
      //         time: tem[i].post_time,
      //         uavatar: params.user.avatar
      //       })
      //     }
      //     this.articles = temp
      //   })
      //   .catch((error)=>{
      //     console.log("ERRPR message:"+error);
      //   })
      //
      // }
    }
  }
}
</script>

<style scoped>
.blog-container { margin-top: 20px;}
</style>
