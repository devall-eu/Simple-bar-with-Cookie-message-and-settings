(function ($) {

    var settings = {};

    $.cookieMessage = function (options) {
        var defaults = {};

        settings = $.extend({}, defaults, options);
        ready();
    }

    function ready() {
        var coo = getCookie(settings.cookieName);
        if (coo != "true") {
            $(document).ready(function () {
                cookieMessageGenerate();
            })
        }
        if (coo == "true") {
            $(document).ready(function () {
                cookieMessageBar();
            })
        }
    }

    function setCookie(c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString() + "; domain=." +
            location.hostname.split('.').reverse()[1] + "." +
            location.hostname.split('.').reverse()[0] + "; path=/");
        document.cookie = c_name + "=" + c_value;
    }

    function getCookie(c_name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + c_name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    function cookieMessageBar() {
        var html = '<div id="cookie-info">' +
            '<a href="" class="msg-info">Cookie policy</a></div>';

        $("body").append(html);

        $("#cookie-info").css({
            'color': settings.fontColor,
        });

        $("#cookie-info a").css({
            'color': settings.linkFontColor
        });

        $("#cookie-info").on("click", function () {
            var coo = setCookie(settings.cookieName, '', settings.expirationDays);
            $("#cookie-info").remove();
            ready();

            return false;
        })
    }

    function cookieMessageGenerate() {
        var html = '<div id="cookie-msg">' +
            '<span class="msg">' + settings.mainMessage +
            '<a href="" class="btn-aceptar">' + settings.acceptButton + '</a>' +
            '&nbsp;<a href="' + settings.readMoreLink + '">Read more</a>' +
            '</span></div>';

        $("body").append(html);

        $("#cookie-msg").css({
            'background-color': settings.backgroundColor,
            'color': settings.fontColor,
            'font-size': settings.fontSize,
        });

        $("#cookie-msg a").css({
            'color': settings.linkFontColor
        });

        $("#cookie-msg a.btn-aceptar").css({
            'background-color': settings.btnBackgroundColor,
            'color': settings.btnFontColor,
            'font-size': settings.btnFontSize,
        });

        $("#cookie-msg a.btn-aceptar").on("touchstart click", function (e) {
            e.stopPropagation();
            var coo = setCookie(settings.cookieName, true, settings.expirationDays);
            $("#cookie-msg").remove();
            ready();

            return false;
        })
    }

}(jQuery));