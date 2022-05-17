// VARIAVEIS PARA CONTROLE DE SLIDERS

// PEGA O TEMPO EM QUE A PESSOA PAROU NO PRIMEIRO VIDEO
var video_time = 0;

// CASO A PESSOA JÁ TENHA PASSADO DO SLIDER 3 E DESEJA RETORNAR,
// ELE EVITA QUE O VIDEO FIQUE REINICIANDO
var firstTimeHere = true;

// PARA SABER QUAL DOS VIDEOS VER TELA CHEIA
var videoId = 1;

$(document).ready(function(){

    // INICIO DA FUNÇÃO DE VERIFICAÇÃO DE SLIDER ('MAIS INFORMAÇÕES NA DECLARAÇÃO')
    start();

    //ESCONDENDO O PAINEL DE AÇÃO DOS SLIDERS
    $('#panel_center_control').hide();


    // AO CLICAR EM INICIAR ELE VAI ESCONDER A TELA INICIAL E MOSTRAR OS SLIDERS
    $("#initialize-button").click(function(){
        $('#page_1').hide();
        $("#page_1").fadeOut();

        $('#panel_center_control').fadeIn(100);
        $("#page_2").fadeIn(1000);
        $('#video_player_1').trigger('play');
    });

    // FUNÇÃO DE PULAR O SLIDER QUANDO ACABAR O VIDEO 1
    $('#video_player_1').on('ended',function(){
        $('#carouselExampleControls').carousel('next');
    });


    // BOTOES DE AÇÃO DOS SLIDERS

    // - BOTAO QUE VAI PARA HOMEPAGE
    $('#go-to-homepage').click(function(){
        location.reload();
    });

    // - BOTAO QUE COLOCA VIDEO EM TELA CHEIA
    $("#go-fullscreen").click(function(){
        var elem = document.getElementById("video_player_"+videoId);
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }          
    });

    // - BOTAO QUE VOLTA SLIDER
    $("#previous-button").click(function(){
        $('#carouselExampleControls').carousel('prev');
    });

    // - BOTAO QUE AVANÇA SLIDER
    $("#next-button").click(function(){
        $('#carouselExampleControls').carousel('next');
    });

    // BOTOES DO MODAL
    // - BOTAO QUE ABRE MODAL
    $('#quiz-options div').click(function(){
        $('#myModal').modal('show');
    });

    // - BOTAO QUE FECHA MODAL
    $('#close_modal_button').click(function(){
        $('#myModal').modal('hide');
    });

    

        // AQUI TEMOS UMA FUNÇÃO ONDE ELA VERIFICA CADA UM DOS SLIDERS DO CARROSSEL A CADA 0.5s,
        // DEPENDENDO DO SLIDER ELE VAI PARAR O(S) VIDEO(S), ESCONDER BOTÕES OU
        // MOSTRAR OS BOTÕES
        function start(){
            var startIntr = setInterval(function() {
            var currentIndex = $('div.active').index() + 1;
            console.log(currentIndex + '/' + firstTimeHere);

            // SE ESTIVER NA PAGINA 2 DO SLIDER ELE EXECUTA OS COMANDOS ABAIXO
            if(currentIndex == 2){
                $('#video_player_1').trigger('pause');
                video_time = $('#video_player_1').prop('currentTime');
                $('#go-fullscreen').hide();
                $('#previous-button').prop("disabled",true);
            }

            // SE ESTIVER NA PAGINA 3 DO SLIDER ELE EXECUTA OS COMANDOS ABAIXO, O PRIMEIRO É PARA SETAR 
            // ONDE A PESSOA PAROU NO VIDEO
            if(currentIndex == 3 && firstTimeHere == true){

                videoId = 2  
                $('#video_player_1').trigger('pause');
                $('#video_player_2')[0].currentTime = video_time;        
                $('#video_player_2').trigger('play'); 
                $('#go-fullscreen').show();
                $('#previous-button').prop("disabled",false);
                $('#next-button').show();
                firstTimeHere = false;
            }

            // SE ESTIVER NA PAGINA 3 DO SLIDER ELE EXECUTA OS COMANDOS ABAIXO, CASO A PESSOA JÁ TENHA 
            // PASSADO PELO SLIDER 3, PARA NAO RESETAR O VIDEO VÁRIAS VEZES
            if(currentIndex == 3 && firstTimeHere == false){

                videoId = 2
                $('#video_player_1').trigger('pause');
                $('#go-fullscreen').show();
                $('#previous-button').prop("disabled",false);
                $('#next-button').show();

            }

            // SE ESTIVER NA PAGINA 4 DO SLIDER ELE EXECUTA OS COMANDOS ABAIXO
            if(currentIndex == 4){
                $('#video_player_1').trigger('pause');
                $('#video_player_2').trigger('pause'); 
                $('#go-fullscreen').hide();
                $('#next-button').hide();
            }
        }, 500);
    }
});
