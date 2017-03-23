var index=0;
	$(document).ready(function(){		
		
		var oScript=document.createElement('script');
		oScript.src='http://cache.video.iqiyi.com/jp/avlist/202861101/'+ ++index +'/?callback=jsonp9';
		$('body').append(oScript);
		
	});
	function jsonp9(jsonData){
		/*alert('111111');*/
		var resultCode=jsonData.code;
		
		if(resultCode==='A00000'){
			var videoData = jsonData.data;
			
			var pNum = videoData.pp;
			
			var videoListArr=videoData.vlist;
			
			if(!videoListArr.length){
				
				$('.addMoreBtn').html('已经全部加载完毕').attr('disabled',true);	
				
				return ;
			}
			var videoData=jsonData.data;
			
			var vid = videoData.aid;
			
			var totalCount = videoData.allNum;			
			
			showVideoLists(videoListArr);
			
		}
		
	}
	function showVideoLists(videoListArr){
		
		var tempStr='';
		
		for (var i=0;i<videoListArr.length;i++) {
			
			var video = videoListArr[i];
			
			tempStr+= '<li data-value="'+video.id+'#'+video.vpic+'#'+video.vurl+'">'+ video.shortTitle +'</li>';
		}
		
		if(index==1){
			
			$('.videoList').html(tempStr);
			
		}else{
			
			$('.videoList').append(tempStr);
		}
		
		if(videoListArr.length<75){
			
			$('.addMoreBtn').html('已经全部加载完毕').attr('disabled',true);	
		}
		
		
	}
	function postRequest(){
		
		var oScript=document.createElement('script');
		
		oScript.src='http://cache.video.iqiyi.com/jp/avlist/202861101/'+ ++index +'/?callback=jsonp9';
		
		$('body').append(oScript);
		
	}
	
	$('.addMoreBtn').on('click',function(){
		
		postRequest();
		
	})
	
	$('.videoList').on('click','li',function(){
		
		var selectedValue=$(this).data('value');
		
		var tempArr=selectedValue.split('#');
		
		$('#targetVideo').attr('poster',tempArr[1]);
		
		$('img').attr('src',tempArr[1]);
		
		$('iframe').attr('src',tempArr[2]);
		
		
	})