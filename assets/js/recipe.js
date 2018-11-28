

var queryURLbase = "https://api.edamam.com/search?&app_id=192e6853&app_key=97cc74f29550dbca8f09e9ac463a150f&from=0&to=13&q=";
var ingShowList = [];
var ingredientList = [];
var ingredientLength = [];
var dietList = [];
var healthList = [];
var digests = [];
var calories = [];
var servings = [];
var weights = [];
var cookTimes = [];
var instructions = [];
var imageURL = [];
var labelList = [];

function doAjax(queryURL) {
	fetch(queryURL)
		.then((resp) => resp.json())
		.then(function (data) {
			console.log(data);
			 
			 ingredientList = [];
			 ingredientLength = [];
			 dietList = [];
			 healthList = [];
			 digests = [];
			 calories = [];
			 servings = [];
			 weights = [];
			 cookTimes = [];
			 instructions = [];
			 imageURL = [];
			 labelList = [];

			var flex = $('<div class="row">');
		

			for (var i = 0; i < 13; i++) {


				// var ingList = $(`<table class="table">
				// 						<thead class="thead-dark">
				// 						<tr>
				// 							<th scope="col">Ingredient</th>
				// 							<th scope="col">Weight(ounce)</th>
				// 						</tr>
				// 						</thead>
				// 						<tbody>`
				// 				);

				var ingList = [];
				var dList = [];
				var hList = [];

				var digestList = $(`<table class="table-condensed">
								<thead class="thead-dark">
								<tr>
									<th scope="col">Nutrition facts</th>
									<th scope="col">Total (per serving)</th>
									<th scope="col">Daily %</th>

								</tr>
								</thead>
								<tbody>`
						);

				// for (var j = 0; j < data.hits[i].recipe.ingredients.length; j++) {
				// 	var ing = data.hits[i].recipe.ingredients[j].text;
				// 	var ingweight = data.hits[i].recipe.ingredients[j].weight;
				// 	ingList.append(`<tr class="table-warning"><td class="table-warning">${ing}</td><td class="table-warning">${ingweight}</td></tr>`)
				// }

				for (var j = 0; j < data.hits[i].recipe.ingredientLines.length; j++) {
					var ing = data.hits[i].recipe.ingredientLines[j];
					
					ingList.push(`<li>${ing}</li>`)
					// console.log(ingList)
				}

				for (var j = 0; j < data.hits[i].recipe.dietLabels.length; j++) {
					var diet = data.hits[i].recipe.dietLabels[j];
					
					dList.push(`<li>${diet}</li>`)
				
				}

				for (var j = 0; j < data.hits[i].recipe.healthLabels.length; j++) {
					var health = data.hits[i].recipe.healthLabels[j];
					
					hList.push(`<li>${health}</li>`)
					
				}

				for (var j = 0; j < data.hits[i].recipe.digest.length; j++) {
					var dig = data.hits[i].recipe.digest[j].label;

					var digTotal = data.hits[i].recipe.digest[j].total / data.hits[i].recipe.yield;
					digTotal = digTotal.toFixed(0);

					var dailyTotal = data.hits[i].recipe.digest[j].daily/ data.hits[i].recipe.yield;
					dailyTotal = dailyTotal.toFixed(0);

					digestList.append(`<tr class="table-warning"><td class="table-warning">${dig}</td><td class="table-warning">${digTotal} mg</td><td class="table-warning">${dailyTotal} %</td></tr>`)
				}

				
				servings.push(data.hits[i].recipe.yield);

				var caloriesFixed = data.hits[i].recipe.calories / data.hits[i].recipe.yield
				calories.push(caloriesFixed.toFixed(0));
				weights.push(data.hits[i].recipe.totalWeight);
				cookTimes.push(data.hits[i].recipe.totalTime);
				instructions.push(data.hits[i].recipe.url);
				imageURL.push(data.hits[i].recipe.image);
				labelList.push(data.hits[i].recipe.label);
				ingredientLength.push(data.hits[i].recipe.ingredientLines.length);
				digests.push(digestList);
				ingredientList.push(ingList);
				dietList.push(dList);
				healthList.push(hList);

				var card = $('<div style="margin-bottom:20px" class="col-s-12 col-m-6 col-lg-4">');

				var img = $("<img>");
				// imgAPI = data.hits[i].recipe.image;
				img.attr("src", imageURL);
				card.append(img);

				title = data.hits[i].recipe.label;

				var link = $(`<a  data-content=${i} href="#" style="text-decoration:none;" class="addVids">`);
				var span = $('<span class="badge badge-pill badge-dark" style="margin-top:10px;">');
				span.text(title);
				link.append(span);
				card.append(link);
				flex.append(card);
				

			};

			$('.recipeList').html(flex);
			
		});
};

