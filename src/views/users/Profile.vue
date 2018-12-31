<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
        <div class="panel-body">
            <h2><i class="fa fa-cog"></i> 编辑个人资料</h2>
        <hr>
        <div class="form-horizontal" data-validator-form>
          <div class="form-group">
            <label class="col-sm-2 control-label">昵称</label>
            <div class="col-sm-6">
              <input v-model.trim="nickname" v-validator:input.required="{ title: '昵称', regex: /^[\u4e00-\u9fa5]{2,8}$/, error: '' }" type="text" class="form-control">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">性别</label>
            <div class="col-sm-6">
              <select v-model="sex" class="form-control">
                <option value="">未选择</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">年龄</label>
            <div class="col-sm-6">
              <input v-model="userage" type="text" class="form-control">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">手机号</label>
            <div class="col-sm-6">
              <input v-model.trim="usertel" v-validator:input.required="{ title: '手机号', regex: /^1(3|4|5|7|8)\d{9}$/, error: '手机号有误，请重填' }" type="text" class="form-control">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">邮箱</label>
            <div class="col-sm-6">
              <input v-model.trim="useremail" v-validator:input.required="{ title: '邮箱', regex: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, error: '邮箱有误，请重填' }" type="text" class="form-control">
            </div>
          </div>

          <!--<div class="form-group">-->
            <!--<label class="col-sm-2 control-label">兴趣</label>-->
            <!--<div class="col-sm-6">-->
              <!--<label class="checkbox-inline">-->
                <!--<input v-model="hobbies" value="泡网" type="checkbox"> 泡网-->
              <!--</label>-->
              <!--<label class="checkbox-inline">-->
                <!--<input v-model="hobbies" value="运动" type="checkbox"> 运动-->
              <!--</label>-->
              <!--<label class="checkbox-inline">-->
                <!--<input v-model="hobbies" value="健身" type="checkbox"> 健身-->
              <!--</label>-->
              <!--<label class="checkbox-inline">-->
                <!--<input v-model="hobbies" value="旅游" type="checkbox"> 旅游-->
              <!--</label>-->
              <!--<label class="checkbox-inline">-->
                <!--<input v-model="hobbies" value="游戏" type="checkbox"> 游戏-->
              <!--</label>-->
            <!--</div>-->
          <!--</div>-->

          <div class="form-group">
            <label class="col-sm-2 control-label">生日</label>
            <div class="col-sm-6">
              <input v-model.trim="userbirthday" v-validator:input.required="{ title: '生日', regex: /^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/, error: '格式为yyyy-mm-dd' }"  type="text" class="form-control" required="required">
            </div>
            <!--<div class="col-sm-6">月-->
              <!--<input v-model.trim="userbirthday.birmonth" v-validator:input.required="{ title: '年', regex: /^(0?[1-9]|1[0-2])$/, error: '正确格式为：01-09或1-12' }" type="text" class="form-control">-->
            <!--</div>-->
            <!--<div class="col-sm-6">日-->
              <!--<input v-model.trim="userbirthday.birday" v-validator:input.required="{ title: '日', regex: /^((0?[1-9])|((1|2)[0-9])|30|31)$/, error: '正确格式为：01-09或1-31' }" type="text" class="form-control">-->
            <!--</div>-->
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">个人简介</label>
            <div class="col-sm-6">
              <textarea v-model.trim="introduction" type="text" class="form-control"></textarea>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-6">
              <button type="submit" class="btn btn-primary" @click="updateProfile">应用修改</button>
            </div>
          </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
  import global_ from '@/Global.vue'
  export default {
  name: 'EditProfile',
  data() {
    return {
      // username: '', // 用户名
      nickname:'',
      sex: '', // 性别
      // hobbies: [], // 兴趣
      introduction: '', // 个人简介
      userage:'',
      usertel:'',
      useremail:'',
      userbirthday:'',
      userauthority:''
    }
  },
  created() {
    console.log(this.$store.state.user)
    this.$axios.get(global_.Url +'users/profile',{
      params:{
        UID:this.$store.state.user.uid
      }
    })
      .then((response)=>{
        console.log("response profile data:\n");
        console.log(response.data);
        var data = response.data.result
        this.userbirthday = data.user_birthday,
        this.userage = data.user_age
        this.usertel = data.user_phone
        this.useremail = data.user_email
        this.sex = data.user_sex
        this.nickname = data.user_name
        this.introduction = data.user_introduction
        this.userauthority = data.user_authority
        console.log(data.user_age)
      })
      .catch((error)=>{
        console.log("ERRPR message:"+error);
      })

    // const user = this.$store.state.user
    //
    // if (user && typeof user === 'object') {
    //   const { name, sex, hobbies, introduction, userage, usertel, useremail } = user
    //
    //   this.username = name
    //   this.sex = sex || this.sex
    //   this.hobbies = hobbies || this.hobbies
    //   this.introduction = introduction
    //   this.userage = userage
    //   this.usertel = usertel
    //   this.useremail = useremail
    // }
  },
  methods: {
    checkBirth(val) {

      let pattern = /^((19[2-9]\d{1})|(20((0[0-9])|(1[0-8]))))\-((0?[1-9])|(1[0-2]))\-((0?[1-9])|([1-2][0-9])|30|31)$/;

      if(pattern.test(val)) {

        let date = new Date(val);

        let month = val.substring(val.indexOf("-")+1,val.lastIndexOf("-"));

        return date && (date.getMonth()+1 == parseInt(month));

      }

      return false;

    },
    updateProfile(e) {

      this.$nextTick(() => {
        if (e.target.canSubmit) {
          console.log(this.nickname)
          this.$axios.get(global_.Url +'users/update_profile',{
            params:{
              UID:"1",
              user_name:this.nickname,
              user_age:this.userage,
              user_sex:this.sex,
              user_birthday:this.userbirthday,
              user_phone:this.usertel,
              user_email:this.useremail,
              user_introduction:this.introduction,
            }
          })
            .then((response)=>{
              console.log("response profile data:\n");
              console.log(response.data);
            })
            .catch((error)=>{
              console.log("ERRPR message:"+error);
            })

          this.$store.dispatch('updateUser', {
            nickname: this.nickname,
            sex: this.sex,
            introduction: this.introduction,
            userage:this.userage,
            usertel:this.usertel,
            useremail:this.useremail,
            userbirthday:this.userbirthday,
            userauthority:this.userauthority
          })
           this.$message.show('修改成功')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
