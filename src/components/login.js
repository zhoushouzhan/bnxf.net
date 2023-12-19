/*
 * @Author: Ypjs 5166651888@163.com
 * @Date: 2023-12-17 16:48:37
 * @LastEditors: Ypjs 5166651888@163.com
 * @LastEditTime: 2023-12-18 14:51:37
 * @FilePath: /bnxf.net/src/components/ypdialog.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default{
    data(){
        return {
            timer:null,
            usecode:true,
            issubmit:false,
            formData:{username:'',code:'',password:''},
            formVerify:{
                username:true,
                password:true,
                code:true
            }
        }
    },
    watch:{

        usecode(n){
            if(!n){
                clearInterval(this.timer)
                this.timer=null
                this.formData.code=''
            }else{
                this.formData.password=''
            }
        },

        'formData.username'(n,o){
            if(this.formData.username==''){
                this.formVerify.username=true
                return
            }
            if(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.formData.username)||/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(this.formData.username)){
                this.formVerify.username=true
                return
            }
            this.formVerify.username=false
        },
        'formData.code'(n,o){
            if(this.formData.code==''){
                this.formVerify.code=true
                return
            }
            if(this.formData.code.length==6){
                this.formVerify.code=true
                return
            }
            this.formVerify.code=false
        },
        'formData.password'(n,o){
            if(this.formData.password==''){
                this.formVerify.password=true
                return
            }
            if(this.formData.password.length>=6){
                this.formVerify.password=true
                return
            }
            this.formVerify.password=false
        }



    },
    computed:{
        verifyform(){
            let dosubmit=true
            if(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.formData.username)==false&&/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(this.formData.username)==false){
                this.formVerify.username=false
                dosubmit=false
            }

            if(this.formData.code<6&&this.usecode){
                this.formVerify.code=false
                dosubmit=false
            }

            if(this.formData.password.length<6&&!this.usecode){
                this.formVerify.password=false
                dosubmit=false
            }

            return dosubmit
        }
    },
    mounted(){

    },
    methods:{
        close(){
            this.$emit('close')
            if(this.timer){
                clearInterval(this.timer)
            }
            
        },
        async getcode(){
            if(this.formData.username==''){
                this.formVerify.username=false
                return
            }
            if(this.timer){
                return
            }
            const resp= await this.YPajax('get','e/extend/api/member.php')
            let waiting=10
            if(resp.code==1){
                this.$refs.code.innerHTML=waiting+'秒后重新获取'
                this.timer=setInterval(()=>{
                    waiting--
                    this.$refs.code.innerHTML=waiting+'秒后重新获取'
                    if(waiting==0){
                        this.$refs.code.innerHTML='重新获取验证码'
                        clearInterval(this.timer)
                    }
                },1000)
            }
        },
        async submit(){

            if(!this.verifyform){
                return
            }
            
            console.log(this.formData)
        }
    },
    template:`
    <div class="absolute left-0 top-0 w-full h-full bg-gray-9 bg-opacity-60 z-50 select-none">
            <div class="bg-white absolute md:w-[666px] max-md:w-[360px] left-1/2 top-1/4 -translate-x-1/2 rounded" @click.stop>
                <div class="py-5 px-3 border-b border-gray-1 flex justify-between">
                    <div class="px-3 font-bold">会员登录</div>
                    <div @click="close">
                        <i class="ri-close-fill ri-xl text-gray-4 cursor-pointer hover:text-red-1 duration-300"></i>
                    </div>
                </div>
                <div class="flex bg-white">
                    <div class="flex-1 p-6 space-y-7">
                        <div>验证码登录/注册</div>
                        <div class="bg-gray-3 h-9 rounded border-1">
                            <div>
                                <input type="text" v-model="formData.username" maxlength="22" title="账号" placeholder="请输入手机号或Email" class="outline-none bg-transparent h-full w-full p-2 text-gray-6">
                            </div>
                            <div class="text-xs text-red-1 p-1" v-if="!formVerify.username">
                            请输入正确的手机号或邮箱
                            </div>
                        </div>
                        <div class="bg-gray-3 h-9 rounded border-1" v-if="!usecode">
                            <div>
                                <input type="password" maxlength='22' v-model="formData.password" title="phone" placeholder="请输入密码" class="outline-none bg-transparent h-full w-full p-2 text-gray-6">
                            </div>
                            <div class="text-xs text-red-1 p-1" v-if="!formVerify.password">
                            请输入密码
                            </div>
                        </div>
                        <div v-if="usecode">
                            <div class="flex items-center bg-gray-3 h-9 rounded">
                                <div class="flex-1">
                                    <input type="text" maxlength="6" v-model="formData.code" title="phone" placeholder="请输入验证码" class="outline-none bg-transparent h-full w-full p-2 text-gray-6" oninput="value=value.replace(/[^0-9]/g,'')">
                                </div>
                                <div class="px-3 text-blue-3 text-sm cursor-pointer hover:text-red-1" ref="code" @click="getcode">
                                    获取验证码
                                </div>
                            </div>
                            <div class="text-xs text-red-1 p-1" v-if="!formVerify.code">
                            请输入验证码
                            </div>
                        </div>
                        <div class=" bg-blue-3 text-white text-sm px-3 py-2 text-center rounded active:bg-blue-700 select-none hover:bg-red-700" @click="submit">
                            登录/注册
                        </div>
                        <div class="flex items-center text-gray-5">
                            <div class="text-sm">其它登录：</div>
                            <div class="flex-1 flex space-x-3">
                                <div>
                                    <i class="ri-qq-fill ri-lg hover:text-blue-3"></i>
                                </div>
                                <div>
                                    <i class="ri-weibo-fill ri-lg hover:text-yellow-600"></i>
                                </div>
                                <div>
                                    <i class="ri-wechat-fill ri-lg hover:text-green-600"></i>
                                </div>
                                <div>
                                    <i class="ri-taobao-fill ri-lg hover:text-orange-500"></i>
                                </div>
                                <div>
                                    <i class="ri-alipay-fill ri-lg hover:text-blue-500"></i>
                                </div>
                            </div>
                            <div class="text-sm cursor-pointer text-gray-400 hover:text-red-600 px-2" @click="usecode=!usecode">
                                <span v-if="usecode">密码登录</span>
                                <span v-else>验证码登录</span>
                            </div>
                        </div>
                    </div>
                   
                    <div class="w-64 flex flex-col justify-end pb-9 max-md:hidden">
                        <img src="/dist/img/tree.png" class="object-cover" alt="">
                    </div>
                    
                </div>
                <div class="text-sm text-center py-3 text-gray-5">
                    注册登录即表示同意 <a href="###" target="_blank" class="text-blue-3 hover:text-red-1">《用户协议》</a>和<a href="###" target="_blank" class="text-blue-3 hover:text-red-1">《隐私政策》</a>
                </div>
            </div>
        </div>
    `
}