$(function () {
    var slideWidth = $('.slide').outerWidth(); // .slideの幅を取得して代入
    var slideNum = $('.slide').length; // .slideの数を取得して代入
    console.log(slideNum)
    var slideCount = 1;  //slideの初期値
    var indicator = $(".indicator");
    var indicatorHTML = "";
    var dotIndex = 1;
    var slideSetWidth = slideWidth * (slideNum + slideWidth * 3); // .slideの幅×数で求めた値を代入
    $('.slideSet').css('width', slideSetWidth); // .slideSetのCSSにwidth: slideSetWidthを指定
    var clickFlag = true;
    $(".slideSet").stop(true).animate({
        left: slideCount * -slideWidth
    }, 0);
    // body
    let background = document.querySelector(".back");
    // slide
    let slidearray = document.querySelectorAll(".slide img");
    console.log(slidearray);

    //インジケーターの生成
    $(".slide").each(function () {
        indicatorHTML += `<div class="dot" id="${dotIndex}">` + '</div>';
        indicator.html(indicatorHTML);
        dotIndex++;
    });

    //インジケーター初期位置
    $(".dot:first-child").css({
        backgroundColor: "#00BCD4"
    });

    //最初のスライドを複製してslideSet内最後に付け加える
    function cloneSlide() {
        $(".slideSet").find(".slide:last-child").clone(true).prependTo($(".slideSet"));
        $(".slideSet").find(".slide:nth-child(2)").clone(true).appendTo($(".slideSet"));
    };

    //インジケーター
    $(".dot").click(function () {
        //クリックされたドットの特定
        var idname = $(this).attr("id");
        var currentDot = $(`.dot#${idname}`);
        $(".dot").css({
            backgroundColor: "#333"
        });
        currentDot.css({
            backgroundColor: "#00BCD4"
        });
        //クリックされたドット位置とスライド位置を揃える
        slideCount = idname;
        $(".slideSet").stop(true).animate({
            left: slideCount * -slideWidth
        });
        background.setAttribute("style","background-image:url(" + slidearray[slideCount-1].src + ")");
    });

    //ドットの色
    function dotColor() { //currentDot→slideCount
        if (slideCount > slideNum) {
            currentDot = $(`.dot#${idname - 6}`);
        } else if (slideCount == 0) {
            currentDot = $(`.dot#5`);
        } else {
            currentDot = $(`.dot#${idname}`);
        }
        $(".dot").css({
            backgroundColor: "#333"
        });
        currentDot.css({
            backgroundColor: "#00BCD4"
        });
    }

    //変数slidingにアニメーション効果を格納
    function sliding() {
        var duration = 500;

        //スライドの移動処理
        $(".slideSet").stop(true).animate({
            left: slideCount * -slideWidth
        }, duration, function () {
            clickFlag = true;
        });
        console.log("reset" + slideCount);

        //slideCountが1以下だった場合
        if (slideCount <= 0) {
            //スライド1枚目から6枚目に移動(アニメーション0秒)
            slideCount = slideNum;
            console.log(slideCount);
            delayedCall(0.5, function () {
                $(".slideSet").animate({
                    left: slideCount * -slideWidth
                }, 3);
            });
            //slideCountがslideNum上限に差し掛かった場合
        } else if (slideCount > slideNum) {
            console.log("next" + slideCount);
            slideCount = 1;
            delayedCall(0.5, function () {
                $(".slideSet").animate({
                    left: slideCount * -slideWidth
                }, 0);
            });
        }
        function delayedCall(second, callBack) {
            setTimeout(callBack, second * 1000);
        }
    }

    background.setAttribute("style","background-image:url(" + slidearray[0].src + ")")

    //nextボタン押下でsliding実行
    function sliderNext() {
        $(".slider-next").click(function () {
            if (clickFlag) {
                clickFlag = false;
                slideCount++;
                sliding();
                idname = slideCount;
                console.log("idname" + idname);
                console.log("slideNum" + slideNum);
                console.log("slideCount" + slideCount);
                dotColor();
                for(let i = 0;i < slidearray.length;i++){
                    if(i === slideCount-1){
                        background.setAttribute("style","background-image:url(" + slidearray[i].src + ")");
                    }
                }
            } else {
                return false;
            }
        });
    }
    //prevボタン押下でsliding実行
    function sliderPrev() {
        $(".slider-prev").click(function () {
            if (clickFlag) {
                clickFlag = false;
                slideCount--;
                sliding();
                idname = slideCount;
                console.log("idname" + idname);
                console.log("slideNum" + slideNum);
                console.log("slideCount" + slideCount);
                dotColor();
                for(let i = 0;i < slidearray.length;i++){
                    if(i === slideCount-1){
                        background.setAttribute("style","background-image:url(" + slidearray[i].src + ")");
                    }
                }
            } else {
                return false;
            }
        });
    }


    function init() {
        cloneSlide();
        sliding();
    }
    init();
    //イベント発火
    sliderNext();
    sliderPrev();
});
