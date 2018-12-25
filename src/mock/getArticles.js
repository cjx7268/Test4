
import ls from '../utils/localStorage'

const localArticles = ls.getItem('articles')
const localUser = ls.getItem('user')
const localUserName = localUser ? localUser.name : undefined
let nextArticleId = 1

if (Array.isArray(localArticles) && localArticles.length) {
  nextArticleId = parseInt(localArticles[localArticles.length - 1].articleId) + 1
}

// 获取文章标题和内容
export const obtainArticles =(num)=>{
  const forbiddenNames = [localUserName, 'topics']
  let articles = []
  let unames = []
  num = num > 60 ? 60 : num

  this.$axios.get(global_.Url + 'posts/postList',{
    params:{
      UID: "1",
      post_module:"人文艺术",
      page:"1"
    }
  })
    .then((response)=>{
      console.log("response posts list data:\n");
      var data2 = response.data;
      console.log( data2 );
      for(let i=0;i<data2.Array.length;i++){
      unames.push(data2.Array(i).UID)
      }
      articles.push({
        uid: index + 2,
        articleId: nextArticleId + index,
        // 随机生成 10 - 20 字的中文标题
        title: Random.ctitle(10, 20),
        // 随机生成 3 - 5 个的中文段落
        content: Random.cparagraph(3, 5),
        date: new Date(),
        likeUsers: [],
        comments: [],
        uname
      })
      // this.
      ////其他操作
    })
    .catch((error)=>{
      console.log("ERRPR2 message:"+error);
    })
}