$(document).on('click', '.addVids', function () {
	$('.article').empty();
	// $('.article').append(`<button type="button" class="btn btn-primary back">Back</button>`);

	var topRow = $('<div class = "row" id = "recipe-top-row">');
	var imageDiv = $('<div class = "col-md-4">')
	var img = $('<img class = "img-fluid img-thumbnail">');
			img.attr("src", imageURL[parseInt($(this).attr('data-content'))]);
	imageDiv.html(img);
	var titleDiv = $('<div class = "col-md-8">')
	titleDiv.html(`<h2 class = "display-4">${labelList[parseInt($(this).attr('data-content'))]}</h2>`);
	titleDiv.append(`<a target="_blank" href="${instructions[$(this).attr('data-content')]}"><h4>Click here to see full recipe here</h4>`)
	topRow.append(imageDiv).append(titleDiv);
	$('.article').append(topRow);
	$('.article').append('<hr>');

	var secondRow = $('<div class = "row">');
	var ingDiv = $('<div class = "col-md-6">');
	// $('.article').append('<h2>Ingredients</h2>');
	$(ingDiv).append(`<h4>${ingredientLength[parseInt($(this).attr('data-content'))]} Ingredients</h4>`);
	$(ingDiv).append(ingredientList[parseInt($(this).attr('data-content'))]);

	var nutrDiv = $('<div class = "col-md-6">');
	var nutrRow = $('<div class = "row">')
	var calDiv = $('<div class = "col-md-6">');
	var servDiv = $('<div class = "col-md-6">');
	calDiv.append(`<h4>Calories (per Serving)</h4>`)
				.append(calories[parseInt($(this).attr('data-content'))]);
	servDiv.append(`<h4>Servings</h4>`)
				 .append(servings[parseInt($(this).attr('data-content'))]);
	nutrRow.append(calDiv).append(servDiv);
	nutrDiv.append(nutrRow);

	nutrDiv.append("<br>")
				 .append(`<h4>Diet</h4>`)
				 .append(dietList[parseInt($(this).attr('data-content'))])
				 .append("<br>");
	nutrDiv.append(`<h4>Health</h4>`)
				 .append(healthList[parseInt($(this).attr('data-content'))]);

	secondRow.append(ingDiv).append(nutrDiv);

	$('.article').append(secondRow);
	$('.article').append('<hr>');
	$('.article').append('<h2>Nutrition</h2>');
	$('.article').append(digests[parseInt($(this).attr('data-content'))]);

	// $('.article').append('<hr>');
	// $('.article').append('<h2>Calories</h2>');
	// $('.article').append(`<h3>${calories[$(this).attr('data-content')]}</h3>`);
	// $('.article').append('<hr>');
	// $('.article').append('<h2>Weight</h2>');
	// $('.article').append(`<h3>${weights[$(this).attr('data-content')]}</h3>`);
	// $('.article').append('<hr>');
	// $('.article').append('<h2>Cook Time</h2>');
	// $('.article').append(`<h3>${cookTimes[$(this).attr('data-content')]} /minutes</h3>`);
	// $('.article').append('<hr>');
	// $('.article').append('<h2>Instructions</h2>');
	// $('.article').append(`<a target="_blank" href="${instructions[$(this).attr('data-content')]}"><h3>Click here to see instructions</h3>`);

	
});

$(".addRecipe").on("click", function (e) {
	$(".recipeList").show();
	$(".recipeInfo").hide();
	$("#recipe-list").empty();
	e.preventDefault();

	userInput = $("#targetRecipe").val().trim().toLowerCase();

	var searchURL = queryURLbase + userInput;
	doAjax(searchURL);
	$("#targetRecipe").val("");
});
