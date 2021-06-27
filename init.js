

const ROOM_NUM = 4
const CODE_DIGIT_NUM = 4
const roomList = [
    {   
        "name": "Horrorraum",
        "desc": "einem furchteinflößenden Raum."
    },
    {
        "name": "Prachtzimmer",
        "desc": "einem prächtigen Raum."
    },
    {   
        "name": "Verfallraum",
        "desc": "einem feuchten und ruinösen Raum."
    },
    {   
        "name": "Finsterraum",
        "desc": "einen dunklen Raum."
    },
    {   
        "name": "Baderaum",
        "desc": "einem Bad"
    },
    {   
        "name": "Waschraum",
        "desc": "einer Waschküche"
    },
    {   
        "name": "Kinderzimmer",
        "desc": "einem Kinderzimmer"
    },
    {   
        "name": "Küchenraum",
        "desc": "einer Küche."
    }
]

// As long as a digit has multiple elements, it may be used multiple times in the code.
// Currently only occurs once, so that repetition of (hint + hiddenHint) -> digit mappings is a bit rarer.
const codeElements = [
    {
        digit: "1",
        hintSets: [
            {
                openHint: "openHint 1_1",
                hiddenHint: "hiddenHint 1_1"
            },
            {
                openHint: "openHint 1_2",
                hiddenHint: "hiddenHint 1_2"
            }
        ]
    },
    {
        digit: "2",
        hintSets: [
            {
                openHint: "openHint 2_1",
                hiddenHint: "hiddenHint 2_1"
            },
            {
                openHint: "openHint 2_2",
                hiddenHint: "hiddenHint 2_2"
            }
        ]
    },
    {
        digit: "3",
        hintSets: [
            {
                openHint: "openHint 3_1",
                hiddenHint: "hiddenHint 3_1"
            },
            {
                openHint: "openHint 3_2",
                hiddenHint: "hiddenHint 3_2"
            }
        ]
    },
    {
        digit: "4",
        hintSets: [
            {
                openHint: "openHint 4_1",
                hiddenHint: "hiddenHint 4_1"
            },
            {
                openHint: "openHint 4_2",
                hiddenHint: "hiddenHint 4_2"
            }
        ]
    },
    {
        digit: "5",
        hintSets: [
            {
                openHint: "openHint 5_1",
                hiddenHint: "hiddenHint 5_1"
            },
            {
                openHint: "openHint 5_2",
                hiddenHint: "hiddenHint 5_2"
            }
        ]
    },
    {
        digit: "6",
        hintSets: [
            {
                openHint: "openHint 6_1",
                hiddenHint: "hiddenHint 6_1"
            },
            {
                openHint: "openHint 6_2",
                hiddenHint: "hiddenHint 6_2"
            }
        ]
    },
    {
        digit: "7",
        hintSets: [
            {
                openHint: "openHint 7_1",
                hiddenHint: "hiddenHint 7_1"
            },
            {
                openHint: "openHint 7_2",
                hiddenHint: "hiddenHint 7_2"
            }
        ]
    },
    {
        digit: "8",
        hintSets: [
            {
                openHint: "openHint 8_1",
                hiddenHint: "hiddenHint 8_1"
            },
            {
                openHint: "openHint 8_2",
                hiddenHint: "hiddenHint 8_2"
            }
        ]
    },
    {
        digit: "9",
        hintSets: [
            {
                openHint: "openHint 9_1",
                hiddenHint: "hiddenHint 9_1"
            },
            {
                openHint: "openHint 9_2",
                hiddenHint: "hiddenHint 9_2"
            }
        ]
    }
]

const openObjectList = [
    {
        "desc": "Einen Krug.",
        "isJammed": false,
        "isLocked": false
    },
    {
        "desc": "Einen Kleiderschrank.",
        "isJammed": false,
        "isLocked": false
    },
    {
        "desc": "Einen Tisch.",
        "isJammed": false,
        "isLocked": false
    },
    {
        "desc": "Eine Kommode",
        "isJammed": false,
        "isLocked": false
    },
    {
        "desc": "Ein Bücherregal",
        "isJammed": false,
        "isLocked": false
    },
    {
        "desc": "Eine Mikrowelle",
        "isJammed": false,
        "isLocked": false
    },
    {
        "desc": "Einen Ofen",
        "isJammed": false,
        "isLocked": false
    },
    {
        "desc": "Einen Wandschrank",
        "isJammed": false,
        "isLocked": false
    },
    {
        "desc": "Einen Kühlschrank.",
        "isJammed": false,
        "isLocked": false
    },
    {
        "desc": "Einen Haufen Klamotten.",
        "isJammed": false,
        "isLocked": false
    }
]

