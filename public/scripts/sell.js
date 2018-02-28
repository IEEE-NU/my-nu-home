$('#sell-form').submit(function(event) {
	$(this).ajaxSubmit({
		success: function(response) {
			window.location.href = `/listing/${response.id}`;
		},
		error: function(jqXHR, status, err) {
			// TODO: Handle error adding to database.
			console.error(err);
		},
	});
	
	event.preventDefault();
});