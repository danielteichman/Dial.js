# Dial.js  
*the most fun you can have with jQuery and single-page applications* <br/>
 <br/>
Dial.js is a single-page application framework and a browser history framework built on jQuery with History.js. It simplifies browser history integration of event-driven interfaces and provides a simple alternative to MVC frameworks for single-page applications (SPAs). <br/>
<br/>
[View the basic example](https://cdn.rawgit.com/danielteichman/Dial.js/5b703917c1c6bbe31a72accb090f1a0b2e76e617/Examples/basic_example.html) <br/>
 <br/>
##Exposed API
<br/>
####The `DialFactory` object <br/>

- `DialFactory.makedial(dialName, historic, selectorAttribute)` <br/> Returns  a new `Dial` object <br/> *Example* `var dialVar = DialFactory.makeDial('my first dial', true, data-application-attribute);`
  - `dialName` The name of the new `Dial` object that will be returned by this function
  - `historic` determines whether changes to the new `Dial` object's state will be recorded into the browser history
  - `selectorAttribute` *(optional*) contains the name of the `data` attribute that DOM elements will provide to the new `Dial` object's state functions (default `data-dial-js`)

- `DialFactory.setSelectorAttribute(selectorAttribute)` <br/> Sets the default `selectorAttribute` for future instances of `Dial` objects (default `data-dial-js`)

####The `Dial` object <br/>
**Note: `Dial` objects must be instantiated through the `DialFactory`**

- `dialVar.addState(stateName, fn, queryEffector)` Adds code to apply a state from the `Dial` object.
 - `stateName` the name of the state that will be added to the `Dial`
 - `fn` the function that will be called when the state named `stateName` is applied. This function will recieve one argument called `data`
 - *optional* `queryEffector` a function that will be called when a state is applied to change the `?var=val` query string in the URL bar. This function will recieve two arguments, the same `data` that was passed to `fn` and also the `oldquery` old query string.

- `dialVar.associateElements(selector, event, stateName)` associate DOM elements with a state of the `Dial` object
 - `selector` the jQuery selector of the elements that will activate the state `stateName`
 - `event` the DOM event that will activate the state `stateName` when it occurs from any elements matched by the `selector`
 - `stateName` the name of the state that will be applied from this `Dial`

- `dialVar.trigger(data, stateName, historic)` <br/> Applies the state `stateName` belonging to this `Dial` object, passing argument `data` to the state's function.
  - `data` argument to pass to the state function
  - `stateName` name of the state to apply from this `Dial` object
  - `historic` *optional* overrides this `Dial` object's default history-recording behavior where `true` means the new state will be part of the browser history and `false` means the new state will be applied without affecting the browser history.



##Resources
- jQuery 1.12.3: https://jquery.com/download/  
- History.js: https://github.com/browserstate/history.js/blob/master/scripts/bundled/html5/jquery.history.js  
- Bootstrap (recommended): http://getbootstrap.com/  

##License
Dial.js is provided under the [MIT License](https://tldrlegal.com/license/mit-license)