const crowbarObjectList = [
    {
        desc: "Einen klemmenden Krug.",
        isJammed: true,
        isLocked: false
    },
    {
        desc: "Eine klemmende Kommode.",
        isJammed: true,
        isLocked: false
    },
    {
        desc: "Einen klemmenden Kleiderschrank",
        isJammed: true,
        isLocked: false
    },
    {
        desc: "Eine klemmende Mikrowelle",
        isJammed: true,
        isLocked: false
    },
    {
        desc: "Einen klemmenden Ofen.",
        isJammed: true,
        isLocked: false
    },
    {
        desc: "Einen klemmenden Wandschrank.",
        isJammed: true,
        isLocked: false
    },
    {
        desc: "Einen klemmenden Kühlschrank.",
        isJammed: true,
        isLocked: false
    },
]

const boltCutterObjectList = [
    {
        desc: "Einen Kleiderschrank mit einem großen Schloss.",
        isJammed: false,
        isLocked: true
    },
    {
        desc: "Eine Kommode mit einem großen Schloss.",
        isJammed: false,
        isLocked: true
    },
    {
        desc: "Eine Büchervitrine mit einem großen Schloss.",
        isJammed: false,
        isLocked: true
    },
    {
        desc: "Eine Mikrowelle mit einem großen Schloss.",
        isJammed: false,
        isLocked: true
    },
    {
        desc: "Einen Ofen mit einem großen Schloss.",
        isJammed: false,
        isLocked: true
    },
    {
        desc: "Einen Wandschrank mit einem großen Schloss.",
        isJammed: false,
        isLocked: true
    },
    {
        desc: "Einen Kühlschrank mit einem großen Schloss.",
        isJammed: false,
        isLocked: true
    }
]

/**
 * Symmetrically connects rooms.
 * @param {*} fromRoom 
 * @param {*} toRoom 
 */
function addConnection(fromRoom, toRoom, rooms){
    var fromRoomConName = null 
    if (fromRoom === rooms.start){
        fromRoomConName = "start"
    }
    else if (fromRoom === rooms.end){
        fromRoomConName = "end"
    }
    else {
        fromRoomConName = fromRoom.name
    }
    var toRoomConName = null 
    if (toRoom === rooms.start){
        toRoomConName = "start"
    }
    else if (toRoom === rooms.end){
        toRoomConName = "end"
    }
    else {
        toRoomConName = toRoom.name
    }


    if (fromRoom.hasOwnProperty("connections")){
        fromRoom.connections.push(toRoomConName)
    }
    else {
        fromRoom.connections = [toRoomConName]
    }
    if (toRoom.hasOwnProperty("connections")){
        toRoom.connections.push(fromRoomConName)
    }
    else {
        toRoom.connections = [fromRoomConName]
    }
}

function addObject(room, object){
    if (room.hasOwnProperty("objects")){
        room.objects.push(object)
    }
    else {
        room.objects = [object]
    }
}

/**
 * Picks a list of rooms & adds it to sessionSetup.
 * @param {Object} sessionSetup 
 */
function addRandomRooms(sessionSetup){
    
    let roomsToPickFrom = [...roomList]
    // Rooms that are neither the start or end room.
    const rooms = {}
    const inbetweenRooms = []
    for (i = 0; i < ROOM_NUM; i++){
        let roomPos = Math.floor(Math.random()*roomsToPickFrom.length)
        let room = roomsToPickFrom[roomPos]
        roomsToPickFrom.splice(roomPos, 1)
        if (i === 1){
            rooms["start"] = room
        }
        else if (i !== ROOM_NUM - 1){
            rooms[room.name] = room
            inbetweenRooms.push(room)
        }
        else {
            rooms["end"] = room
            rooms["end"].isJammed = true    
        }
    }
    sessionSetup.rooms = rooms
    sessionSetup.inbetweenRooms = inbetweenRooms
}

/**
 * Adds exit room.
 * Not intended to be entered, only to integrate it into voice door description function.
 * @param {} sessionSetup 
 */
function addExit(sessionSetup){
    const endRoom = sessionSetup.rooms.end
    const exitRoom = {
        name: "Ausgang",
        desc: "not used"
    }
    addConnection(endRoom, exitRoom, sessionSetup.rooms)
    sessionSetup.rooms.Ausgang = exitRoom
}

