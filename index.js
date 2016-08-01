$(function(){
	kongbai={};
	for(var i=0;i<15;i++){
		$('<b>')
		.addClass('hang')
		.appendTo('.qipan')
		$('<i>')
		.addClass('shu')
		.appendTo('.qipan')
		for(var j=0;j<15;j++){
			kongbai[i+'-'+j]={x:i,y:j};
			$('<div>')
			.addClass('qizi')
			.attr('id',i+'-'+j)
			.data('pos',{x:i,y:j})
			.appendTo('.qipan')
		}
	}
	var flag=true;
	var biao={};
	var isAi=true;
	$('.renji').on('click',function(){
		isAi=true;
	});
	$('.renren').on('click',function(){
		isAi=false;
	});
	$('.qipan .qizi').on('click',function(){
	if($(this).hasClass('hei')||$(this).hasClass('bai')){
		return;
	};
	var pos=$(this).data('pos');
		if (flag)  {
			$(this).addClass('hei');
			biao[pos.x+'-'+pos.y]='hei';
			delete kongbai[pos.x+'-'+pos.y];
			if (panduan(pos,'hei')>=5) {
				alert('黑棋赢');
				$('.qipan .qizi').off('click');
			};
        if(isAi){
        	var pos=ai();
        	$('#'+pos.x+'-'+pos.y).addClass('bai');
			biao[pos.x+'-'+pos.y]='bai';
			delete kongbai[pos.x+'-'+pos.y];
			if (panduan(pos,'bai')>=5) {
				alert('白棋赢');
				$('.qipan .qizi').off('click');
			};
           return;
        }
		}else{
           $(this).addClass('bai');
			biao[pos.x+'-'+pos.y]='bai';
			if (panduan(pos,'bai')>=5) {
				alert('白棋赢');
				$('.qipan .qizi').off('click');
			};
		};
		flag=!flag;
	});

	var ai=function(){
		var zuobiao1;
		var max1=-Infinity;
		for (var i in kongbai) {
			var weixie=panduan(kongbai[i],'hei');
			if(weixie>max1){
				max1=weixie;
				zuobiao1=kongbai[i];
			};
		};
		var zuobiao2;
		var max2=-Infinity;
		for (var i in kongbai) {
			var weixie=panduan(kongbai[i],'bai');
			if(weixie>max2){
				max2=weixie;
				zuobiao2=kongbai[i];
			};
		};
		return (max1>max2)?zuobiao1:zuobiao2;
	}

    var panduan=function(pos,color){	
		var dict={};
		for(var i in biao){
			if(biao[i]===color){
				dict[i]=true;
			};
		};
        var h=1,s=1,zx=1,yx=1;
        var tx,ty;
       //横排       
        tx=pos.x;ty=pos.y;
        while(dict[tx+'-'+(ty-1)]){
        	h++;ty--;
        };
        tx=pos.x;ty=pos.y;
        while(dict[tx+'-'+(ty+1)]){
        	h++;ty++;
        };
   
       //竖排
       tx=pos.x;ty=pos.y;
       while(dict[(tx-1)+'-'+ty]){
       	s++;tx--;
       };
       tx=pos.x;ty=pos.y;
       while(dict[(tx+1)+'-'+ty]){
       	s++;tx++;
       };
       
        //左斜
        tx=pos.x;ty=pos.y;
        while(dict[(tx-1)+'-'+(ty+1)]){
        	zx++;tx--;ty++;
        };
        tx=pos.x;ty=pos.y;
        while(dict[(tx+1)+'-'+(ty-1)]){
        	zx++;tx++;ty--;
        };
        
         //右斜
        tx=pos.x;ty=pos.y;
        while(dict[(tx-1)+'-'+(ty-1)]){
        	yx++;tx--;ty--;
        };
        tx=pos.x;ty=pos.y;
        while(dict[(tx+1)+'-'+(ty+1)]){
        	yx++;tx++;ty++;
        };
        return Math.max(h,s,zx,yx);
	};





})