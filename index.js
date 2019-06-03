var app = new Vue({
    el:'#app',
    data:{
        articleList:[],
        baseUrl:'http://127.0.0.1:8080'
    },
    methods:{
        getArticles(){
            axios.get(`${this.baseUrl}/getAllArticles`)
                .then(res => {
                    console.log(res.data);
                    this.articleList = res.data;
                    this.articleList.forEach(element => {
                        element.createTime = this.timetrans(element.createTime);
                    });
                });
          
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
        },
        openDetail(index){
            window.location.href="post/post.html?id="+index;
        }
    },
    mounted(){
        this.getArticles();
    }
});