/**
 * Connects the rooms. 
 * Conditions:
 *  - End room only may connect to one.
 *  - Start room shall not connect to end room.
 * @param {Object} sessionSetup 
 */
function randomlyConnectRooms(sessionSetup){

    const rooms = sessionSetup.rooms
    const inbetweenRooms = sessionSetup.inbetweenRooms

    // Start & end must connect to at least one ==> Choose randomly.
    const fromStartOptions = inbetweenRooms
    const fromEndOptions = inbetweenRooms
    const startConTarget = fromStartOptions[Math.floor(Math.random()*fromStartOptions.length)]
    const endConTarget = fromEndOptions[Math.floor(Math.random()*fromEndOptions.length)]
    addConnection(rooms.start, startConTarget, rooms)
    addConnection(rooms.end, endConTarget, rooms)

    // Connect the room not connected to start (yet) to start or the room connected to it. 
    let notConnectedToStart = startConTarget === inbetweenRooms[0] ? inbetweenRooms[1] : inbetweenRooms[0]
    let fromNotConnectedToStartOptions = [rooms.start, rooms[rooms.start.connections[0]]]
    let connectionTarget = fromNotConnectedToStartOptions[Math.floor(Math.random()*fromNotConnectedToStartOptions.length)]
    addConnection(notConnectedToStart, connectionTarget, rooms)
}

