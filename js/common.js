$(function(){

	var loadHandle = {

		'show': function show() {
			$('.self-load').css('display','block');
		},

		'hide': function hide() {
			setTimeout(function() {
				$('.self-load').css('display','none');
			}, 100);
		},

	};

	var cardTranform = {

		setAttr: function(obj) {
			$('.front').css('transform','rotateY('+ obj['front'] +'deg)');
			$('.back').css('transform','rotateY('+ obj['back'] +'deg)');
		},

		reset: function() {
			var resetObj = {
				'front': 0,
				'back': -180
			};
			cardTranform.setAttr(resetObj);
		},

		rolling: function() {
			var rollingObj = {
				'front': 180,
				'back': 0
			};
			cardTranform.setAttr(rollingObj);
		},

	};

	$('.enter-btn').on('click', function(event) {
		
		var rquestUrl = 'http://lottery.jetchen.cn/api/lottery/draw';
		// var rquestUrl = 'http://dd:7788/api/lottery/draw';

		axios.get(rquestUrl)
        .then(function(res) {
            var msg = res.data.msg;
            var code = res.data.code;
            
        	if(code == 1) {
        		var result = res.data.data;
        		$('#cardimg-front').attr('src', result['pic1']);
        		$('#cardimg-back').attr('src', result['pic2']);
        		$('#coupon-url').attr('href', result['url']);

        		$('.shadow').show();
				$('.shadow-content').show().css('top','45%');
				setTimeout(cardTranform.rolling, 1500);
	        	return false;
        	}

            alert(msg);
        })
        .catch(function(error) {

   //      	$('#cardimg-front').attr('src','./image/card01-front.png');
   //      	$('#cardimg-back').attr('src','./image/card01-back.png');
   //      	$('.shadow').show();
			// $('.shadow-content').show().css('top','45%');
			// setTimeout(cardTranform.rolling, 1500);

			
            alert(error.message);
        });

		

	});


	$('.closebtn').on('click', function(event) {
		
		$('.shadow').hide();
		$('.shadow-content').hide().css('top','-100%');;
		cardTranform.reset();

	});


});





