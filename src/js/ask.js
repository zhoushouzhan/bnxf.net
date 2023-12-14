/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-11-26 17:32:05
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-26 21:37:18
 * @FilePath: /dongfou/src/js/ask.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ypswitch from "../components/ypswitch.js"
const myMixin={
    components:{ypswitch},
    data(){
        return {
            formData:{
                hidename:0
            },
            quill:[]
        }
    },
    created(){
       
    },
    mounted() {
        let that=this
        this.quill = new Quill('#editor', {
            modules: {
                toolbar: "#toolbar"
            },
            placeholder: '非常期待您的回复。',
            theme: 'snow'
        });
        var toolbar=this.quill.getModule('toolbar')
        toolbar.addHandler('image',function(v){
            if(v){
                // let length=this.quill.getSelection().index
                // this.quill.insertEmbed(length, 'image', 'http://shop.bnxf.net/storage/images/20230920/16951765676.jpg');
                // this.quill.setSelection(length+1)
                that.uploadfile()
            }
        })
    },
    methods:{
        save(){
            console.log('xx')
            console.log(this.editor.root.innerHTML)
        },
        uploadfile(){
 
            // 创建一个 input file 元素
            var inputFile = document.createElement('input');
            inputFile.type = 'file';
            inputFile.style.display='none'
            
            // 监听文件选择事件
            inputFile.addEventListener('change', function(event) {
            var file = event.target.files[0];
            // 在这里可以对选择的文件进行处理，比如上传到服务器
            // 例如使用 XMLHttpRequest 对象上传文件
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/upload', true);
            xhr.onload = function(d) {
                if (xhr.status === 200) {
                // 上传成功
                console.log('文件上传成功');
                } else {
                // 上传失败
                console.log('文件上传失败');
                }
            };
            xhr.send(file);
            });
            
            // 将 input file 添加到页面中
            document.body.appendChild(inputFile);
            inputFile.click()
        }   
    }
}

export{
    myMixin
}