module.exports = {
    init:function() {

        const sessionSetup = {}
        addRandomRooms(sessionSetup)
        randomlyConnectRooms(sessionSetup)
        
        // Randomly selects digits for code to open final door.
        const digitsToPickFrom = [...codeElements]
        const selectedDigits = []
        for (i = 0; i < CODE_DIGIT_NUM; i++){
            let selectedDigitIdx = Math.floor(Math.random()*digitsToPickFrom.length)
            selectedDigits.push(digitsToPickFrom[selectedDigitIdx])
            digitsToPickFrom.splice(selectedDigitIdx, 1)
        }
        // Randomly selects one of the available hint sets for each digit. 
        // Contain one open (hotel rule) hint & one to be hidden in an object.
        const openHints = []
        const hiddenHints = []
        var code = ""
        selectedDigits.forEach( digit => {
            code += digit.digit
            let randomHintSet = digit.hintSets[Math.floor(Math.random()*digit.hintSets.length)]
            openHints.push(randomHintSet.openHint)
            hiddenHints.push(randomHintSet.hiddenHint)
        })
        sessionSetup.code = code

        // Open hints immersively represented as hotel rules.
        const hotelRules = {
            desc: "Hotel-Regeln",
        }
        var rules = ""
        for (i = 1; i <= openHints.length; i++){
            rules += "Regel " + i.toString() + ": " + openHints[i - 1] + ". "
        }
        hotelRules.rules = rules

        // Calculate numbers of filled / closed / jammed objects.
        const filledObjectNum = CODE_DIGIT_NUM + 2
        const objectNum = Math.ceil(filledObjectNum * 1.5)
        const closedObjectNum = Math.floor(objectNum / 2)
        const openObjectNum = objectNum - closedObjectNum
        const crowbarObjectNum = Math.floor(closedObjectNum / 2)
        const boltCutterObjectNum = closedObjectNum - crowbarObjectNum

        // Randomly select crowbar objects.
        const crowbarObjects = []
        const crowbarObjectsToPickFrom = [...crowbarObjectList]
        for (i = 0; i < crowbarObjectNum; i++){
            let objIdx = Math.floor(Math.random()*crowbarObjectsToPickFrom.length)
            crowbarObjects.push(crowbarObjectsToPickFrom[objIdx])
            crowbarObjectsToPickFrom.splice(objIdx, 1)
        }
        // Randomly select boltcutter objects.
        const boltCutterObjects = []
        const boltCutterObjectsToPickFrom = [...boltCutterObjectList]
        for (i = 0; i < boltCutterObjectNum; i++){
            let objIdx = Math.floor(Math.random()*boltCutterObjectsToPickFrom.length)
            boltCutterObjects.push(boltCutterObjectsToPickFrom[objIdx])
            boltCutterObjectsToPickFrom.splice(objIdx, 1)
        }
        // Randomly select open objects.
        const openObjects = []
        const openObjectsToPickFrom = [...openObjectList]
        for (i = 0; i < openObjectNum; i++){
            let objIdx = Math.floor(Math.random()*openObjectsToPickFrom.length)
            openObjects.push(openObjectsToPickFrom[objIdx])
            openObjectsToPickFrom.splice(objIdx, 1)
        }

        // Randomly assign crowbar item to one of the objects.
        // Coinflip: Is crowbar in a locked (bolt cutter) container?
        const crowbarContainerLocked = Math.floor(Math.random()*2) === 1
        var crowbarContainer = null
        if (crowbarContainerLocked){
            // Randomly select one of the locked (bolt cutter) objects.
            let objIdx = Math.floor(Math.random()*boltCutterObjects.length)
            crowbarContainer = boltCutterObjects[objIdx]
            boltCutterObjects.splice(objIdx, 1)
        }
        else {
            // Randomly select one of the open objects.
            let objIdx = Math.floor(Math.random()*openObjects.length)
            crowbarContainer = openObjects[objIdx]
            openObjects.splice(objIdx, 1)
        }
        crowbarContainer.content = "Eine Brechstange"

        // Randomly assign bolt cutter item to one of the objects.
        // Don't lock bolt cutter if it's needed to get the crowbar!
        boltCutterContainer = null
        if (crowbarContainerLocked){
            // Randomly select one of the remaining open objects.
            let objIdx = Math.floor(Math.random()*openObjects.length)
            boltCutterContainer = openObjects[objIdx]
            openObjects.splice(objIdx, 1)
        }
        else {
            // Coinflip: Is bolt cutter in a jammed (crowbar) container?
            let boltCutterContainerLocked = Math.floor(Math.random()*2) === 1
            if (boltCutterContainerLocked){
                // Randomly select one of the jammed (crowbar) objects.
                let objIdx = Math.floor(Math.random()*crowbarObjects.length)
                boltCutterContainer = crowbarObjects[objIdx]
                crowbarObjects.splice(objIdx, 1)
            }
            else {
                // Randomly select one of the remaining open objects.
                let objIdx = Math.floor(Math.random()*openObjects.length)
                boltCutterContainer = openObjects[objIdx]
                openObjects.splice(objIdx, 1)
            }
        }
        boltCutterContainer.content = "Einen Bolzenschneider"

        // Randomly assign hidden hints to remaining objects (of all kinds).
        const remainingObjects = openObjects.concat(crowbarObjects).concat(boltCutterObjects)
        hiddenHints.forEach(hint => {
            remainingObjects[Math.floor(Math.random()*remainingObjects.length)].content = hint
        })

        /**
         *  Randomly assign objects to rooms.
         * */ 
        const roomObjectCountMap = new Map()
        const rooms = Object.values(sessionSetup.rooms)
        rooms.forEach( r => {
            roomObjectCountMap.set(r, 0)
        })
        const unjammedRooms = [...rooms]
        unjammedRooms.splice(rooms.indexOf(sessionSetup.rooms.end), 1)

        // Randomly assign crowbar container to unjammed room accessible from start. 
        // Crowbar is needed to unjam the door to end.
        const crowbarRoom = unjammedRooms[Math.floor(Math.random()*unjammedRooms.length)]
        addObject(crowbarRoom, crowbarContainer)
        roomObjectCountMap.set(crowbarRoom, 1)

        // Randomly assign bolt cutter container.
        // Needs to be in unjammed room if needed to unlock crowbar container.
        var boltCutterRoom = null
        if (crowbarContainerLocked){
            boltCutterRoom = unjammedRooms[Math.floor(Math.random()*unjammedRooms.length)]
        }
        else {
            boltCutterRoom = rooms[Math.floor(Math.random()*rooms.length)]
        }
        addObject(boltCutterRoom, boltCutterContainer)
        roomObjectCountMap.set(boltCutterRoom, roomObjectCountMap.get(boltCutterRoom) + 1)

        // Randomly assign remaining objects & hotel rules.
        // Condition: A room shall not have more than two more objects than the minimally filled one.
        remainingObjects.push(hotelRules)
        remainingObjects.forEach( o => {
            let leastFilledRoomObjNum = Math.min(...roomObjectCountMap.values())
            let allowedRooms = []
            roomObjectCountMap.forEach( (value, key) =>{
                if (value < leastFilledRoomObjNum + 3){
                    allowedRooms.push(key)
                }  
            })
            let room = allowedRooms[Math.floor(Math.random()*allowedRooms.length)]
            addObject(room, o)
            roomObjectCountMap.set(room, roomObjectCountMap.get(room) + 1)
        })

        addExit(sessionSetup)

        console.log(sessionSetup)
        //console.log(sessionSetup.start.objects)
        //console.log(sessionSetup.room1.objects)
        //console.log(sessionSetup.room2.objects)
        //console.log(sessionSetup.end.objects)

        return sessionSetup
    }
}