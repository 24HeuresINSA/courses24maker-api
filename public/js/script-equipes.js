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

	var colEdicHtml = '<tr><td class="idCOUR" hidden></td>' +
		'<td class="nomCOUR"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="prenomCOUR"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="emailCOUR"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="telephoneCOUR"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="tailleteeshirtCOUR"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="certificatCOUR"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="datenaissanceCOUR"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="etudiantCOUR"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="prixCOUR"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="equipevalideCOUR"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="paiementvalideCOUR"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="certificatvalideCOUR"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="commentaireCOUR"><div style="display: none;"></div><input class="form-control input-sm"  value=""></td>' +
		'<td class="buttonRaw" name="buttons">' + saveColHtml + '</td>';

	$('tbody tr').each(function(index){
		$(this).find('.buttonRaw').append(newColHtml);
	});

	$('#but_add').click(function () {
		//$('#bodyTable').append(colEdicHtml);
	});

	var cont1, cont2, cont3, cont4, cont5, cont6, cont7, cont8, cont9, cont10, contA,contB, contC, contD, contE;

	rowEdit = function (but) {
		$(but).parent().find('#bAcep').show();
		$(but).parent().find('#bCanc').show();
		$(but).parent().find('#bEdit').hide();
		$(but).parent().find('#bElim').hide();
		var $row = $(but).parents('tr');
		$row.attr('id', 'editing');

		cont1 = $row.find('.nomCOUR').html();
		$row.find('.nomCOUR').html(
			'<div style="display: none;">' + cont1 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont1 + '">'
		);
		cont2 = $row.find('.prenomCOUR').html();
		$row.find('.prenomCOUR').html(
			'<div style="display: none;">' + cont2 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont2 + '">'
		);
		/*cont3 = $row.find('.equipeCOUR').html();
		$row.find('.equipeCOUR').html(
			'<div style="display: none;">' + cont3 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont3 + '">'
		);
		cont4 = $row.find('.categorieCOUR').html();
		$row.find('.categorieCOUR').html(
			'<div style="display: none;">' + cont4 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont4 + '">'
		);*/
		cont5 = $row.find('.emailCOUR').html();
		$row.find('.emailCOUR').html(
			'<div style="display: none;">' + cont5 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont5 + '">'
		);
		cont6 = $row.find('.telephoneCOUR').html();
		$row.find('.telephoneCOUR').html(
			'<div style="display: none;">' + cont6 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont6 + '">'
		);
		cont7 = $row.find('.tailleteeshirtCOUR').html();
		$row.find('.tailleteeshirtCOUR').html(
			'<div style="display: none;">' + cont7 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont7 + '">'
		);
		/*cont8 = $row.find('.certificatCOUR').html();
		$row.find('.certificatCOUR').html(
			'<div style="display: none;">' + cont8 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont8 + '">'
		);*/
		cont9 = $row.find('.datenaissanceCOUR').html();
		$row.find('.datenaissanceCOUR').html(
			'<div style="display: none;">' + cont9 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont9 + '">'
		);
		cont10 = $row.find('.etudiantCOUR').html();
		$row.find('.etudiantCOUR').html(
			'<div style="display: none;">' + cont10 + '</div>' +
			'<input class="form-control input-sm"  value="' + cont10 + '">'
		);
		/*contA = $row.find('.prixCOUR').html();
		$row.find('.prixCOUR').html(
			'<div style="display: none;">' + contA + '</div>' +
			'<input class="form-control input-sm"  value="' + contA + '">'
		);
		contB = $row.find('.equipevalideCOUR').html();
		$row.find('.equipevalideCOUR').html(
			'<div style="display: none;">' + contB + '</div>' +
			'<input class="form-control input-sm"  value="' + contB + '">'
		);*/
		contC = $row.find('.paiementvalideCOUR').html();
		$row.find('.paiementvalideCOUR').html(
			'<div style="display: none;">' + contC + '</div>' +
			'<input class="form-control input-sm"  value="' + contC + '">'
		);
		contD = $row.find('.certificatvalideCOUR').html();
		$row.find('.certificatvalideCOUR').html(
			'<div style="display: none;">' + contD + '</div>' +
			'<input class="form-control input-sm"  value="' + contD + '">'
		);
		contE = $row.find('.commentaireCOUR').html();
		$row.find('.commentaireCOUR').html(
			'<div style="display: none;">' + contE + '</div>' +
			'<input class="form-control input-sm"  value="' + contE + '">'
		);
	}

	rowElim = function (but) {
		var $row = $(but).parents('tr');
		$row.attr('id', 'editing');
		var uuid = $row.find('.idCOUR').html();

		$('#modalConfirmDelete').modal({
			show: true
		});

		$('#btnNO').click(function(){

		});

		$('#btnYES').click(function(){
			$row.remove();
			$.ajax({
				type: "DELETE",
				url: "/coureur/"+ uuid,
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

		var uuid = $row.find('.idCOUR').html();

		var cont11 = $row.find('.nomCOUR').find('input').val();
		$row.find('.nomCOUR').html(cont11);
		var cont22 = $row.find('.prenomCOUR').find('input').val();
		$row.find('.prenomCOUR').html(cont22);
		var cont55 = $row.find('.emailCOUR').find('input').val();
		$row.find('.emailCOUR').html(cont55);
		var cont66 = $row.find('.telephoneCOUR').find('input').val();
		$row.find('.telephoneCOUR').html(cont66);
		var cont77 = $row.find('.tailleteeshirtCOUR').find('input').val();
		$row.find('.tailleteeshirtCOUR').html(cont77);
		/*var cont88 = $row.find('.certificatCOUR').find('input').val();
		$row.find('.certificatCOUR').html(cont88);*/
		var cont99 = $row.find('.datenaissanceCOUR').find('input').val();
		$row.find('.datenaissanceCOUR').html(cont99);
		var cont1010 = $row.find('.etudiantCOUR').find('input').val();
		$row.find('.etudiantCOUR').html(cont1010);
		var contAA = $row.find('.prixCOUR').find('input').val();
		$row.find('.prixCOUR').html(contAA);
		var contBB = $row.find('.equipevalideCOUR').find('input').val();
		$row.find('.equipevalideCOUR').html(contBB);
		var contCC = $row.find('.paiementvalideCOUR').find('input').val();
		$row.find('.paiementvalideCOUR').html(contCC);
		var contDD = $row.find('.certificatvalideCOUR').find('input').val();
		$row.find('.certificatvalideCOUR').html(contDD);
		var contEE = $row.find('.commentaireCOUR').find('input').val();
		$row.find('.commentaireCOUR').html(contEE);

		var ladata = { coureur: {
				coureur_nom: cont11,
				coureur_prenom: cont22,
				coureur_email: cont55,
				coureur_telephone: cont66,
				coureur_taille_tee_shirt: cont77,
				coureur_date_naissance: cont99,
				coureur_etudiant: cont1010,
				coureur_paiement: contCC,
				coureur_certificat_valide: contDD,
				coureur_commentaire: contEE
		}};

		if(uuid==''){
			$.ajax({
				type: "POST",
				url: "/coureur",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(ladata),
				complete: function (xhr, status, errorThrown) {
					console.log("Status : " + xhr.status);
					console.log("Response : " + xhr.responseText);
					if (xhr.status == 201) {
						$row.find('.idCOUR').html(JSON.parse(xhr.responseText).uuid);
					} else if (xhr.status == 400 || xhr.status == 409) {

					} else {

					}
				}
			});
		}else{
			$.ajax({
				type: "PUT",
				url: "/coureur/"+uuid,
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(ladata),
				complete: function (xhr, status, errorThrown) {
					console.log("Status : " + xhr.status);
					console.log("Response : " + xhr.responseText);
					if (xhr.status == 201) {
						$row.find('.idCOUR').html(JSON.parse(xhr.responseText).uuid);
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

		$row.find('.nomCOUR').html(cont1);
		$row.find('.prenomCOUR').html(cont2);
		//$row.find('.equipeCOUR').html(cont3);
		//$row.find('.categorieCOUR').html(cont4);
		$row.find('.emailCOUR').html(cont5);
		$row.find('.telephoneCOUR').html(cont6);
		$row.find('.tailleteeshirtCOUR').html(cont7);
		//$row.find('.certificatCOUR').html(cont8);
		$row.find('.datenaissanceCOUR').html(cont9);
		$row.find('.etudiantCOUR').html(cont10);
		//$row.find('.prixCOUR').html(contA);
		//$row.find('.equipevalideCOUR').html(contB);
		$row.find('.paiementvalideCOUR').html(contC);
		$row.find('.certificatvalideCOUR').html(contD);
		$row.find('.commentaireCOUR').html(contE);
	}

	valider = function(id){
		var ladata = { equipe: {
				equipe_valide: 1
			}};

		$.ajax({
			type: "PUT",
			url: "/equipe/"+id,
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify(ladata),
			complete: function (xhr, status, errorThrown) {
				console.log("Status : " + xhr.status);
				console.log("Response : " + xhr.responseText);
				if (xhr.status == 204) {
					$('.nomEQ').removeClass("btn-primary").removeClass("btn-danger").addClass("btn-success");
					$('.labelEQ').replaceWith("<div class=\"d-inline badge-success mr-5 labelEQ\">Validée</div>");
				} else if (xhr.status == 400 || xhr.status == 409) {

				} else {

				}
			}
		});
	}

	rejeter = function(id){
		var ladata = { equipe: {
				equipe_valide: 2
			}};

		$.ajax({
			type: "PUT",
			url: "/equipe/"+id,
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify(ladata),
			complete: function (xhr, status, errorThrown) {
				console.log("Status : " + xhr.status);
				console.log("Response : " + xhr.responseText);
				if (xhr.status == 204) {
					$('.nomEQ').removeClass("btn-success").removeClass("btn-primary").addClass("btn-danger");
					$('.labelEQ').replaceWith("<div class=\"d-inline badge-danger mr-5 labelEQ\">Rejetée</div>");
				} else if (xhr.status == 400 || xhr.status == 409) {

				} else {

				}
			}
		});
	}

	encours = function(id){
		var ladata = { equipe: {
				equipe_valide: 0
			}};

		$.ajax({
			type: "PUT",
			url: "/equipe/"+id,
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify(ladata),
			complete: function (xhr, status, errorThrown) {
				console.log("Status : " + xhr.status);
				console.log("Response : " + xhr.responseText);
				if (xhr.status == 204) {
					$('.nomEQ').removeClass("btn-success").removeClass("btn-danger").addClass("btn-primary");
					$('.labelEQ').replaceWith("<div class=\"d-inline badge-primary mr-5 labelEQ\">En cours de validation</div>");
				} else if (xhr.status == 400 || xhr.status == 409) {

				} else {

				}
			}
		});
	}

	supprimer = function (id) {
		$('#modalConfirmDelete2').modal({
			show: true
		});

		$('#btn2NO').click(function(){

		});

		$('#btn2YES').click(function(){
			$.ajax({
				type: "DELETE",
				url: "/equipe/"+ id,
				complete: function (xhr, status, errorThrown) {
					//console.log("Status : " + xhr.status);
					//console.log("Response : " + xhr.responseText);
					if (xhr.status == 204) {
						window.location.replace("/admin/equipes");
					} else if (xhr.status == 400 || xhr.status == 409) {

					} else {
					}
				}
			});
		});

	}


});
