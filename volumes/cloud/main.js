Parse.Cloud.define('hello', function(req, res) { 
  res.success('Hi, git'); 
});

Parse.Cloud.define("averageAges", function(request, response) {

 var query = new Parse.Query('People');
 query.find({useMasterKey:true})
 .then(function(result){
  var sum = 0
  for(var i=0;i<result.length;++i){
    sum+=result[i].get("age");
  }
  response.success(sum);
 });
});




Parse.Cloud.define("getUserId", function(request, response) 
{
    //Example where an objectId is passed to a cloud function.
    var id = request.params.objectId;

    //When getUser(id) is called a promise is returned. Notice the .then this means that once the promise is fulfilled it will continue. See getUser() function below.
    getUser(id).then
    (   
        //When the promise is fulfilled function(user) fires, and now we have our USER!
        function(user)
        {
            response.success(user);
        }
        ,
        function(error)
        {
            response.error(error);
        }
    );

});

function getUser(userId)
{
    Parse.Cloud.useMasterKey();
    var userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo("objectId", userId);

    //Here you aren't directly returning a user, but you are returning a function that will sometime in the future return a user. This is considered a promise.
    return userQuery.first
    ({
        success: function(userRetrieved)
        {
            //When the success method fires and you return userRetrieved you fulfill the above promise, and the userRetrieved continues up the chain.
            return userRetrieved;
        },
        error: function(error)
        {
            return error;
        }
    });
};