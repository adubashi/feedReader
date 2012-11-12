cheezits = {};

cheezits.init = function(){
	$("#subscribe").click(function(){
		var url = "http://rosemary.umw.edu/~dzimmerm/hw5/sweetproxy.php?url="+
			escape($("#url").val());
		$.ajax({
			url: url,
			type: "GET",
			contentType: "text/xml",
			dataType: "xml"
		}).done(cheezits.display);
	});
};

cheezits.display = function(data){
	var title = $(data).find("rss > channel > title").text();
	var pic = $(data).find("rss > channel > image > url").text();
	var link = $(data).find("rss > channel > link").text();
	$("#feedbox").append("<hr>");
	$("#feedbox").append("<img src=\""+pic+"\" />");
	$("#feedbox").append("<a href=\"" + link + "\">"+title+"</a><br/>");
	$("#feedbox").append("<ol>");
	cheezits.writeList(data);
	$("#feedbox").append("</ol>");

};
	
cheezits.writeList = function(data){
	$(data).find("item > title").each(function(){
		var title = $(this).text();
		var goHere = escape($(data).find("item > link").text());
		$("#feedbox").append("<a href =\""+ goHere +"\">"+title+"</a><br/>");
/*		$("#feedbox").append("<a href=\"" 
		+ $(data).find("rss > channel > item > link").text()
		+"\">"+$(this).text() +"</a><br/>");
*/
	});	
};

$(document).ready(cheezits.init);
