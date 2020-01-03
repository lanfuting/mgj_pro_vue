<style scoped="scoped">
  .container {
    width: 100%;
    height: 500px;
    padding: 0px;
    margin: 0px;
  }
  .dv_backdrop{
    width: 100%;
    height: 600px;
    background-image: url(../assets/imgs/denglu.png);
    background-repeat: no-repeat;
    background-position-x: -350px;
    margin-top: 20px;
  }
  .dv_reg{
    width: 400px;
    margin-left:810px ;
    background-color: white;
    opacity: 0.9;
    margin-top: 50px;
    float: left;
  }
  .dv_reg_tab{
    padding: 20px;
  }
  .dv_reg_btns button{
    width: 110px;
    height: 35px;
    margin-left: 20px;
  }
  .bottom_list{
    width: 100%;
    height: 25px;
    float: left;
    margin-top: 30px;
  }
  .bottom_list div{
    float: left;
    margin-left: 20px;
    padding-left: 7px;
  }
  .bottom_list div a{
    text-decoration: none;
    color: black;
    font-size: 13px;
  }
  .bottom_list div a:hover{
    color: #FF086F;
  }
  .dv_reg_now{
    width: 50px;
    height: 30px;
    float: right;
  }
</style>

<template>
  <div class="container">
    <!-- 顶部导航 -->
    <bars_top1></bars_top1>
    <!-- 背景图片 -->
    <div class="dv_backdrop">
      <div class="dv_reg">
        <!-- 登录页面 -->
        <div class="dv_reg_tab">
          <div class="dv_reg_now">
            <button @click="toregister_post()" style="background-color: crimson; border: 0px;color: white;border-radius: 10px;">立即注册</button>
          </div>
          <h3 align="center">请登录 查看更多内容</h3>
          <h6 align="center">如从未注册，请填写以下信息并点击右上方按钮注册</h6>
          <hr />
          <!-- 对于登录不成功的信息提示-->
          <div v-if="mge_veiw" style="width: 100%; height: 20px;background-color: orangered;color: white;line-height: 20px;">
            {{mge}}
          </div>
          <hr />
          <input type="text" style="height: 40px;" v-model="logname" class="form-control" required autofocus
            placeholder="用户名/邮箱/手机号" /><br />
          <input type="password" style="height: 40px;" v-model="password" class="form-control" required placeholder="密码" /><br />
          <div>
            <img id="changept" style="cursor: pointer;" @click="changereg($event)" src="http://127.0.0.1:8082/backstage/defaultKaptcha" />
            <a style="cursor: pointer;">看不清？点图片</a>
          </div>
          <br />
          <!-- keyup事件，点击回车13，直接触发事件-->
          <input @keyup.13="logon()" type="text" v-model="keycode" class="form-control" style="width: 50%;" required placeholder="请输入验证码" />
          <input type="checkbox" name="rememberMe" />记住我<br />
          <div class="dv_reg_btns" style="width: 100%;text-align: center;">
            <button class="btn btn-success" @click="logon()">登录</button>
            <button class="btn btn-default" type="reset">重置</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部小字-->
    <div class="bottom_list">
      <div v-for="b in bottom_text"><a href="#">{{b}}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</div>
    </div>

  </div>
</template>

<script>
  import bars_top1 from '@/components/bars_top1.vue'

  export default {
    components: {
      bars_top1
    },
    data() {
      return {
        bottom_text: ['关于我们', '招聘信息', '联系我们', '商家入驻', '商家后台', '商家社区', '规则中心', '规则众议院', '有害信息举报', '用户隐私保护', '意见反馈'],
        logname: "",
        password: "",
        keycode: "",
        mge: "",
        mge_veiw: false,
        mge_list: [
          "验证码不正确", "", "密码错误", "用户名不为空或不存在", "当前用户被禁用"
        ],
      };
    },
    /* 监听部分功能，条件符合在提示div模块中进行提示*/
    watch: {
      logname: function() {
        if (this.logname != "" || this.logname.length > 0) {
          this.mge_veiw = false;
        }
      },
      password: function() {
        if (this.password != "") {
          this.mge_veiw = false;
        }
      },
      keycode: function() {
        if (this.keycode != "") {
          this.mge_veiw = false;
        }
      }
    },
    methods: {
      /* 提交的点击事件，包含表单的条件，可以再提示div模块中进行提示
      提交方式有两种，一种是输入完密码后点击登录按钮登录，一种是输入完验证码
      后，点击回车登录*/
      logon() {
        var po = this;
        if (po.logname == "") {
          po.mge = "用户名不能为空";
          po.mge_veiw = true;
          return;
        }
        if (po.password == "") {
          po.mge = "密码不能为空";
          po.mge_veiw = true;
          return;
        }
        if (po.keycode == "") {
          po.mge = "验证码不能为空";
          po.mge_veiw = true;
          return;
        }
        /* 通过ajax传到后台确认信息并返回到前次点击的页面*/
        var url = "http://127.0.0.1:8082/backstage/getcurrentusertotable";
        $.ajax(url, {
          data: {
            logname: po.logname,
            password: po.password,
            keycode: po.keycode
          },
          success: function(result) {
            po.mge = po.mge_list[result.mge];
            po.mge_veiw = true;
            /* 根据页面返回信息判断由哪个页面跳转过来的，注册页面过来
            直接跳转到首页，其他页面过来直接跳转到上一页*/
            if(result.mge==1){
              if(po.logname=po.$route.query.logname){
                po.mge_veiw=false;
                po.$router.push({
                  name:"main"
                });
              }else{
                po.mge_veiw=false;
                po.$router.back(-1);
              }
            }
            /* 1在后台代表成功，其他数字不成功，则需要重新加载验证码*/
            if (po.mge != 1) {
              $("#changept")[0].src = "http://127.0.0.1:8082/backstage/defaultKaptcha";
            }
          },
          /* ajax应对异步重置session，xhr可以不重置*/
          xhrFields: {
            withCredentials: true
          }
        });

      },
      /* 点击跳转到注册页面*/
      toregister_post() {
        this.$router.push({
          name: "register_post"
        })
      },
      /* 更新验证码*/
      changereg(event) {
        event.target.src = "http://127.0.0.1:8082/backstage/defaultKaptcha";
      }
    },
    mounted() {
      /* 取消scoll事件的影响*/
      $(window).unbind("scroll");
      /* 由注册页面返回来的，带着账号过来，注册完后直接跳转到登录页面，并且账号自带*/
      this.logname=this.$route.query.logname;
    }
  }
</script>
