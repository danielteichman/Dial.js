/*
    Dial.js
*/

var DialFactory = new function() {
    this.moduleName = 'Dial.js';
    this.selectorAttribute = 'data-dial-js';
    this.next_id = 0;
    this.allDials = {};

    this.makeDial = function(dialName = 'Unnamed Dial', historic = false, selectorAttribute = null) {
        if (selectorAttribute == null)
            ret = new Dial(dialName, historic, this.selectorAttribute);
        else
            ret = new Dial(dialName, historic, selectorAttribute);
        ret.id = this.next_id++;
        this.allDials[ret.id] = ret;
        return ret;
    }
    this.setSelectorAttribute = function(name) {
        this.selectorAttribute = name;
    }
}

var Dial = function(dialName, historic, selectorAttribute) {
    this.moduleName = 'Dial.js';
    this.dialName = dialName;
    this.historic = historic;
    this.selectorAttribute = selectorAttribute;
    this.dial = this;
    this.states = {};
    this.stateHandlers = {};
	this.hashEffectors = {};

    this.trigger = function(data, stateName, historic = this.historic) {
        if(historic)
            this.stateHandlers[stateName].callback(data);
        else
            this.states[stateName](data);
    }

    this.addState = function(stateName, fn, hashEffector = null) {
        //actual toggle function
        this.states[stateName] = fn;
		
		//hashEffector
		this.hashEffectors[stateName] = hashEffector;

        //object that wraps toggle function
        this.stateHandlers[stateName] = {};
        this.stateHandlers[stateName].dial = this.dial;
        this.stateHandlers[stateName].stateName = stateName;
		if(hashEffector != null) {
			this.stateHandlers[stateName].hasHashEffector = true;
		} else {
			this.stateHandlers[stateName].hasHashEffector = false;
		}

        this.stateHandlers[stateName].callback = function(data) {
            //push history object if needed
            if (this.dial.historic) {
                History.pushState({
                    moduleName: this.dial.moduleName,
                    dial: this.dial.dialName,
                    state: stateName,
                    data: data,
                    id: this.dial.id,
					he: this.hasHashEffector
                }, null, 	(this.hasHashEffector)?this.dial.hashEffectors[stateName](
								data, window.location.href.substring(window.location.href.indexOf('?'))):null
							);
            }
            else {
                this.dial.states[stateName](data);
            }
        }
    }


    this.associateElements = function(a_selector, event, state) {
        var obj = {
            dial: this.dial,
            state: state,
            selectorAttribute: this.selectorAttribute
        };
        $(a_selector).each(function(i, elem) {

            $(elem).on(event, obj, function(event) {
                event.preventDefault();
                event.data.dial.stateHandlers[event.data.state].callback($(this).attr(event.data.selectorAttribute));
            });
        });
    }

}

var _dial_loaded = false;
History.Adapter.bind(window, 'statechange', function() {
    try {
        hsdata = History.getState().data;
        if (hsdata.moduleName == DialFactory.moduleName) {

            _dial = DialFactory.allDials[hsdata.id];
            _dial.states[hsdata.state](hsdata.data);

        }
		else if(_dial_loaded) {
			history.go(0); //not a perfect solution
			//reloads the page if user backtracks to before the first Dial state
		}
    }
    catch (err) {
        //not our problem
    }
});

History.pushState({
    moduleName: "Dial.js Reload Please",
    dial: "None",
    state: "Page load",
    data: "No data",
    id: -1
}, null, null);

_dial_loaded = true;