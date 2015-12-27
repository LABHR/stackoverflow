function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function search() { 
  tag = getParameterByName("tag")

  if (tag) { 
  
    $("#display_tag").text("Results for "+tag)

    console.log(tag)

    run_SO_call("top-askers", tag)
    run_SO_call("top-answerers", tag)
  } 
}

function display_SO_data(verb, data) { 
  $.each(data.items, function(d, i) { 
    flair = '<a href="http://stackoverflow.com/users/'
      + i.user.user_id
      + '" target="_blank"><img src="http://stackoverflow.com/users/flair/'
      + i.user.user_id
      + '.png?theme=clean" width="208" height="58" alt="Flair for user '
      + i.user.display_name
      + '" /></a>'
    $("#"+verb).append(flair)
  })
} 

function run_SO_call(verb, tag) { 
  url = "https://api.stackexchange.com/2.2/tags/"+tag+"/"+verb+"/all_time?page=1&pagesize=100&site=stackoverflow"
  $("#"+verb+"_loading").show()

  $.ajax({
    url: url,
    success: function(data, s, x){
      display_SO_data(verb, data)
    }
  });
}

$(document).ready(function() { 
  $("#search").submit(function(event) { 
    event.preventDefault();
    tag = $("#tag").val()
    window.location.search = "tag="+tag
  })
  
  search() 

})

$(document).ajaxStart(function() { 
  $("#results").hide()
  $("#loading").show()
})

$(document).ajaxStop(function() { 
  $("#results").show()
  $("#loading").hide()
})
