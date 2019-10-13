$( document ).ready(function() {

	var newColHtml = '<div class="btn-group pull-right">' +
		'<button id="bEdit" type="button" class="btn btn-sm btn-default"  onclick="rowEdit(this);">' +
		'<i class="fas fa-pencil-alt"></i>' +
		'</button>' +
		'<button id="bElim" type="button" class="btn btn-sm btn-default"  onclick="rowElim(this);">' +
		'<i class="fas fa-trash" aria-hidden="true"></i>' +
		'</button>' +
		'<button id="bAcep" type="button" class="btn btn-sm btn-default"  style="display:none;" onclick="rowAcep(this);">' +
		'<i class="fas fa-check"></i>' +
		'</button>' +
		'<button id="bCanc" type="button" class="btn btn-sm btn-default" style="display:none;"  onclick="rowCancel(this);">' +
		'<i class="fas fa-times" aria-hidden="true"></i>' +
		'</button>' +
		'</div>';

	var saveColHtml = '<div class="btn-group pull-right">' +
		'<button id="bEdit" type="button" class="btn btn-sm btn-default" style="display:none;" onclick="rowEdit(this);">' +
		'<i class="fas fa-pencil-alt"></i>' +
		'</button>' +
		'<button id="bElim" type="button" class="btn btn-sm btn-default" style="display:none;" onclick="rowElim(this);">' +
		'<i class="fas fa-trash" aria-hidden="true"></i>' +
		'</button>' +
		'<button id="bAcep" type="button" class="btn btn-sm btn-default"   onclick="rowAcep(this);">' +
		'<i class="fas fa-check"></i>' +
		'</button>' +
		'<button id="bCanc" type="button" class="btn btn-sm btn-default"  onclick="rowCancel(this);">' +
		'<i class="fas fa-times" aria-hidden="true"></i>' +
		'</button>' +
		'</div>';

	var colEdicHtml = '<tr><td class="idCAT" hidden></td>' +
		'<td class="nomCAT"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="descriptionCAT"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="nbmaxCAT"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="typeCAT"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="nbtotalCAT"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="prixnormalCAT"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="prixvaCAT"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="completCAT"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="buttonRaw" name="buttons">' + saveColHtml + '</td>';

	$('tbody tr').each(function(index){
		$(this).find('.buttonRaw').append(newColHtml);
	});

	$('#but_add').click(function () {
		$('#bodyTable').append(colEdicHtml);
	});

	var cont1, cont2, cont3, cont4, cont5, cont6, cont7, cont8;

	rowEdit = function (but) {
		$(but).parent().find('#bAcep').show();
		$(but).parent().find('#bCanc').show();
		$(but).parent().find('#bEdit').hide();
		$(but).parent().find('#bElim').hide();
		var $row = $(but).parents('tr');
		$row.attr('id', 'editing');

		cont1 = $row.find('.nomCAT').html();
		$row.find('.nomCAT').html(
			'<div style="display: none;">' + cont1 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont1 + '">'
		);
		cont2 = $row.find('.descriptionCAT').html();
		$row.find('.descriptionCAT').html(
			'<div style="display: none;">' + cont2 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont2 + '">'
		);
		cont3 = $row.find('.nbmaxCAT').html();
		$row.find('.nbmaxCAT').html(
			'<div style="display: none;">' + cont3 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont3 + '">'
		);
		cont4 = $row.find('.typeCAT').html();
		$row.find('.typeCAT').html(
			'<div style="display: none;">' + cont4 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont4 + '">'
		);
		cont5 = $row.find('.nbtotalCAT').html();
		$row.find('.nbtotalCAT').html(
			'<div style="display: none;">' + cont5 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont5 + '">'
		);
		cont6 = $row.find('.prixnormalCAT').html();
		$row.find('.prixnormalCAT').html(
			'<div style="display: none;">' + cont6 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont6 + '">'
		);
		cont7 = $row.find('.prixvaCAT').html();
		$row.find('.prixvaCAT').html(
			'<div style="display: none;">' + cont7 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont7 + '">'
		);
		cont8 = $row.find('.completCAT').html();
		$row.find('.completCAT').html(
			'<div style="display: none;">' + cont8 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont8 + '">'
		);
	}

	rowElim = function (but) {
		var $row = $(but).parents('tr');
		$row.attr('id', 'editing');
		var uuid = $row.find('.idCAT').html();

		$('#modalConfirmDelete').modal({
			show: true
		});

		$('#btnNO').click(function(){

		});

		$('#btnYESSi').click(function(){
			$row.remove();
			$.ajax({
				type: "DELETE",
				url: "/categorie/"+ uuid,
				complete: function (xhr, status, errorThrown) {
					//console.log("Status : " + xhr.status);
					//console.log("Response : " + xhr.responseText);
					if (xhr.status == 204) {

					} else if (xhr.status == 400 || xhr.status == 409) {

					} else {
					}
				}
			});
		});

	}

	rowAcep = function (but) {
		$(but).parent().find('#bAcep').hide();
		$(but).parent().find('#bCanc').hide();
		$(but).parent().find('#bEdit').show();
		$(but).parent().find('#bElim').show();
		var $row = $(but).parents('tr');
		$row.attr('id', '');

		var uuid = $row.find('.idCAT').html();

		var cont11 = $row.find('.nomCAT').find('input').val();
		$row.find('.nomCAT').html(cont11);
		var cont22 = $row.find('.descriptionCAT').find('input').val();
		$row.find('.descriptionCAT').html(cont22);
		var cont33 = $row.find('.nbmaxCAT').find('input').val();
		$row.find('.nbmaxCAT').html(cont33);
		var cont44 = $row.find('.typeCAT').find('input').val();
		$row.find('.typeCAT').html(cont44);
		var cont55 = $row.find('.nbtotalCAT').find('input').val();
		$row.find('.nbtotalCAT').html(cont55);
		var cont66 = $row.find('.prixnormalCAT').find('input').val();
		$row.find('.prixnormalCAT').html(cont66);
		var cont77 = $row.find('.prixvaCAT').find('input').val();
		$row.find('.prixvaCAT').html(cont77);
		var cont88 = $row.find('.completCAT').find('input').val();
		$row.find('.completCAT').html(cont88);

		var ladata = { categorie: {
				categorie_nom: cont11,
				categorie_description: cont22,
				categorie_nb_max: cont33,
				categorie_type: cont44,
				categorie_prix_normal: cont66,
				categorie_prix_va: cont77,
				categorie_complet: cont88
		}};

		if(uuid==''){
			$.ajax({
				type: "POST",
				url: "/categorie",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(ladata),
				complete: function (xhr, status, errorThrown) {
					console.log("Status : " + xhr.status);
					console.log("Response : " + xhr.responseText);
					if (xhr.status == 201) {
						$row.find('.idCAT').html(JSON.parse(xhr.responseText).uuid);
					} else if (xhr.status == 400 || xhr.status == 409) {

					} else {

					}
				}
			});
		}else{
			$.ajax({
				type: "PUT",
				url: "/categorie/"+uuid,
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(ladata),
				complete: function (xhr, status, errorThrown) {
					console.log("Status : " + xhr.status);
					console.log("Response : " + xhr.responseText);
					if (xhr.status == 201) {
						$row.find('.idCAT').html(JSON.parse(xhr.responseText).uuid);
					} else if (xhr.status == 400 || xhr.status == 409) {

					} else {

					}
				}
			});
		}

	}

	rowCancel = function (but) {
		$(but).parent().find('#bAcep').hide();
		$(but).parent().find('#bCanc').hide();
		$(but).parent().find('#bEdit').show();
		$(but).parent().find('#bElim').show();
		var $row = $(but).parents('tr');
		$row.attr('id', '');

		$row.find('.nomCAT').html(cont1);
		$row.find('.descriptionCAT').html(cont2);
		$row.find('.nbmaxCAT').html(cont3);
		$row.find('.typeCAT').html(cont4);
		$row.find('.nbtotalCAT').html(cont5);
		$row.find('.prixnormalCAT').html(cont6);
		$row.find('.prixvaCAT').html(cont7);
		$row.find('.completCAT').html(cont8);
	}


});
