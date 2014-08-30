// This set is creating a variable called baconApp (which is an object) and then it is creating a key (which is a property).
// The function init is getting the value from the search box called holiday. 
var baconApp = {};
baconApp.key="840c7a676bb25d8d1bcb0038b1496c6a";
baconApp.init=function(){
 var chosenHoliday=$('.holiday').val();
 $('.holiday').on('change', function(){
 	chosenHoliday=$(this).val();
 	$('.recipe').empty();
 	$('.notfound').empty();
 	baconApp.getrecipe(chosenHoliday);
	});
}


baconApp.getrecipe=function(query){

	$.ajax({
		url: 'http://api.yummly.com/v1/api/recipes',
		type: 'GET',
		data:{
			_app_key:baconApp.key,
			_app_id:'8ef4e51d',
			requirePictures:true,
			allowedHoliday: query,
			recipe_id: query,
			// ingredientLines: id,
			maxResult:6,
			// rating: 5,
				// matches: ,
			q: query + ' bacon'
		},
			dataType: 'jsonp',
		success: function(result){
			console.log(result.matches);
			if (result.totalMatchCount >0){
				baconApp.displayInfo(result.matches);
			} else {
				console.log ("no results found");
				baconApp.noresult(result);
			}
		}
	});
}

baconApp.noresult=function(response){
	var div=document.getElementsByClassName("recipe");
	div.textContent = "O.k, apparently there isn't a bacon for your occassion, but I'm sure you can google it";
	var noResultDisplay=div.textContent;

	$('.notfound').append('<p>' + noResultDisplay + '</p>');

}

baconApp.displayInfo=function(data){
// we are getting the information we want from the results now called "data"
$.each(data, function(i, piece){
	console.log(piece);
	console.log(piece.recipeName);
	console.log(piece.imageUrlsBySize["120"]);
	console.log(piece.ingredients);
	console.log("http://www.yummly.com/recipe/" + piece.id);




	var recipeName=$('<h1>').text(piece.recipeName);
	var image=$('<img>').attr('src', piece.smallImageUrls[0].replace('=s90',''));
	var ingredientsfunc=piece.ingredients;
	var ingredients=ingredientsfunc.toString();
	var recipeURL="http://www.yummly.com/recipe/" + piece.id;
	var recipeOutput2=$('<div>').addClass('ingredientlist').append(ingredients);
	var recipeOutput=$('<a>').attr('href', recipeURL).addClass('result').append(recipeName, image, recipeOutput2);
	$('.recipe').append(recipeOutput);

	


	// var recipeOutput=$('<a>').attr('href', recipeURL).addClass('test').append(recipeName, image);
	// $('.recipe').append(recipeOutput, recipeOutput2);


	});
	};

	// function test() {

	//     var element = document.createElement("div");
	//     element.appendChild(document.createTextNode('The man who mistook his wife for a hat'));
	//     document.getElementById('lc').appendChild(element);

	// }




// code to output ONE result:
	// $.each(data, function(i, ingredient){
	// 	var ingredient=$('<p>').text(ingredient.ingredients);
	// })
	// var recipeName=data.matches[i].recipeName;
	// var recipeImg=data.matches[i].imageUrlsBySize["90"];
	// var ingredients=data.matches[i].ingredients;








// ffApp.displayRecipe=function(data){
// $.each(data, function(i, piece){
// // console.log(piece);
// var image = $('<img>').attr('src', piece.smallImageUrls[0].replace('=s90',''));
// var title = $('<p>').text(piece.recipeName);

// // var recipePiece = $('<figure>').addClass('recipeContainer').append(image, title);
// var recipeLink = $('<a>').attr('href', 'http://www.yummly.com/recipe/' + piece.id).append(image, title);
// var recipePiece = $('<figure>').addClass('recipeContainer').html(recipeLink);
// $('#recipe').append(recipePiece);
// });
// };


		// $.each(function(){
	// 	// console.log(data);
	// 	var title=$('<h2>').text(data.matches[0].recipeName);

	// });



$(document).ready(function(){
	baconApp.init();
});