module.exports = {
    delegate: function(eventName, wrap, selector, handler) {
        wrap.addEventListener(eventName, (ev) => {
            let target = ev.target;
            let evt = {
                nativeEvent: ev,
                type: eventName
            };
            while(target !== wrap) {
                if (selector.match(/^\./)) {
                    if (target.classList.contains(selector.substr(1))) {
                        evt.target = target;
                        handler(evt);
                        break;
                    }
                } else {
                    if (target.tagName.toLowerCase() === selector.toLowerCase()) {
                        evt.target = target;
                        handler(evt);
                        break;
                    }
                }
                target = target.parentNode;
            }
        }, false);
    }
};