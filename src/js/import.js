//脚本标签
const parasite = document.querySelector("#animatic");
//外部脚本列表
const loadlist=[
    "https://cdn.bootcdn.net/ajax/libs/vue/3.3.4/vue.global.prod.min.js",
    "https://cdn.bootcdn.net/ajax/libs/axios/0.26.0/axios.js",
    "https://unpkg.com/js-datepicker@5.18.2/dist/datepicker.min.js"
];
//加载量
var loadnum=0;
//加载
loadlist.map((addurl)=>loadScript(addurl,pagejs,"text/javascript"))
//加载函数
function loadScript(url, callback,type) {
  var script = document.createElement("script");
  script.type = type;
  script.async = "async";
  script.src = url;
  document.body.appendChild(script);
  if (script.readyState) {
    //IE
    script.onreadystatechange = function () {
      if (script.readyState == "complete" || script.readyState == "loaded") {
        script.onreadystatechange = null;
        loadnum++;
        callback();
      }
    };
  } else {
    //非IE
    script.onload = function () {
        loadnum++;
        callback();
    };
  }
}
//获得本地脚本函数
function getParams(url) {
  let urlStr = url.split("?")[1];
  const params = new URLSearchParams(urlStr);
  const res = Object.fromEntries(params.entries());
  return res;
}

//获得本地脚本函数参数
const params = getParams(parasite.src);
//加载本地脚本
function pagejs(){
    if(loadnum==loadlist.length){
        import("./../js/"+params.load+".js").then(Module=>{
          createVue(Module.myMixin)
        })
    }
}
import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'
import yplogin from '../components/login.js'
import ypinput from '../components/ypinput.js?t=1'
import yparea from '../components/yparea.js?t=1'
//创建VUE
function createVue(myMixin){
  const app=Vue.createApp({
    components:{yplogin,ypinput,yparea},
    mixins:[myMixin],
    data(){
      return{
        loadmore:false,
        showlogin:false,
        gotop:false,
        opensearch:false,
        showMenu:false,
        keywords:'',
        leftWidth:0,
        navindex:0,
        navCurrentStyle:{
          transform:"translateX(-50%)",
          transition:"left 0.2s ease-in-out",
          left:0,
        }
      }
    },
    watch:{
      keywords(n,o){

      }
    },
    created(){
    },
    mounted(){
      this.invisible()
      this.nowscroll()
      //when all dom loaded ， this is runing
      this.$nextTick(()=>{
        let preDoms=document.querySelectorAll("pre")
        for(let k in preDoms){
          if (Object.hasOwnProperty.call(preDoms, k)) {
            let ele=preDoms[k]
            ele.classList.add("line-numbers")
            ele.setAttribute("data-prismjs-copy","复制文本")
            ele.setAttribute("ddata-prismjs-copy-error","按Ctrl+C复制")
            ele.setAttribute("data-prismjs-copy-success","已复制！")
          }
        }
        loadScript("/dist/prism.js",pagejs,"text/javascript")
        this.pageInt()
    
      })
      //click out area to close this obj
      document.addEventListener("click",()=>{
        this.showMenu=false
      })
      window.addEventListener("resize",()=>{
        this.pageInt()
      })

    },
    methods:{
      pageInt(){
        this.leftWidth=this.$refs.nav.getBoundingClientRect().left
        this.lineMove(this.navindex)
        let navItem=this.$refs.nav.children
        for(let i=0;i<navItem.length;i++){
            navItem[i].addEventListener("click",()=>{
              this.lineMove(i)
            })
        }
      },
      navclick(e,i){
        this.navindex=i
        let nav=this.$refs.nav
        let navItem=nav.children
        let navwidth=nav.clientWidth
        let sum=0
        nav.scrollLeft=0

        if(e.target.getBoundingClientRect().left>=navwidth/2){
          nav.scrollLeft=e.target.getBoundingClientRect().left-navwidth/2+e.target.getBoundingClientRect().width/2
        }else{
          nav.scrollLeft=0
        }
      },
      gosearch(){
        if(this.keywords){
          window.location.href='/search.html?keyword='+this.keywords
        }else{
          alert('请输入关键词')
        }
      },
      invisible(){
        let object=document.querySelectorAll(".invisible")
        for (const key in object) {
          if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            element.classList.remove("invisible")
          }
        }
      },
      to_top(){
        window.scrollTo({top:0,behavior:'smooth'})
      },
      nowscroll(){
        window.addEventListener('scroll',()=>{
          let scrollTop=document.body.scrollTop || document.documentElement.scrollTop
          let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
          var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
 
          this.scrolly=scrollTop
          if(scrollTop>500){
            this.gotop=true
          }else{
            this.gotop=false
          }
          // auto load
          if(scrollHeight-scrollTop<clientHeight+50&&this.loadmore==false){
            this.loadmore=true
          }

        })
      },
      lineMove(index){
          let dom=this.$refs.nav.children[index]
          let domRect=dom.getBoundingClientRect()
          this.navCurrentStyle.left=domRect.left-this.leftWidth+(domRect.width/2)+"px"
      }
    }
  })

  axios.interceptors.request.use(function(config){
    config.headers.common['Authorization']=localStorage.getItem('token')||''
    return config;
  },function(error){
    return Promise.reject(error);
  })
  axios.interceptors.response.use(function(response){
    if (response.status === 200) {
      if(response.data.constructor===Object){
        if (response.data.code == 0) {
          alert(response.data.msg)
        }
        if (response.data.data.token != undefined) {
          localStorage.setItem('token',response.data.data.token)
        }
      }
      return response;
    }
  },function(error){
    return Promise.reject(error);
  })
  app.config.globalProperties.YPajax = (method,path,params)=>{
    let config={
      method:method,
      baseURL: '/',
      url:path,
      timeout: 5000,
      validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
    }
    if(method=='get'){
      config.params=params
    }
    if(method=='post'){
      config.data=params
      
    }
    return axios(config)
  }
  const vm=app.mount('#app')
}