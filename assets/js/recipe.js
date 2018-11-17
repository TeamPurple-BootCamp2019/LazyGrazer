

var queryURLbase = "https://api.edamam.com/search?&app_id=192e6853&app_key=97cc74f29550dbca8f09e9ac463a150f&from=0&to=9&q=";

function doAjax(queryURL) {
	fetch(queryURL)
	.then((resp) => resp.json())
	.then(function (data) {
        console.log(data);
        var elArray = [];
        var elements =0;
		for (var i = 0; i < 9; i++) {

			var card = $('<div>');

			var img = $("<img>");
			imgAPI = data.hits[i].recipe.image;
			img.attr("src", imgAPI);
			card.append(img);

			title = data.hits[i].recipe.label;
            
            var link= $(`<a type="button" href="#" style="color:white;text-decoration:none" class="addVids">`);
            link.text(title);
            card.append(link);
            elArray.push(card);
            elements++;
            if(elements == 3){
                var flex = $('<div class="flex-container">');
                flex.append(elArray);
                $('.recipeList').append(flex);
                elements = 0;
                elArray=[];
            }

		};
	});
};



$(".addRecipe").on("click", function (e) {
    $("#recipe-list").empty();
	e.preventDefault();

	userInput = $("#targetRecepi").val().trim().toLowerCase();

	var searchURL = queryURLbase + userInput;
	doAjax(searchURL);	
	$("#targetRecepi").val("");
});


