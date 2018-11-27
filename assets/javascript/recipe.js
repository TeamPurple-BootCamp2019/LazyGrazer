

$(".secondpage").hide();
var queryURLbase = "https://api.edamam.com/search?&app_id=192e6853&app_key=97cc74f29550dbca8f09e9ac463a150f&from=0&to=13&q=";
var ingShowList = [];
var digests = [];
var calories = [];
var weights = [];
var cookTimes = [];
var instructions = [];
var imageShowList = [];
var nameRecipe = [];
var totalIngredients = [];
var ingWeightList = [];
var nutritionFacts = [];
var nutritionTotal = [];
function doAjax(queryURL) {
	fetch(queryURL)
		.then((resp) => resp.json())
		.then(function (data) {
			console.log(data);
			var flex = $('<div class="row">');
			for (var i = 0; i < 12; i++) {
				var ingList = $(`<ul class="ul">
									<li>
									<h4>Ingerediant</h4>
									</li>
									`
					// <th scope="col">Weight(ounce)</th>

				);
				var weightList = $(`<ul class="ul">
									<li>
										<h4>Weight(ounce)</h4>
									</li>
									`
				);
				var nutritionfacts = $(`<ul class="ul">
									<li>
										<h4>Nutrition Facts</h4>
									</li>
									`
				);
				var nutritiontotal = $(`<ul class="ul">
									<li>
										<h4>Total</h4>
									</li>
									`
				);
				var digestList = $(`<table class="table">
								<thead class="thead-dark">
								<tr>
									<th scope="col">Nutrition facts</th>
									<th scope="col">Total</th>
								</tr>
								</thead>
								<tbody>`
				);

				for (var j = 0; j < data.hits[i].recipe.ingredients.length; j++) {
					var ingcon = data.hits[i].recipe.ingredients.length;
					totalIngredients.push(ingcon);
					var ing = data.hits[i].recipe.ingredients[j].text;
					var ingweight = data.hits[i].recipe.ingredients[j].weight;
					ingList.append(`<li>${ing}</li>`);
					weightList.append(`<li>${ingweight}</li>`);
				}
				for (var j = 0; j < data.hits[i].recipe.digest.length; j++) {
					var dig = data.hits[i].recipe.digest[j].label;
					var digTotal = data.hits[i].recipe.digest[j].total;
					digestList.append(`<tr class="table-warning"><td class="table-warning">${dig}</td><td class="table-warning">${digTotal}</td></tr>`)
					nutritionfacts.append(`<li>${dig}</li>`);
					nutritiontotal.append(`<li>${digTotal}</li>`);
				}
				calories.push(data.hits[i].recipe.calories);
				weights.push(data.hits[i].recipe.totalWeight);
				cookTimes.push(data.hits[i].recipe.totalTime);
				instructions.push(data.hits[i].recipe.url);
				digests.push(digestList);
				ingShowList.push(ingList);
				ingWeightList.push(weightList);
				nutritionFacts.push(nutritionfacts);
				nutritionTotal.push(nutritiontotal);


				var card = $(`<div data-content=${i} class="radius bordered shadow card addVids">`);
				var img = $("<img class='image '>");
				imgAPI = data.hits[i].recipe.image;
				imageShowList.push(imgAPI);
				img.attr("src", imgAPI);
				card.append(img);

				title = data.hits[i].recipe.label;
				nameRecipe.push(title);
				// var link = $(`<a href="#" style="text-decoration:none;" >`);
				var sec = $("<div class='card-divider'>")
				var span = $('<p style="margin-top:10px;">');
				span.text(title);
				sec.append(span);
				// sec.append(link);
				card.append(sec);
				flex.append(card);


			};
			$('.recipeList').append(flex);
		});
};
// ===============First page load==============
$(".secondpage").hide();
var firstload = "sandwich";
var searchURL = queryURLbase + firstload;
doAjax(searchURL);
// ===============First page load end==============

