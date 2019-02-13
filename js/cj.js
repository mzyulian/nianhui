//滚动名单
var nametxt = $('.name');
//抽奖id
var pid;
//抽奖按钮
var runing = true;
//可抽奖的数量
var p1Num = 1; //一等奖数量
var p2Num = 2; //二等奖数量
var p3Num = 3; //三等奖数量
var p4Num = 10; //四等奖数量
var p5Num = 20; //五等奖数量
var p1Winner =0; //一等奖中奖者数
var p2Winner =0; //二等奖中奖者数
var p3Winner =0; //三等奖中奖者数
var p4Winner =0;//四等奖中将者数
var p5Winner =0;//五等奖中奖者数
// var p5Winner = new Array(); //五等奖中奖者数组
//中奖者id
var peopleid=''
//随机下标
var num;
var t;

//========
//选择奖项
function checkPid(id){
    pid=id
    // alert(pid)
}

//开始
function start() {
    if (pid == '' || pid == undefined) {
        alert('请选择奖项')
        return;
    }
}
//开始停止
function start() {
    if (pid == '' || pid == undefined) {
        alert('请选择奖项')
        return;
    }
    if (runing) {
        //判断中将人数是否达到预定值
        if ((p1Winner >= p1Num) && (p2Winner >= p2Num) && (p3Winner >= p3Num) && (p4Winner >= p4Num) && (p5Winner >= p5Num)) {
            alert('所有抽奖已结束！！！');
        } else if (pid==5 && (p5Winner >= p5Num)) {
            alert("五等奖已抽取完毕，请选择其他奖项……");
        } else if (pid==4 && (p4Winner >= p4Num)) {
            alert("四等奖已抽取完毕，请选择其他奖项……");
        } else if (pid==3 && (p3Winner >= p3Num)) {
            alert("三等奖已抽取完毕，请选择其他奖项……");
        } else if (pid==2 && (p2Winner >= p2Num)) {
            alert("二等奖已抽取完毕，请选择其他奖项……");
        } else if (pid==1 && (p1Winner >= p1Num)) {
            alert("一等奖已抽取完毕，请选择其他奖项……");
        } else {
            runing = false;
            $('.startimg').attr('src','/assets/images/stop.png')
            if(pid == 6){
                startsNum()
            }else {
                startNum()
            }

        }
    } else {
        //结束点击
        runing = true;
        $('.startimg').attr('src','/assets/images/start.png')
        if(pid == 6){
            stops();
            zds(); //抽中奖
        }else {
            stop();
            zd(); //抽中奖
        }

    }
}

  //循环名单
   function startNum() {
    num = Math.floor(Math.random() * pcount);
    nametxt.html(personList[num].name);
    peopleid=personList[num]['id']
    t = setTimeout(startNum, 0);
}

//特殊循环名单
function startsNum() {
    num = Math.floor(Math.random() * pscount);
    nametxt.html(personsList[num].name);
    peopleid=personsList[num]['id']
    t = setTimeout(startsNum, 0);
}

//停止跳动
function stop() {
    pcount = personList.length - 1;
    clearInterval(t);
    updata({pid:pid,id:peopleid})
    t = 0;
}

//特殊停止跳动
function stops() {
    pscount = personsList.length - 1;
    clearInterval(t);
    updata({pid:pid,id:peopleid})
    t = 0;
}

//中奖
function zd() {
    //判断当前的pid
    if(pid==5){
        $('#zjmd').prepend("<p>" + "五等奖" + ' ' +personList[num]['name']+"</p>");
        //奖中将者添加到数组
        p5Winner=p5Winner+1;
        var peopleindex;
        $.each(personList,function (i,item) {
            if(item.id==peopleid){
                peopleindex=i
                return
            }
        })
        personList.splice(peopleindex,1)
        changeclass()
    }else if(pid==4){
        $('#zjmd').prepend("<p>" + "四等奖" + ' ' +personList[num]['name'] + "</p>");
        //奖中将者添加到数组
        p4Winner=p4Winner+1;
        var peopleindex;
        $.each(personList,function (i,item) {
            if(item.id==peopleid){
                peopleindex=i
                return
            }
        })
        personList.splice(peopleindex,1)
        changeclass()
    }else if(pid==3){
        $('#zjmd').prepend("<p>" + "三等奖" + ' ' +personList[num]['name'] + "</p>");
        //奖中将者添加到数组
        p3Winner=p3Winner+1;
        var peopleindex;
        $.each(personList,function (i,item) {
            if(item.id==peopleid){
                peopleindex=i
                return
            }
        })
        personList.splice(peopleindex,1)
        changeclass()
    }else if(pid==2){
        $('#zjmd').prepend("<p>" + "二等奖" + ' ' +personList[num]['name'] +"</p>");
        //奖中将者添加到数组
        p2Winner=p2Winner+1;
        var peopleindex;
        $.each(personList,function (i,item) {
            if(item.id==peopleid){
                peopleindex=i
                return
            }
        })
        personList.splice(peopleindex,1)
        changeclass()
    }else if(pid==1){
        $('#zjmd').prepend("<p>" + "一等奖" + ' ' +personList[num]['name'] + "</p>");
        //奖中将者添加到数组
        p1Winner=p1Winner+1;
        var peopleindex;
        $.each(personList,function (i,item) {
            if(item.id==peopleid){
                peopleindex=i
                return
            }
        })
        personList.splice(peopleindex,1)
        changeclass()
        var arr=personList
    }
}

//特殊中奖
function zds() {
    //判断当前的pid
        $('#zjmd').prepend("<p>" + "特等奖" + ' ' +personsList[num]['name']+"</p>");

        var peopleindex;
        $.each(personsList,function (i,item) {
            if(item.id==peopleid){
                peopleindex=i
                return
            }
        })
        personsList.splice(peopleindex,1)
       // changeclass()
        var arr=personsList

}
//奖项按钮切换类
function changeclass() {
    if(p1Winner >= p1Num){
        $('.grade .gradebtn').eq(0).removeClass('gradebgactive').addClass('gradebgno');
    }
    if(p2Winner >= p2Num){
        $('.grade .gradebtn').eq(1).removeClass('gradebgactive').addClass('gradebgno');
    }
    if(p3Winner >= p3Num){
        $('.grade .gradebtn').eq(2).removeClass('gradebgactive').addClass('gradebgno');
    }
    if(p4Winner >= p4Num){
        $('.grade .gradebtn').eq(3).removeClass('gradebgactive').addClass('gradebgno');
    }
    if(p5Winner >= p5Num){
        $('.grade .gradebtn').eq(4).removeClass('gradebgactive').addClass('gradebgno');
    }
}

//发送异步
function updata(data) {
    $.ajax({
        type: "get",
        url: "/lucky/update",
        data:data,
        dataType: "json",
        success: function (response) {

        }
    });
}