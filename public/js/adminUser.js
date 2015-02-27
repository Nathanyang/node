$(function(){
    $('.del').click(function(e){
        var target = $(e.target);
        var name = target.data('id');
		var tr = $('.item-id-' + name);
	
		$.ajax({
	        type: 'DELETE',
		    url: '/admin/user/del?name=' + name
		})
		.done(function(results){
		    if(results.success === 1){
		    	if(tr.length > 0) {
			    	tr.remove();
				}
		    }
		})
	})
})
