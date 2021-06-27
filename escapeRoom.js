const init = require('./init.js');

const Alexa = require('ask-sdk');
let skill;

// i18n library dependency, we use it below in a localisation interceptor
const i18n = require('i18next');
// i18n strings for all supported locales
const languageStrings = require('./languageStrings');

exports.handler = async function (event, context) {
    //console.log('REQUEST ' + JSON.stringify(event));
    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
            .addErrorHandlers(ErrorHandler)
            .addRequestHandlers(
                LaunchRequestHandler,
                HelloWorldIntentHandler,
                LookAroundIntentHandler,
                DoorIntentHandler,
                UseIntentHandler,
                UnjamDoorIntentHandler,
                EnterCodeIntentHandler,                
                HelpMeIntentHandler,
                ReceiveHintIntentHandler,
                LookForDoorsIntentHandler,
                DescribeRoomIntentHandler,
                LookForObjectsIntentHandler,
                HelpIntentHandler,
                CancelAndStopIntentHandler,
                FallbackIntentHandler,
                SessionEndedRequestHandler,
                IntentReflectorHandler

            ).create();
    }



    const response = await skill.invoke(event, context);
    //console.log('RESPONSE :' + JSON.stringify(response));
    return response;
};




const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
    },
    handle(handlerInput) {
        //try {
        let speakOutput = "Willkommen beim Escape-Room-Spiel! Ich starte ein neues Spiel!"

        const sessionSetup = init.init()
        speakOutput += " Du erwachst in " + sessionSetup.rooms.start.desc
        var sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        sessionAttributes.setup = sessionSetup
        sessionAttributes.location = "start"
        sessionAttributes.hasCrowbar = false
        sessionAttributes.hasBoltCutter = false
        sessionAttributes.remainingCodeTries = 3
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        //}
        /*catch(e){
            console.error(e)
            return handlerInput.responseBuilder
            .speak("Fehler")
            .reprompt("Fehler")
            .getResponse();
        }*/
    }
};

const LookAroundIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LookAroundIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        const setup = sessionAttributes.setup
        const room = setup.rooms[sessionAttributes.location]
        let speakOutput = "Du siehst: "
        if (room.hasOwnProperty("objects")) {
            for (i = 0; i < room.objects.length; i++) {
                if (i < room.objects.length - 2) {
                    speakOutput += room.objects[i].desc + ", "
                }
                else if (i === room.objects.length - 2) {
                    speakOutput += room.objects[i].desc + " und "
                }
                else {
                    speakOutput += room.objects[i].desc + "."
                }
            }
            speakOutput += " Außerdem "
        }

        for (i = 0; i < room.connections.length; i++) {
            let roomName = setup.rooms[room.connections[i]].name
            speakOutput += "eine Tür zum " + roomName
            if (i < room.connections.length - 2) {
                speakOutput += ", "
            }
            else if (i === room.connections.length - 2) {
                speakOutput += " und "
            }
            else { speakOutput += "." }
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}

function getRoomByName(name, rooms) {
    const roomList = Object.values(rooms)
    for (room of roomList) {
        if (room.name.localeCompare(name) === 0) {
            return room
        }
    }
    return null
}

const HelpMeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelpMeIntent';
    },
    handle(handlerInput) {
        // invoke custom logic of the handler
        //const slotValue = Alexa.getSlotValue(handlerInput.requestEnvelope, 'slotName');
        const speakOutput = 'Um im Spiel voran zu kommen, kannst du folgende Befehle geben: ';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
};

const ReceiveHintIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ReceiveHintIntent';
    },
    handle(handlerInput) {
        // invoke custom logic of the handler
        //const slotValue = Alexa.getSlotValue(handlerInput.requestEnvelope, 'slotName');
        const speakOutput = 'This is my custom intent handler';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
};

const LookForDoorsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LookForDoorsIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        const setup = sessionAttributes.setup
        const room = setup.rooms[sessionAttributes.location]
        let speakOutput = "Du siehst: "

        for (i = 0; i < room.connections.length; i++) {
            let roomName = setup.rooms[room.connections[i]].name
            speakOutput += "eine Tür zum " + roomName
            if (i < room.connections.length - 2) {
                speakOutput += ", "
            }
            else if (i === room.connections.length - 2) {
                speakOutput += " und "
            }
            else { speakOutput += "." }
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
};

const DescribeRoomIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DescribeRoomIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        const setup = sessionAttributes.setup
        const room = setup.rooms[sessionAttributes.location]

        let speakOutput = "Du gehst durch die Tür. Du befindest dich in " + room.desc + "."
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
};


const LookForObjectsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LookForObjectsIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        const setup = sessionAttributes.setup
        const room = setup.rooms[sessionAttributes.location]
        let speakOutput = "Du siehst: "
        if (room.hasOwnProperty("objects")) {
            for (i = 0; i < room.objects.length; i++) {
                if (i < room.objects.length - 2) {
                    speakOutput += room.objects[i].desc + ", "
                }
                else if (i === room.objects.length - 2) {
                    speakOutput += room.objects[i].desc + " und "
                }
                else {
                    speakOutput += room.objects[i].desc + "."
                }
            }
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
}



const DoorIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DoorIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        const setup = sessionAttributes.setup
        const room = setup.rooms[sessionAttributes.location]

        const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
        const slotValues = getSlotValues(filledSlots);
        const targetRoom = slotValues.targetRoom.resolved

        let speakOutput = ""
        const neighborNames = []
        room.connections.forEach(roomString => {
            neighborNames.push(setup.rooms[roomString].name)
        })
        if (!neighborNames.includes(targetRoom)) {
            speakOutput = "Du kannst diesen Raum von hier nicht erreichen."
        }
        else {
            if (targetRoom === "Ausgang") {
                speakOutput = "Der Ausgang ist verschlossen. Neben der Tür befindet sich eine Tastatur, auf der man offenbar einen Zahlencode eingeben kann."
            }
            else {
                let newRoom = getRoomByName(targetRoom, setup.rooms)
                if (targetRoom === setup.rooms.end.name && newRoom.isJammed) {
                    speakOutput = "Die Tür ist einen Spalt geöffnet, klemmt aber. Mit einer Brechstange ließe sie sich sicher öffnen."
                }
                else {
                    speakOutput = "Du gehst durch die Tür. Du befindest dich in " + newRoom.desc + "."
                    sessionAttributes.location = null
                    if (newRoom === setup.rooms.start) {
                        sessionAttributes.location = "start"
                    }
                    else if (newRoom === setup.rooms.end) {
                        sessionAttributes.location = "end"
                    }
                    else {
                        sessionAttributes.location = targetRoom
                    }
                    handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
                }
            }
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}

function openObject(object, handlerInput) {
    var speakOutput = "ERROR"
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    if (object.desc === "Hotel-Regeln") {
        speakOutput = "Du liest die Regeln: " + object.rules
    }
    else if (!object.hasOwnProperty("content")) {
        speakOutput = "Das Objekt ist leer."
    }
    else {
        if (object.content === null) {
            speakOutput = "Das Objekt ist leer."
        }
        else {
            speakOutput = "Du findest: " + object.content
            if (object.content === "Eine Brechstange") {
                sessionAttributes.hasCrowbar = true
            }
            else if (object.content === "Einen Bolzenschneider") {
                sessionAttributes.hasBoltCutter = true
            }
            else {
                if (!sessionAttributes.hasOwnProperty("foundHints")) {
                    sessionAttributes.foundHints = [object.content]
                }
                else {
                    sessionAttributes.foundHints.push(object.content)
                }
            }
            object.content = null
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        }
    }
    return speakOutput
}

const UseIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'UseIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        const setup = sessionAttributes.setup
        const room = setup.rooms[sessionAttributes.location]

        const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
        const slotValues = getSlotValues(filledSlots);
        const target = slotValues.target.resolved.toLowerCase()
        const toolSlot = slotValues.tool
        var tool = toolSlot.resolved !== undefined ? toolSlot.resolved.toLowerCase() : null
        const targetAttributeSlot = slotValues.targetAttribute
        var targetAttribute = targetAttributeSlot.resolved !== undefined ? targetAttributeSlot.resolved.toLowerCase() : null
        if (targetAttribute !== null) {
            if (!(targetAttribute.includes("klemmend") || targetAttribute.includes("schloss"))) {
                targetAttribute = null
            }
        }

        if (tool !== null) {
            if (tool === "brechstange") {
                if (!sessionAttributes.hasCrowbar) {
                    return handlerInput.responseBuilder
                        .speak("Du hast noch keine Brechstange gefunden.")
                        .reprompt("Du hast noch keine Brechstange gefunden.")
                        .getResponse();
                }
            }
            else if (tool === "bolzenschneider") {
                if (!sessionAttributes.hasBoltCutter) {
                    return handlerInput.responseBuilder
                        .speak("Du hast noch keinen Bolzenschneider gefunden.")
                        .reprompt("Du hast noch keinen Bolzenschneider gefunden.")
                        .getResponse();
                }
            }
        }

        const potentialTargets = []
        room.objects.forEach(o => {
            if (o.desc.toLowerCase().includes(target.toLowerCase())) {
                potentialTargets.push(o)
            }
        })

        const idxsToRemove = []
        if (targetAttribute != null) {
            potentialTargets.forEach(o => {
                if (targetAttribute.includes("klemmend")) {
                    if (!o.isJammed) {
                        idxsToRemove.push(potentialTargets.indexOf(o))
                    }
                }
                else if (targetAttribute.includes("schloss")) {
                    if (!o.isLocked) {
                        idxsToRemove.push(potentialTargets.indexOf(o))
                    }
                }
            })
        }
        else if (potentialTargets.length > 1) {
            potentialTargets.forEach(o => {
                if (o.isJammed || o.isLocked) {
                    idxsToRemove.push(potentialTargets(indexOf(o)))
                }
            })
        }

        idxsToRemove.reverse()
        idxsToRemove.forEach(i => {
            potentialTargets.splice(i, 1)
        })

        var speakOutput = ""
        if (potentialTargets.length > 1) {
            speakOutput = "Wiederhole dich. Welche " + target + " meinst du?"
        }
        else if (potentialTargets.length === 0) {
            speakOutput = "Dieses Objekt gibt es hier nicht."
        }
        else {
            let definitiveTarget = potentialTargets[0]
            if (definitiveTarget.isJammed) {
                if (tool === "brechstange" && sessionAttributes.hasCrowbar === true) {
                    speakOutput = openObject(definitiveTarget, handlerInput)
                }
                else {
                    speakOutput = "Das Objekt klemmt. Mit einer Brechstange ließe es sich sicher öffnen."
                }
            }
            else if (definitiveTarget.isLocked) {
                if (tool === "bolzenschneider" && sessionAttributes.hasBoltCutter === true) {
                    speakOutput = openObject(definitiveTarget, handlerInput)
                }
                else {
                    speakOutput = "Das Objekt ist verschlossen. Mit einem Bolzenschneider ließe sich das Schloss sicher entfernen."
                }
            }
            else {
                speakOutput = openObject(definitiveTarget, handlerInput)
            }
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}

const UnjamDoorIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'UnjamDoorIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        const setup = sessionAttributes.setup
        const room = setup.rooms[sessionAttributes.location]
        const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
        const slotValues = getSlotValues(filledSlots);

        var speakOutput = ""
        if (!room.connections.includes("end")) {
            speakOutput = "In diesem Raum gibt es keine klemmende Tür."
        }
        else if (!setup.rooms.end.isJammed) {
            speakOutput = "Du hast die Tür zum letzten Raum bereits geöffnet."
        }
        else {
            const toolSlot = slotValues.tool
            var tool = toolSlot.resolved !== undefined ? toolSlot.resolved.toLowerCase() : null
            if (tool === undefined) {
                speakOutput = "Du musst eine Brechstange benutzen, um die Tür zu öffnen."
            }
            else {
                if (!["brechstange", "brech stange"].includes(tool)) {
                    speakOutput = "Du musst eine Brechstange benutzen, um die Tür zu öffnen."
                }
                else {
                    if (sessionAttributes.hasCrowbar) {
                        setup.rooms.end.isJammed = false
                        speakOutput = "Du kannst die Tür aufstemmen. Sie lässt sich jetzt wieder problemlos öffnen und schließen."
                    }
                    else {
                        speakOutput = "Du hast noch keine Brechstange gefunden."
                    }
                }
            }
        }

        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}

const EnterCodeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EnterCodeIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        const setup = sessionAttributes.setup
        const room = setup.rooms[sessionAttributes.location]
        const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
        const slotValues = getSlotValues(filledSlots);
        const digits = slotValues.digits

        var speakOutput = ""
        var gameEnded = false
        if (room !== setup.rooms.end) {
            speakOutput = "Du kannst den Ausgangscode in diesem Raum nicht eingeben."
        }
        else {
            if (digits.resolved === undefined) {
                return handlerInput.responseBuilder
                    .speak("Welchen vierstelligen Code möchtest du eingeben? Denk daran, dass du nur noch " + sessionAttributes.remainingCodeTries.toString() + " Versuche hast!")
                    .addElicitSlotDirective("digits")
                    .getResponse();
            }
            else {
                const userInput = digits.resolved
                if (isNaN(parseInt(userInput)) || userInput.length !== 4) {
                    return handlerInput.responseBuilder
                        .speak("Du musst einen vierstelligen Zahlencode eingeben. Welchen Code möchtest du eingeben?")
                        .addElicitSlotDirective("digits")
                        .getResponse();
                }
                let slot = filledSlots.digits
                if (slot.confirmationStatus === "NONE") {
                    return handlerInput.responseBuilder
                        .speak("Du möchtest " + digits.resolved + " eingeben, habe ich das richtig verstanden?")
                        .addConfirmSlotDirective("digits")
                        .getResponse();
                }
                else if (slot.confirmationStatus === "DENIED") {
                    return handlerInput.responseBuilder
                        .speak("Okay. Möchtest du einen anderen vierstelligen Code eingeben? Dann sag ihn mir jetzt.")
                        .addElicitSlotDirective("digits")
                        .getResponse();
                }
                else {
                    if (userInput === setup.code) {
                        speakOutput = "Der Code ist richtig! Du hast gewonnen! Bis zum nächsten Mal."
                        gameEnded = true
                    }
                    else {
                        sessionAttributes.remainingCodeTries -= 1
                        if (sessionAttributes.remainingCodeTries > 0) {
                            speakOutput = "Der Code ist falsch! Du hast jetzt nur noch " + sessionAttributes.remainingCodeTries.toString() + " Versuche!"
                        }
                        else {
                            speakOutput = "Der Code ist falsch! Du hast keine Versuche mehr übrig, du Verlierer! Bis zum nächsten Mal."
                            gameEnded = true
                        }
                    }
                }
            }
        }
        if (!gameEnded) {
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
        else {
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .withShouldEndSession(true)
                .getResponse();
        }
    }
}

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = "Hello World Intent"

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = "This is the Help Intent"

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = "Auf Wiedersehen"

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = "Diese Aktion gibt es nicht. Sag Erkläre mir das Spiel, um eine erneute Anleitung für das Spiel zu bekommen";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = "This is IntentReflectorHandler";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};





/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, your skill encountered an error';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};



function getSlotValues(filledSlots) {
    const slotValues = {};

    console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);
    Object.keys(filledSlots).forEach((item) => {
        const name = filledSlots[item].name;

        if (filledSlots[item] &&
            filledSlots[item].resolutions &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                case 'ER_SUCCESS_MATCH':
                    slotValues[name] = {
                        synonym: filledSlots[item].value,
                        resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                        isValidated: true,
                    };
                    break;
                case 'ER_SUCCESS_NO_MATCH':
                    slotValues[name] = {
                        synonym: filledSlots[item].value,
                        resolved: filledSlots[item].value,
                        isValidated: false,
                    };
                    break;
                default:
                    break;
            }
        } else {
            slotValues[name] = {
                synonym: filledSlots[item].value,
                resolved: filledSlots[item].value,
                isValidated: false,
            };
        }
    }, this);

    return slotValues;
}