/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-11-26 17:37:07
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-26 17:49:45
 * @FilePath: /dongfou/src/components/ypswitch.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default{
    props:{
        modelValue:{
            default:0
        },
        title:{
            default:''
        },
        value:{
            default:''
        }
    },
    methods:{
        toogle(){
            console.log('xxx')
            let val=0;
            if(this.modelValue==1){
                val=0
            }else{
                val=1
            }

            this.$emit('update:modelValue', val)
        }
    },
    template:`
    <div class="relative h-[22px] w-[50px] rounded-full overflow-hidden duration-300 text-sm cursor-pointer" :class="{'bg-teal-500 text-white':modelValue,'bg-gray-400':!modelValue}" @click="toogle">
        <div class="w-[20px] h-[20px] rounded-full bg-white absolute left-[1px] top-[1px] duration-300" :class="{'translate-x-7':modelValue}"></div>
    </div>
    `
}