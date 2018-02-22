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

let $saleType = $('#saleType'),
	$occupants = $('#occupants'),
	$vacancies = $('#vacancies');

$saleType.change(function() {
	if ($saleType.val() == 'lease') {
		$('#occupants-field').hide();
		$('#vacancies-field').hide();
		$occupants.val('');
		$vacancies.val('');
	} else {
		$('#occupants-field').show();
		$('#vacancies-field').show();
	}
}).trigger('change');

let $parking = $('#parking'),
	$parkingCost = $('#parkingCost');

$parking.change(function() {
	if ($parking.val() === 'no') {
		$('#parkingCost-field').hide();
		$parkingCost.val('');
	} else {
		$('#parkingCost-field').show();
	}
}).trigger('change');