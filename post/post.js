var app = new Vue({
    el:'#app',
    data:{
        baseUrl:'',
        title:'',
        content:'',
        article:[]
    },
    methods:{
        getArticleById(){
            var id = window.location.href.split('=')[1];
            axios.get(this.baseUrl+'/getArticleById?id='+id).then(res=>{
                console.log(res);
                this.article = res.data;
                this.article.createTime = this.timetrans(this.article.createTime);
                //this.article.content = markdown.toHTML(this.article.content);
                this.$nextTick(function() {
                    $('pre code').each(function(i, block) {
                      hljs.highlightBlock(block);
                    });
                })
            })
        },
        timetrans(date){
            var date = new Date(date);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y+M+D+h+m+s;
        }
    },
    mounted(){
        this.baseUrl = config.baseUrl;
        this.getArticleById();
    }
});


