const eventAggregator = () => {
	
    let listeners = {};

	const subscribe = (eventType, listener) => {
		if (typeof listeners[eventType] === 'undefined') {
            listeners[eventType] = [];
        }
        listeners[eventType].push(listener);
	}

	const unsubscribe = (eventType, listener) => {
		if (Array.isArray(listeners[eventType])) {
            const index = listeners[eventType].indexOf(listener);
           	if (index >= 0) {
           		listeners[eventType].splice(index, 1);            
            }
        }
	}

	const publish = (evt, payload = {}) => {
		if (typeof evt === 'string') {
            evt = {
                ...{
                    type: evt
                },
                ...payload
            };
        }
        if (!evt.target) {
            evt.target = this;
        }

        if (!evt.type) {  //falsey
            throw new Error(`Event object missing 'type' property.`);
        }

        if (Array.isArray(listeners[evt.type])) {
        	listeners[evt.type].forEach(listener => listener.call(this, evt));
        }
	}

	return {
		subscribe,
		unsubscribe,
		publish
	};
};

const instance = eventAggregator();

export default instance;