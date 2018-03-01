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
	$vacancies = $('#vacancies'),
	$genderPreferred = $('#genderPreferred'),
	$subletDetails = $('#sublet-details');

$saleType.change(function() {
	if ($saleType.val() == 'lease') {
		$subletDetails.hide();
		$occupants.val('');
		$vacancies.val('');
		$genderPreferred.val('none');
	} else {
		$subletDetails.show();
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

let $pets = $('#pets'),
	$petsCost = $('#petsCost');

$pets.change(function() {
	if ($pets.val() === 'no') {
		$('#petsCost-field').hide();
		$petsCost.val('');
	} else {
		$('#petsCost-field').show();
	}
}).trigger('change');