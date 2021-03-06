# eventAggregator
![Run Tests](https://github.com/DEGJS/eventAggregator/workflows/Run%20Tests/badge.svg)

EventAggregator is a module that acts as a single source of events for objects that wish to publish and/or subscribe to events. This module was heavily inspired by Eric Elliot and his excellent book [Programming JavaScript Applications](http://chimera.labs.oreilly.com/books/1234000000262/). Go read it.

## Install
Install eventAggregator from NPM with command:
```
$ npm install @degjs/event-aggregator
```


## Usage
EventAggregator is a singleton, so it does not need to be instantiated.
```js
import eventAggregator from "@degjs/event-aggregator";

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
+ [Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

To support legacy browsers, you'll need to include polyfills for the above APIs.