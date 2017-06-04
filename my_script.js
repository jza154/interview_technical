

$(function() {

//decalring variables

var $message=$('#message_content');
var $inbox=$('#inbox');
var count=0;

//using mustache template

var messageTemplate=""+ 
"<hr>"+
"<p><strong> Name: </strong> {{text}} </p>"+
"<p><strong>Date:</strong> {{created_at}}</p>"+
"<button data-id='{{id}}' class='remove'>REMOVE</button>"+
"</hr>"; 
 
function addMessage(message){
 	
	$inbox.append(Mustache.render(messageTemplate, message) );
	   				  
	   				  	      }
//GET Request to parse data from Json file
$.ajax({
	type:'GET',
	url:'https://jzhang-test.herokuapp.com/messages/?format=json',
	async: false,
	success:function(messages){
		 $.each(messages.results, function(i,message){
		 	addMessage(message);
		 	count=messages.count;  //get count from json

		 });

							   }
});


// Display all Messages by incrementing page number 
var page_counter=2;


while (page_counter<count){	

$.ajax({
	type:'GET',
	url:"https://jzhang-test.herokuapp.com/messages/?page="+page_counter,
	async: false,
	success:function(messages){
		 $.each(messages.results, function(i,message){
		 	addMessage(message);

		 });

							  }
});

page_counter++; 
}

// POST request to post on json file

var $date=$('message_date');	

$('#add_message').on('click', function(){
  
  var results={

text:$message.val(),

  			   };	
$.ajax({
type: 'POST',
url: 'https://jzhang-test.herokuapp.com/messages/?format=json ',
data: results,
success: function() {
//reload the page when post is completed 
location.reload();

}

});

}
);

//Delete request on json file

$inbox.delegate('.remove','click', function(){
var $li= $(this).closest('li'); 	 	
$.ajax({
type: 'DELETE',
url: 'https://jzhang-test.herokuapp.com/messages/'+ $(this).attr('data-id'), 
success:function(){

location.reload();	
      			   }

});


});

});