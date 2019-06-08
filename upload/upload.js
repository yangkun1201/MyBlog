var simplemde = new SimpleMDE({
    element:$('#editText')[0],
    initialValue: '在此处编辑内容...',
    showIcons: ["code", "table"]
});

var baseUrl = 'http://127.0.0.1:8080';

$('#uploadBtn').click(function(){
    addArticle();
});

function addArticle(){
    var contentMd = simplemde.value();
    var content = simplemde.markdown(simplemde.value());
    var title = $('#title').val();
    var type = $('#type').val();
    if(title===''){
        alert('标题不能为空');
        return;
    }
    if(type===''){
        alert('类别不能为空');
        return;
    }
    if(contentMd===''){
        alert('内容不能为空');
        return;
    }
    $.ajax({
        url:baseUrl+'/addArticle',
        method:'post',
        contentType:'application/json;charset=utf-8',
        dataType:'json',
        data:JSON.stringify({
            title:title,
            type:type,
            content:content,
            contentMd:contentMd,
            authorId:'1',
            createTime:new Date().getTime(),
            modifyTime:''
        }),
        success(msg){
            console.log(msg);
            if(msg.status==='ok'){
                alert('上传成功');
                window.location.href='../index.html';
            }
        }
    });
}
