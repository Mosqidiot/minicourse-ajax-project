
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $st = $('#street');
    var $city = $('#city');
    var $nyList = $('#nytimes-articles');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    $body.append($st.val()+', '+$city.val());
    $body.append('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+$st.val()+', '+$city.val()+'">');

    //load NY times articles
    $.getJSON("https://api.nytimes.com/svc/search/v2/articlesearch.json?q='"+$city.val()+"'&sort=newest&api-key=ec3224643f234d9984ac5d32ba2c0399", function(data){
    // console.log("https://api.nytimesssss.com/svc/search/v2/articlesearch.json?q="+$city.val()+"&api-key=ec3224643f234d9984ac5d32ba2c0399");
        var article = data.response.docs;
        // console.log(article);
        article.forEach(function(entry){
            $nyList.append('<li class = "article">'+
                '<a href = "'+ entry.web_url+'">'+entry.headline.main+'</a>'+
                '<p>'+ entry.lead_paragraph+'</p></li>');
        });
    }).fail(function(e){
        $nytHeaderElem.text("BAD request for New York times articles");
    }
    );
    var urlwiki = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" +$city.val()+"&callBack=wikiCallback";
    $.ajax({
        url: urlwiki,
        dataType: "Jsonp",
        success: function(data) {
            var url = 'http://en.wikipedia.org/wiki/';
            data[1].forEach(function(e){
                $('#wikipedia-links').append('<li><a href="'+url+e+'">'+e+'</a></li>');
            });
        }
    })



    return false;
};

$('#form-container').submit(loadData);
