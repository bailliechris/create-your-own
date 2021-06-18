// Global Variables
// Counter for unique IDs
var num = 0;
// Set up for choosing random numbers
const colour_val= ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
var context_menu = document.getElementById("context-menu");
var moving = false;
var moving_part;
var mousepos = {
    x: 0, y: 0, offsetx:0, offsety:0
};
var scope = document.querySelector("body");

window.addEventListener("contextmenu", e => {
    e.preventDefault()
}); 

document.addEventListener("keydown", e => {
    if (e.altKey) {
        console.log("Alt Key pressed");
        moving_part.remove();
    }
    else {
        console.log("other Key pressed");
    }
})


// Function to create a new button
// x for number of buttons to add
function add(x, type) {
    for (let i = 0; i < x; i++) {
        // Work out current screen size
        let div_height = document.querySelector("#container").clientHeight;
        let div_width = document.querySelector('#container').clientWidth;
        
        // Create a new ball item with random positions, speeds and id 
        let new_part = document.createElement(type);
        new_part.id = num.toString();
        new_part.className = type;
        new_part.style.position = "absolute";
        new_part.style.top = "0px";
        new_part.style.left = "0px";
        new_part.style.borderRadius = "5%";
        if (type === "img") {
            // details for image element here
            new_part.src = document.getElementById("txtchoice").value;
        }
        else {
            // other specific changes here
            new_part.innerHTML = document.getElementById("txtchoice").value;
            new_part.style.backgroundColor = document.getElementById("bgcolour_choice").value;
            new_part.style.color = document.getElementById("txtcolour_choice").value;
            new_part.style.fontSize = document.getElementById("textsize").value + "vw";
        }

        // Moving the element on click
        new_part.addEventListener("mousedown", e => {
            // Right click to open the menu - not working :(
            if (e.button === 2){
                //document.getElementById(e.target.id).remove();
                console.log("Open Right Click Menu");
                const {
                    clientX: mouseX,
                    clientY: mouseY
                } = e;
                
                context_menu.classList.add("visible");
            }
            // Other click to select the object and ready for moving
            else {
                moving_part = document.getElementById(e.target.id);
                //mousepos.offsetLeft = part.offsetLeft - e.clientX;
                //mousepos.offsetTop = part.offsetTop - e.clientY;
                moving = true;                
            }

            //}
        }, true);
    
        // Add new item to DOM
        document.body.appendChild(new_part);

        // Increase unique ID value
        num++;
    }
}

document.addEventListener("mousemove", function(e) {
    //if (e.target.nodeName === type){
    e.preventDefault();

    if (moving) {
        //index = part_list.findIndex(part => part.get_id === e.target.id);
        mousepos.x = e.clientX;
        mousepos.y = e.clientY;
        moving_part.style.left = (mousepos.x + mousepos.offsetx) + 'px';
        moving_part.style.top = (mousepos.y + mousepos.offsety) + 'px';
    }
    //}
}, true);

document.addEventListener("mouseup", function() {
    moving = false;
    //}
}, true);