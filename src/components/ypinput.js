/*
 * @Author: Ypjs 5166651888@163.com
 * @Date: 2023-12-24 20:57:43
 * @LastEditors: Ypjs 5166651888@163.com
 * @LastEditTime: 2023-12-25 21:10:15
 * @FilePath: /bnxf.net/src/components/ypinput.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default{
    props:{
        modelValue:{
            default:''
        },
        max_length:{
            default:22
        },
        title:{
            default:'名称'
        },
        must:{
            default:false
        },
        focus_field:{
            default:false
        }
    },
    data(){
        return{
            length:0,
            inputvalue:''
        }
    },
    watch:{
        focus_field(n,o){
            if(n){
                this.$refs.input.focus()
            }
        }
    },
    methods:{
        inputevent(e){
            if(e.target.value.length>this.max_length){
                this.inputvalue=this.inputvalue.slice(0,this.max_length)
                return
            }
            this.length=e.target.value.length
            this.$emit('update:modelValue', e.target.value)
        }
    },
    mounted() {

    },
    template:`
    <div :class="{'yp-input':!focus_field,'yp-input-on':focus_field}">
        <div class="w-24"><span class="text-red-500 px-1" v-if="must">*</span>{{title}}</div>
        <div class="inputbox">
            <input type="text" v-model="inputvalue" title="username" @input="inputevent" ref="input">
            <div class="stxt"><span>{{length}}</span>/<span>{{max_length}}</span></div>
        </div>
    </div>
    `
}