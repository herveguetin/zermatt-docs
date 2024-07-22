# Events

Zermatt comes with a simple pub/sub implementation that allows all Javascript code to emit and react to events.

## Dispatch an event

Event without data:

```js
Zermatt.Event.dispatch('some:event')
```

Event with data:

```js
Zermatt.Event.dispatch('some:event', {key: value})
```

## Listen to events

Most simple use:

```js
Zermatt.Event.on('some:event', () => console.log('Some event happened')
```

Retrieve the dispatched event:

```js
Zermatt.Event.on('some:event', (event) => console.log(event)
```

Wait for several events:

```js
Zermatt.Event.on(['some:event', 'some:other_event'], (events) => {
  events.map(event => console.log(event))
})
```

Note that the callback receives all dispatched events as argument.

## Core Zermatt events

- `zermatt:kickoff`. When the frontend Zermatt stack is first started.
- `zermatt:translation:init`. When the translation layer is ready.
- `zermatt:module:init`. When modules are loaded in Zermatt.
- `zermatt:form:key:init`. When Zermatt has finished fetching the form key from the backend.
- `zermatt:init`. Before the AlpineJS app is started (`Alpine.start()`)
- `zermatt:ready`. When Zermatt is ready.
