$('#sell-form').submit(function(event) {
	$.ajax({
		data: $(this).serialize(),		// form data
		type: $(this).attr('method'),
		url: $(this).attr('action'),
		success: function(response) {
			window.location.href = `/listing/${response.id}`;
		},
		error: function(jqXHR, status, err) {
			// TODO: Handle error adding to database.
		},
	});
	event.preventDefault();
});