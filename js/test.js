$(function() {

	horizontalChart("/config/test.json", "#customChart");

    function horizontalChart(src, target) {
        $.getJSON(src, function(obj) {

        	$.each(obj.items[0], function(key, value) {
        		console.log(value.percent);
        		$(target).append("<ul class='customBar'>"
                        + "<li><span class='truncate'>" + key + "</span></li>"
                        + "<li class='bar'>"
                        + "<div class='actual' style='background-color:" + value.color + "; width:" + value.percent + "%'>&nbsp;<span class='pull-right'>" + value.value + "</span></div>"
                        + "</li>"
                    + "</ul><div style='clear:both'></div>")
        	})

        });
    }

});
