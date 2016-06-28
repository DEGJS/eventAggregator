let eventAggregator = function() {
	var listeners = {};

	function subscribe(eventType, listener) {
		if (typeof listeners[eventType] == "undefined"){
            listeners[eventType] = [];
        }

        listeners[eventType].push(listener);
	}

	function unsubscribe(eventType, listener) {
		if (listeners[eventType] instanceof Array){
            var index = listeners[eventType].indexOf(listener);
           	if(index >= 0)
           		listeners[eventType].splice(index, 1);            
        }
	}

	function publish(evt) {
		if (typeof evt == "string"){
            evt = { type: evt };
        }
        if (!evt.target){
            evt.target = this;
        }

        if (!evt.type){  //falsy
            throw new Error("Event object missing 'type' property.");
        }

        if (listeners[evt.type] instanceof Array){
        	listeners[evt.type].forEach(listener => {
        		listener.call(this, evt);
        	});
        }
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe,
		publish: publish
	};
};

var instance = eventAggregator();

export default instance;