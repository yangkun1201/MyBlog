
var app = new Vue({
    el:'#app',
    data:{
        baseUrl:'http://127.0.0.1:8080',
        articleList:[],
        curArticleId:null,
        title:'',
        type:''
    },
    methods:{
        getArticleList(){
            axios.get(this.baseUrl+'/getAllArticles').then(res=>{
                //console.log(res);
                this.articleList = res.data;
            });
        },
        editArticle(article){
            this.curArticleId = article.id;
            this.title = article.title;
            this.type = article.type;
            simplemde.value(article.contentMd);
        },
        updateArticle(){
            var title = this.title;
            var type = this.type;
            var contentMd = simplemde.value();
            var content = simplemde.markdown(simplemde.value());
            var id = this.curArticleId;
            axios.post(this.baseUrl+'/updateArticleById',{
                title:title,
                type:type,
                contentMd:contentMd,
                content:content,
                id:id
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==='ok'){
                    alert('修改成功');
                    this.getArticleList();
                }
                
            })
        },
        deleteArticle(){
            console.log('delete');
            console.log(this.curArticleId);
            if(this.curArticleId===null){
                alert('请先选择文章');
            }else{
                axios.get(this.baseUrl+'/deleteArticleById?id='+this.curArticleId).then(res=>{
                    if(res.data.status==='ok'){
                        alert('删除成功');
                        this.getArticleList();
                    }
                })
            }
            
        }
    },
    mounted(){
       this.getArticleList();
    }
});

var simplemde = new SimpleMDE({
    element:document.getElementById('editText'),
    showIcons: ["code", "table"]
});