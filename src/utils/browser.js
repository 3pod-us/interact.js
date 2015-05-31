'use strict';

var win = require('./window'),
    domObjects = require('./domObjects');

var browser = {
    // Does the browser support touch input?
    supportsTouch : !!(('ontouchstart' in win) || win.window.DocumentTouch
        && domObjects.document instanceof win.DocumentTouch),

    // Does the browser support PointerEvents
    supportsPointerEvent : !!domObjects.PointerEvent,

    // Opera Mobile must be handled differently
    isOperaMobile : (navigator.appName === 'Opera'
        && browser.supportsTouch
        && navigator.userAgent.match('Presto')),

    // scrolling doesn't change the result of
    // getBoundingClientRect/getClientRects on iOS <=7 but it does on iOS 8
    isIOS7orLower : (/iP(hone|od|ad)/.test(navigator.platform) && /OS [1-7][^\d]/.test(navigator.appVersion)),

    isIe9OrOlder : domObjects.document.all && !win.window.atob
};

module.exports = browser;
