<template>
  <div>
   <div class="auth">
      <div class="box" v-if="toggle">
         
        <h4 class="mb-20">Tizimga kirish</h4>
        <form class="form" name="login" @submit.prevent="postLogin()">
          <div class="mb-20"> 
            <input class="input" type="text" v-model="user.login" placeholder="Login">
          </div>
          <div class="mb-20">
            <input class="input" type="password" v-model="user.password" placeholder="Mahfiy kalit">
          </div>
        </form>
        <a class="link" href="#" @click.prevent="toggle = false"> Ro'yhatdan o'tish</a>
        <button class="btn success" @click="postLogin()">Kirish</button>
      </div>

      <div class="box" v-else>
         <h4 class="mb-20">Royhatdan o'tish</h4>
         <form class="form" @submit.prevent="postReg()">
           <div class="mb-20"> 
             <input class="input" type="text" v-model="user.login" placeholder="Login">
           </div>
           <div class="mb-20">
             <input class="input" type="password" v-model="user.password" placeholder="Mahfiy kalit">
           </div>
           <div class="mb-20">
             <input class="input" type="password" v-model="user.checkpassword" placeholder="Mahfiy kalit qayta kiriting">
           </div>
         </form>
         <a class="link" href="#" @click.prevent="toggle =true">Tizimga kirish</a>
         <button class="btn success" @click="postReg()">Kirish</button>
       </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
   emits:['successLogin'], 
   data:()=>({
      user:{},
      notif:{},
      name:'',
      toggle:true,
   }),
   methods:{
      ...mapMutations(['setNotif']),
      ...mapActions(['register','login']),
        
      async postLogin(){
         if( this.checkFields()){
            this.login(this.user) 
         }
      },
      async postReg(){
         if(this.checkFields()){
            if(this.user.password !== this.user.checkpassword){
                  this.setNotif({
                     type:'warning',
                     text:'Mahfiy kalitlar bir xil bolishi lozim'
                  })
                  return false
            }
            let res = await this.register(this.user)
            if(res.status == 200){
               if(res.data == 'exist'){
                  this.setNotif({
                     type:'warning',
                     text:'Bunday foydalanuvchi mavjud'
                  })
               }
            }
            if(res.status  == 201){
               if(res.data == 'success'){
                  this.setNotif({
                     type:'success',
                     text:'Ro`yhatdan muvafaqqiyatli o`tdingiz. Iltimos avtorizatsiyadan o`ting'
                  })
                  this.toggle = true
               }

            }
         }
      },
      checkFields(){
         if(!this.user.login || !this.user.password){
            this.setNotif({
               type:'warning',
               text:'Maydonlarni to`ldiring'
            })
            return false
         }
         return true
      }
   },
   computed:{
      posts(){
         return this.$store.getters.posts
      }
   }
}
</script>
<style lang="scss">
   .auth{
    height: 100vh;
    width: 100vw;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: #F6F8FB;
    .form{
        max-width: 268px;
        width: 100%;
    }
    .box{
        width: 642px;
        background:#FFFFFF;
        box-shadow: 0px 12px 16px rgba(125,125,125,0.25);
        border-radius: 8px;
        max-width: 100%;
        padding: 45px;
        display: flex;
        flex-direction: column;
        align-items:center;
    }
    .link{
        font-size: 11px;
        text-decoration: underline;
        display: inline-block;
        margin-bottom: 14px; 
    }

}
</style>