$(document).ready(function(){


	$('ul li a').click(function(){
       $('li a').removeClass("active");
       $(this).addClass("active");
      });



		// Start Humber Main Menu Icon Js
	  $('.all_p_humber').click(function(){
	         $(this).toggleClass('open');
	     });
	  //==== End Humber Main Menu Icon Js


	$('.all_p_humber').click(function(){
	    $('.menu ul').slideToggle();
	  });
	  $('.menu ul li a').click(function(){
	         $('.all_p_humber').removeClass('open');
	     });


            AOS.init({
                duration: 800,
            });

	  
});