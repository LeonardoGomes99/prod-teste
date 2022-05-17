$(document).ready(function(){
    $("#iniciar").click(function(){
        $('#page_1').hide();
        $("#page_1").fadeOut();

        $("#page_2").fadeIn(1000);
        $('video').trigger('play');
        setTimeout(startQuiz, 7000);
    });

    function startQuiz(){
        $('#video_player').trigger('pause');
    }
});
