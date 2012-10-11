"use strict";

/**
 * v16.engine - manage active parts
 * 
 * @author uGhost
 * @version 1.2
 * 
 * @param {Object} machinery    - engine container
 * @param {Object} engineName   - user reference name
 */
(function (machinery, engineName) {
    var v16     = machinery[typeof engineName == 'undefined' ? 'v16' : engineName],
        engine  = {};
    
    //try to find and use the right part(s collection) in engine
    engine.installPart = function (/*string|object*/ part) {
        switch (typeof part) {
            case 'object' : for (var element in part) engine.installPart(part[element]); break;
            case 'string' :
                switch (typeof v16.partsImpl[part]) {
                    case 'function' : return v16.partsImpl[part](); break;
                    case 'object'   : return typeof v16.partsImpl[part].init != 'undefined' ? v16.partsImpl[part].init() : false; break;
                    default : return false;
                }
                break;
            default : return false;
        }
    };
    
    //try to find and use some gear
    engine.gearTurn = function () {
        var hash = location.hash.replace(/^#/, '');
        
        if (hash.length && 'gearsImpl' in v16 && hash in v16.gearsImpl) {
            var obj = new v16.gearsImpl[hash](); //wrooom!!
            
            if (!('remount' in obj) || ('remount' in obj && !obj.remount)) {
                delete v16.gearsImpl[hash]; //dismount the gear
            } else if ('rollMoovement' in v16) {
                location.hash = location.hash + '_'; //re mount the gear
            }
        }
    };
    
    //the gears spare engine
    engine.roll = function () {
        v16.rollMoovement = window.setInterval(engine.gearTurn, 250);
    };
    
    engine.run = function () {
        //rewrite standard parts collector
        v16.use = engine.installPart;
        
        //do smth with the gears
        if ('onhashchange' in window) {
            //modern way
            window.onhashchange = engine.gearTurn;
            location.hash && window.onhashchange();
        } else {
            //turn on the gears spare engine if some gear exists
            if ('gearsImpl' in v16) {
                engine.roll();
            }
            
            //leave start of the spare engine starter to first mounted gear
            else {
                v16.engineRoll = engine.roll;
            }
        }
        
        //make some noise
        return !!v16.parts && engine.installPart(v16.parts); //wrooom!!
    };
    
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            engine.run();
            clearInterval(readyStateCheckInterval);
        }
    }, 10);
})(/*object*/ window /*string*/ /*, "engineName"*/);