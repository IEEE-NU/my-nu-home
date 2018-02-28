$('#sell-form').submit(function(event) {
	$.ajax({
		data: $(this).serialize(),		// form data
		type: $(this).attr('method'),
		url: $(this).attr('action'),
		success: function(response) {
			uploadImages();
		},
		error: function(jqXHR, status, err) {
			// TODO: Handle error adding to database.
			console.error(err);
		},
	});
	event.preventDefault();
});

function uploadImages() {
	let files = $('#images')[0].files;
	let formData = new FormData();
	formData.append('images', files);

	$.ajax({
		type: 'POST',
		url: '/images',
		data: formData,
		contentType: false,
     	processData: false,
     	success: function(response) {
     		console.log(response);
     	},
     	error: function(jqXHR, status, err) {
     		console.log("FUCK");
     	}
	});
}