$(document).on('click', '.addVids', function () {
	// ===============second page load==============
	$(".secondpage").show();
	var imgsrc = (imageShowList[parseInt($(this).attr('data-content'))]);
	var datacon = ($(this).attr('data-content'));
	var im = $("<img class='thumbnail' data-content'" + datacon + "'>");
	im.attr("src", imgsrc);
	$(".secondpageimg").append(im);
	$(".name").append(nameRecipe[parseInt($(this).attr('data-content'))]);
	$('.arti').append(ingShowList[parseInt($(this).attr('data-content'))]);
	$('.wei').append(ingWeightList[parseInt($(this).attr('data-content'))]);
	$('.nutritions').append(nutritionFacts[parseInt($(this).attr('data-content'))]);
	$('.nutritionstot').append(nutritionTotal[parseInt($(this).attr('data-content'))]);
	// ===============second page load==============
	$('.article').empty();
	$('.article').append(`<button type="button" class="btn btn-primary back">Back</button>`);
	$('.article').append('<hr>');
	$('.article').append('<h2>Ingredients</h2>');
	// $('.article').append(ingShowList[parseInt($(this).attr('data-content'))]);
	$('.article').append('<hr>');
	$('.article').append('<h2>Nutritions</h2>');
	// $('.article').append(digests[parseInt($(this).attr('data-content'))]);
	$('.article').append('<hr>');
	$('.article').append('<h2>Calories</h2>');
	$('.article').append(`<h3>${calories[$(this).attr('data-content')]}</h3>`);
	$('.article').append('<hr>');
	$('.article').append('<h2>Weight</h2>');
	$('.article').append(`<h3>${weights[$(this).attr('data-content')]}</h3>`);
	$('.article').append('<hr>');
	$('.article').append('<h2>Cook Time</h2>');
	$('.article').append(`<h3>${cookTimes[$(this).attr('data-content')]} /minutes</h3>`);
	$('.article').append('<hr>');
	$('.article').append('<h2>Instructions</h2>');
	$('.article').append(`<a target="_blank" href="${instructions[$(this).attr('data-content')]}"><h3>Click here to see instructions</h3>`);

});

$(".addRecipe").on("click", function (e) {
	$(".secondpage").hide();
	$(".recipeList").empty();
	$(".recipe-list").empty();
	e.preventDefault();

	userInput = $("#targetRecipe").val().trim().toLowerCase();

	var searchURL = queryURLbase + userInput;
	doAjax(searchURL);
	$("#targetRecipe").val("");
});

// var saveLatter = [];
// $(".salad").on("click", function (event) {
// 	event.preventDefault();
// 	alert("salad click");
// 	console.log("click");
// });
// $(document).on("click", "#salad", function (e) {
// 	e.preventDefault();

// });


function myFunction() {
	// window.location.reload();
	$(".recipeList").empty();
	var x = document.getElementById("mySelect").selectedIndex;
	var y = document.getElementById("mySelect").options;
	// console.log("Index: " + y[x].index + " is " + y[x].text);
	var userselect = y[x].text;
	var searchURL = queryURLbase + userselect;
	doAjax(searchURL);

}

// function myFunction() {
// 	var checkBox = document.getElementById("myCheck");
// 	var text = document.getElementById("checkbox12");
// 	if (checkBox.checked == true) {
// 		console.log(text);
// 	} else {

// 	}
// }
var checkboxarray = [];


$('.get_tody_btn').click(function () {
	checkboxarray = [];
	var ck_string = "";
	$.each($("input[name='today_check']:checked"), function () {
		ck_string =  $(this).val();
		checkboxarray.push(ck_string);
	});
	console.log(checkboxarray);
	
	for (var i = 0; i < checkboxarray.length; i++){
		var coma =checkboxarray[i]+",";
		
	}
	$("#targetRecipe").val(coma);

	
});

