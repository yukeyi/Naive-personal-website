function wall()
{
    var myurl = "https://wall.cgcgbcbc.com";

    var mysocket = io.connect(myurl);

    var mymessage;
    var number;

    mysocket.on('new message', function(message){
        //alert(message.content);
        //alert(message.headimgurl);
        //alert(message.nickname);
        mymessage = message;
        number = 2;
        messageeventfirst();
    });

    mysocket.on('admin', function(message){
        number = 1;
        mymessage = message;
        flag = -1;
        messageeventfirst();
     });

    getoldmessage();

    var hasadmin = 0;
    var flag = -1;
    function messageeventfirst()
    {
        if(number == 1)
        {
            $("#head1").animate({left:"5%"}, "slow",function(){$("#head1").animate({left:"-5%"}, "slow",function(){$("#head1").animate({left:"0%"}, "slow",messageevent);});});
        }
        else if(hasadmin == 1)
        {
            $("#head2").animate({left: '100%'}, "fast",function(){$("#head3").animate({top: '-27%'}, "slow",messageevent);});
        }
        else {
            $("#head1").animate({top: '-27%'}, "slow");
            $("#head2").animate({top: '-27%'}, "slow");
            $("#head3").animate({top: '-27%'}, "slow", messageevent);
        }
    }

    function messageevent()
    {
        $(".header").css("top","0%");
        $(".header").css("left","0%");
        var len = 0;
        if(number == 1) {
            var words = document.getElementById("head1");

            words.parentNode.removeChild(words);

            var newword = document.createElement("div");
            newword.className = "header";
            newword.id = "head1";

            hasadmin = 1;

            retime();
        }
        else{
            if(hasadmin == 1)
            {
                var words = document.getElementById("head2");
                words.parentNode.removeChild(words);

                words = document.getElementById("head3");
                words.id = "head2";

                var newword = document.createElement("div");
                newword.className = "header";
                newword.id = "head3";
                //retime();
            }
            else {
                var words = document.getElementById("head1");
                words.parentNode.removeChild(words);

                words = document.getElementById("head2");
                words.id = "head1";

                words = document.getElementById("head3");
                words.id = "head2";

                var newword = document.createElement("div");
                newword.className = "header";
                newword.id = "head3";
            }
        }

        var mycss =
            ".content {height: 98%;width:87%;background-color:rgba(128,64,0,0.7);float:left;font-size: 50px;color:aliceblue;font-weight: 600; line-height:150px;}" +
            ".specialcontent {height: 98%;width:87%;background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#15A216), to(#fafafa));float:left;font-size: 50px;color:aliceblue;font-weight: 600; line-height:150px;}" +
            ".specialpic {height:98%;width:13%;float:left;background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#15A216), to(#fafafa));!important;}" +
            ".specialname {height:20%;width:86%;font-size: 20px;color:blue;text-align: center;font-weight: 400;vertical-align: middle}" ;
        var style = document.createElement('style');
        style.type = 'text/css';
        var nod = document.createTextNode(mycss);
        style.appendChild(nod);
        var myhead = document.head || document.getElementsByTagName('head')[0];
        myhead.appendChild(style);

        var pic = document.createElement("div");
        if(number == 1)
            pic.className = "specialpic";
        else
            pic.className = "pic";
        newword.appendChild(pic);

        len = mymessage.content.length;

        if(len > 18)
            var content = document.createElement("marquee");
        else
            var content = document.createElement("div");
        if(number == 1) {
            content.className = "specialcontent";
        }
        else
        {
            content.className = "content";
        }
        if(number == 1)
        {
            content.innerHTML = mymessage.content;
        }
        else
            content.innerHTML = mymessage.content;

        if(len > 99)
        {
            content.innerHTML = "字符过长不予显示。。。";
        }

        newword.appendChild(content);

        var img = document.createElement("img");
        img.className = "myimg";
        if(number == 1)
        {
            img.src = "5.jpg";
        }
        else
            img.src = mymessage.headimgurl;
        //pic.appendChild(img);

        var load = document.createElement("img");
        load.className = "myimg";
        load.src = "3.gif";
        pic.appendChild(load);

        img.onload = function() {
            pic.removeChild(load);
            pic.removeChild(name);
            pic.appendChild(img);
            pic.appendChild(name);
        };

        var name = document.createElement("div");

        if(number == 1)
        {
            name.className = "specialname";
            name.innerHTML = "管理员";
        }
        else {
            name.className = "name";
            name.innerHTML = mymessage.nickname;
        }
        pic.appendChild(name);

        if(number == 1)
        {
            document.body.insertBefore(newword,document.getElementById("head2"));
        }
        else
            document.body.appendChild(newword);

        if(number != 1) {
            $("#head3").css("top", "25%");
            $("#head3").animate({top: '0%'});
            $("#head3").css("top", "0%");
        }
    }

    var timer;

    function retime()
    {
        clearTimeout(timer);
        timer = setTimeout(function(){
            hasadmin = 0;
        },10000);
    }

    function getoldmessage()
    {
        var xhr = new XMLHttpRequest();
        var oldmessage;
        xhr.onreadystatechange = function(event)
        {
            if(xhr.readyState == 4)
            {
                if((xhr.status >= 200 && xhr.status < 300)||xhr.status == 304)
                {
                    oldmessage = eval(xhr.responseText);
                    for(var i = 0;i < 3;i++)
                    {
                        mymessage = oldmessage[i];
                        number = 2;
                        messageevent();
                    }
                }
                else {
                    alert("...");
                }
            }
        };
        xhr.open("GET","https://wall.cgcgbcbc.com/api/messages?num=3",true);
        xhr.send(null);
    }

}

