/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-11-21 18:33:54
 * @LastEditors: Ypjs 5166651888@163.com
 * @LastEditTime: 2023-12-25 22:08:02
 * @FilePath: /dongfou/src/js/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const myMixin={

    data(){
        return {
            focus_field:'',
            formData:{
                username:''
            }
        }
    },
    created(){
       
    },
    mounted() {
       
        document.addEventListener("click",()=>{
            this.focus_field=''
        })
        const picker=datepicker("#birthday",{
            customMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            customDays: ['日', '一', '二', '三', '四', '五', '六'],
            formatter: (input, date, instance) => {
                const value = date.toLocaleDateString('zh-CN',{timeZone:'Asia/Shanghai'})
                input.value = value
            }
        })
    },
    methods:{

    }
}
export{
    myMixin
}