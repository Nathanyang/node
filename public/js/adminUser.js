$(function(){
    $('.del').click(function(e){
        var target = $(e.target);
        var name = target.data('id');
		var tr = $('.item-id-' + id);
	
		$.ajax({
	        type: 'DELETE',
		    url: '/admin/user/list?name=' + id
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
