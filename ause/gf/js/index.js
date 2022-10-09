//  手风琴效果
$(function () {
    // 鼠标离开事件（所有的li的宽变为默认值，恢复原样）
    $('.menu').bind('mouseleave', function () {
        $(this).children('li').each(function () {
            // 两种方法判断如何让恢复原样，第一种需要在变长的同时添加一个属性用来判断当前变长的那个li
            // 第二种简单粗暴，直接找到不为初值li，变为初值即可（注意css值为带px，需转化）
            // console.log($(this).css("width"));
             if(parseInt($(this).css("width"))>100){
                $(this).animate({
                    width:100
                },300,function(){
                });
             }
            // if ($(this).prop('data-show')) {
            //     $(this).animate({
            //         width: 100
            //     }, 300);
            // }
        })
        // 鼠标进入事件，图片展开，注意消除快速切换的bug，利用stop(),先停再执行
    }).children("li").each(function () {
        $(this).bind("mouseenter", function () {
            $(this).prop("data-show", true);
            $(this).stop().animate({
                width: 400
            }, 300).siblings().stop().animate({
                width: 100
            }, 300, function () {
                $(this).removeAttr('data-show');
            })
        })
    })
});

// 留言效果(本地保存)
// window.onload = function(){
//     if(localStorage.arr1113){
//         arr = JSON.parse(localStorage.arr1113)
//         show(arr)
//     }else{
//         arr = []
//     }
// }
//获取Dom元素
var userName = document.querySelector("#userName")
var btn = document.getElementById("btn")
var left = document.getElementById("left")
var txt = document.getElementById("tex")
//计算剩余字符
txt.oninput = function(){
    var len = txt.maxLength-txt.value.length
    left.innerHTML = len
}
// 选择图片
var pic = document.querySelectorAll(".bottom img")
var src = ''
for(var i = 0;i<pic.length;i++){
    pic[i].onclick = function(){
        for(var j = 0;j<pic.length;j++){
            pic[j].style.border =""
        }
        this.style.border = "1px solid red";
        src = this.src
    }
}
//点击广播
var arr = []
btn.onclick = function(){
    if(userName.value==''||txt.value ==''){
        alert("请输入昵称和留言")
    }else{
    var obj = {
        id:+new Date(),
        name:userName.value,
        content:txt.value,
        time:timer(),
        src:src
    }
    arr.unshift(obj)
    userName.value = ''
    txt.value = ''
    localStorage.arr1113 = JSON.stringify(arr)
    show(arr)
}
}
//渲染函数
function show(arr){
    var str = ''
    var contents = document.getElementById("content")
    contents.innerHTML = ''
    for(var i = 0;i<arr.length;i++){
        str +=`
        <div class = "list">
        <img src = "${arr[i].src}" align="absmiddle" style="width:30px;height:30px;">
        <span>${arr[i].name} </span>
        <span>${arr[i].content}</span>
        <br/>
        <span>${arr[i].time}</span>
        <button οnclick="del(${arr[i].id})">删除</button>
        </div>
        `
    }
    contents.innerHTML = str
}
 //删除函数
 function del(id){
    arr.forEach(function(ele,index){
        if(id ==arr[index].id){
             arr.splice(index,1)
             show(arr)
             localStorage.arr1113 = JSON.stringify(arr)
        }
    })
}
//获取时间
function timer(){
    var now = new Date()
    var month = now.getMonth()+1
    var day = now.getDate()
    var hours = now.getHours()
    var min = now.getMinutes()
    var result = check(month)+"月"+check(day)+"日  "+check(hours)+":"+check(min)
    return result
}
//检查时间少于10前面添上0
function check(n){
    n = n<10 ? "0"+n : n
    return n
}
//移入移出效果函数----利用事件委托处理
var contents = document.getElementById("content")
    contents.onmouseover = function(event){
        var enent = event || window.event
        var target = event.target || window.srcElement
        if(target.nodeName.toLowerCase() == "div"){
            target.style.background = "gray"
            var delBtn = target.lastElementChild
            delBtn.style.display = "block"
        }
    }
    contents.onmouseout = function(event){
        var enent = event || window.event
        var target = event.target || window.srcElement
        if(target.nodeName.toLowerCase() == "div"){
            target.style.background = ""
            var delBtn = target.lastElementChild
            delBtn.style.display = ""
        }
    }
