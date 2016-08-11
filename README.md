# eventAggregator
EventAggregator is a module that acts as a single source of events for objects that wish to publish and/or subscribe to events. This module was heavily inspired by Eric Elliot and his excellent book [Programming JavaScript Applications](http://chimera.labs.oreilly.com/books/1234000000262/). Go read it.

## Install
EventAggregator is an ES6 module. Consequently, you'll need an ES6 transpiler ([Babel](https://babeljs.io) is a nice one) and a module loader ([SystemJS](https://github.com/systemjs/systemjs) will do the job) as part of your Javascript workflow.

If you're already using the [JSPM package manager](http://jspm.io) for your project, you can install EventAggregator with the following command:

```
$ jspm install github:DEGJS/eventAggregator
```

## Usage
EventAggregator is a singleton, so it does not need to be instantiated.
```js
import eventAggregator from "DEGJS/eventAggregator";

function onSomeEvent(e) {
    console.log(e);
}

/* Subscribe to 'someEvent' event */
eventAggregator.subscribe('someEvent', onSomeEvent);

/* Unsubscribe from 'someEvent' event */
eventAggregator.unsubscribe('someEvent', onSomeEvent);

/* Publish 'yetAnotherEvent' event */
eventAggregator.publish({
    /* type property is required */
    type: 'yetAnotherEvent',
    data: {...}
});
```

## Methods

### .subscribe(eventType, listener)
Subscribe to an event.
#### eventType
Type: `String`
The name of the event to subscribe to.

#### listener
Type: `Function`
The listener function that will be called when the event is fired.

### .unsubscribe(eventType, listener)
Unsubscribe from an event.
#### eventType
Type: `String`
The name of the event to unsubscribe from.

#### listener
Type: `Function`
The listener function that was subscribed to the event.

### .publish(evt)
Publish an event.
#### evt
Type: `Object` or `String`
The event to publish. If the parameter is a `String`, it should be the name of the event. If the parameter is an `Object`, it must have a `type` property with a value that is the name of the event. Any other properties on the object will be passed along to all subscribers of the event.   

## Browser Support

Breakpoints depends on the following browser APIs:
+ [Array.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
+ [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

To support legacy browsers, you'll need to include polyfills for the above APIs.