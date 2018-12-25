<template>
  <footer class="footer">
    <div class="container">
      <div class="row footer-top">
        <div class="col-sm-5 col-lg-5">
          <p class="padding-top-xsm">{{ description }}</p>

          <div class="text-md">
            <a v-for="item in contacts" v-title="item.title" :href="item.link" :style="contactStyle" target="_blank">
              <i :class="`fa fa-${item.icon}`"></i>
            </a>
          </div>

          <br>

          <span v-html="designer"></span>
        </div>

        <div class="col-sm-6 col-lg-6 col-lg-offset-1">
          <div class="row">
            <div class="col-sm-4">
              <h4>{{ sponsor.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in sponsor.list">
                  <a :href="item.link" target="_blank">
                    <img v-title="item.title" :src="item.logo" :alt="item.title" class="footer-sponsor-link" width="98">
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-sm-4">
              <h4>{{ statistics.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in statistics.list">{{ item.title }}: {{ item.description }}</li>
              </ul>
            </div>

            <div class="col-sm-4">
              <h4>{{ other.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in other.list">
                  <a :href="item.link" :title="item.title" target="_blank">
                    <i :class="`fa fa-${item.icon}`"></i> {{ item.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import title from '@/directives/title'
import global_ from '@/Global.vue'

export default {
  name: 'TheFooter',
  directives: {
    title
  },
  data() {
    return {
      description: 'VuejsCaff 是一个 Vue.js 的知识社区',
      contacts: [
        {
          icon: 'envelope',
          title: '反馈问题',
          link: 'mailto:summer@yousails.com'
        },
        {
          icon: 'weibo',
          title: '站长微博',
          link: 'https://weibo.com/1837553744/profile?topnav=1&wvr=6'
        },
        {
          icon: 'weixin',
          title: '加我微信',
          link: 'https://vuejscaff.com/contact'
        }
      ],
      contactStyle: {
        paddingRight: '8px'
      },
      designer: `
        <span style="font-size:0.9em">Designed by
          <span style="color: #e27575;font-size: 14px;">❤</span>
          <a href="https://github.com/summerblue"target="_blank"style="color:inherit">Summer</a>
        </span>
      `,
      sponsor: {
        title: '赞助商',
        list: [
          {
            logo: 'https://lccdn.phphub.org/uploads/banners/bQawWl3vT5dc2lYx5JZ7.png',
            title: '本站服务器由 UCloud 赞助',
            link: 'http://localhost:3000/'
          },
          {
            logo: 'https://lccdn.phphub.org/uploads/banners/yGLIR0idW7zsInjsNmzr.png',
            title: '本站 CDN 服务由七牛赞助',
            link: 'http://www.qiniu.com/?utm_source=phphub'
          },
          {
            logo: 'https://lccdn.phphub.org/uploads/banners/XPtLlZmIN1cQbLuDFEON.png',
            title: 'Composer 镜像赞助商',
            link: 'https://www.upyun.com/'
          },
          {
            logo: 'https://lccdn.phphub.org/uploads/banners/JpTCK6OKYBIrBIWdtob8.png',
            title: '订阅邮件赞助商：SendCloud',
            link: 'http://www.sendcloud.net/'
          }
        ]
      },
      statistics: {
        title: '统计信息',
        list: [
          {
            title: '社区会员',
            description: '22889'
          },
          {
            title: '话题数',
            description: '7397'
          },
          {
            title: '评论数',
            description: '39375'
          }
        ]
      },
      other: {
        title: '其他信息',
        list: [
          {
            icon: 'thumbs-up',
            title: '软件外包服务',
            link: 'https://vuejscaff.com/contact'
          },
          {
            icon: 'globe',
            title: '推荐网站',
            link: 'https://vuejscaff.com/sites'
          }
        ]
      }
    }
  },
  ////  create时调用的函数操作。具体函数操作在下方methods里
  created:function(){

    // this.axiosRegister();
    // this.axiosLogin();

    //this.axiosGetHttp();      //this.changeimgUrl()
    // this.axiosGetPic();
    // this.axiosGetPic3();
    // this.axiosPostsList();
    // this.axiosFloorContent();
    // this.axiosAddPost();
    // this.axiosfollowPost();
  },
  methods:{
    //  axios是promise构造的函数吗？？？？？

    axiosRegister(){
      this.$axios.get(global_.Url +'users/register',{
        params:{
          user_name:'王五',
          user_id : 'wangwu',
          user_password: '12345678'
        }
      })
        .then((response)=>{
          console.log("response register data:\n");
          console.log(response.data);
        })
        .catch((error)=>{
          console.log("ERRPR message:"+error);
        })
    },

    axiosLogin(){
      this.$axios.get(global_.Url +'users/login' ,{
        params:{
          user_id : 'tansy',
          user_password: '123456'
        }
      })
        .then((response)=>{
          console.log("response login data:\n");
          var data2= response.data;
          console.log( data2 );
        })
        .catch((error)=>{
          console.log("ERRPR2 message:"+error);
        })
    },

    ////{UID: "1"}
    ////获取帖子列表
    axiosPostsList(){
      this.$axios.get(global_.Url + 'posts/postList',{
        params:{
          UID: "1",
          post_module:"work",
        }
      })
        .then((response)=>{
          console.log("response posts list data:\n");
          var data2= response.data;
          console.log( data2 );
          ////其他操作
        })
        .catch((error)=>{
          console.log("ERRPR2 message:"+error);
        })
    },


    //////获取帖子内容
    axiosFloorContent(){
      this.$axios.get(global_.Url + 'posts/postContent',{
          params:{
            UID: "1",
            post_id:"1",
          }
      })
        .then((response)=>{
          console.log("response posts content data:\n");
          var data2= response.data;
          console.log( data2 );
          var myDate = new Date();
          console.log(myDate.toLocaleString());
          ////其他操作
      })
        .catch((error)=>{
          console.log("ERRPR3 message:"+error);
        });
      // this.$axios.get()  加载回复内容
    },

    ////发帖
    axiosAddPost(){
      this.$axios.get(global_.Url + 'posts/addPost',{
        params:{
          UID: "1",
          post_module:"work",
          post_theme:"我测试一个帖子",
          //post_time: new Date().toLocaleString(),
          floor_content:"这是全都是瞎写的帖子内容，不靠谱",
          ////最后更新时间与上面相同
        }
      })
        .then((response)=>{
          console.log("add success:\n");
          console.log(response)
          ////其他操作：跳转到板块页面。要有错误处理
        })
        .catch((error)=>{
          console.log("ERRPR4 message:"+error);
        });
      // this.$axios.get()  加载回复内容
    },

    ////跟帖
    axiosfollowPost(){
      this.$axios.get(global_.Url + 'posts/followPost',{
        params:{
          UID: "1",
          post_id:"1",
          floor_content:"可以找到所有的记录，最大值为每名使用GROUP BY子句如下",
          ////时间在后端生成， 层数需要获取
        }
      })
        .then((response)=>{
          console.log("follow success:\n");
          ////其他操作：跳转到。要有错误处理
        })
        .catch((error)=>{
          console.log("ERRPR4 message:"+error);
        });
      // this.$axios.get()  加载回复内容
    },

    axiosGetHttp(){
      // console.log(this)
      // this.imgUrl='http://turbulent.cn:5000/images/a.jpg'
      // return  this.imgUrl
      this.$axios.get('http://turbulent.cn:5000/test',{
        params:{
          ID: 12345,
          name: "mike"
        }
      })
        .then((response)=>{
          console.log("response data:\n");
          console.log(response);
        })
        .catch((error)=>{
          console.log("ERRPR message:"+error);
        })
    },
    axiosGetPic(){
      // this.$axios.get('http://turbulent.cn:5000/stylesheets/style.css')
      this.$axios.get('http://turbulent.cn:5000/pic')
        .then((response)=>{
          console.log("response Pic:\n");
          console.log(response);
        })
        .catch((error)=>{
          console.log("ERRPR message:"+error);
        })
    },
    axiosGetPic3(){
      this.$axios({
        method:'get',
        url: global_.Url +'pic',
        responseType:'arraybuffer'  //'arraybuffer'
      })
        .then((response)=>{
          console.log(response);
          return 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        })
        .then(data=>{
          console.log(data);
        })
        //   console.log("response Pic:\n");
        //   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
        // })
        .catch((error)=>{
          console.log("ERRPR2 message:"+error);
        })
    }
  }

}
</script>

<style scoped>
a:hover, a:focus { color: #e27575; transition: color .15s;}
</style>
