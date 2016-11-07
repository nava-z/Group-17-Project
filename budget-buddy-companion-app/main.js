import { 
    RadioGroup, 
    RadioGroupBehavior
} from 'buttons';

import {
    FieldScrollerBehavior,
    FieldLabelBehavior
} from 'field';

import {
    SystemKeyboard
} from 'keyboard';

import {
    VerticalScroller,
    VerticalScrollbar,
    TopScrollerShadow,
    BottomScrollerShadow
} from 'scroller';

import { 
    Button,
    ButtonBehavior 
} from 'buttons';

//variables

let total = 1;
var food = "";
let calories = 1;
var backgroundSkin = new Skin({ fill: '#eee' });
var buttonSkin = new Skin({ fill: '#ccf' });
var buttonStyle = new Style({ color: 'gray', font: 'bold 24px', horizontal: 'center', vertical: 'middle' });
var buttonStyle2 = new Style({ color: 'white', font: 'bold 24px', horizontal: 'center', vertical: 'middle' });
var headerStyle = new Style({ color: '#444', font: 'bold 22px', horizontal: 'center', vertical: 'middle' });


//questions:
//new screen scroll
//variable scope

const foods = {
"Plate of Spaghetti":600,
"Banana":105,
"Pop Tart":200,
"Big Mac":563,
"Medium Fries":365,
"Taco":189,
"Slice of Bread":79,
"Chocolate Cake":350,
"Plate of Pad Thai":889,
"IHOP Chorizo Fiesta Omelette":	1990,
"Harmless Coconut Water (1 bottle)":120,
"Boba Milk Tea with Grass Jelly":316,
"Cup of Black Coffee":5,
"Grande Caramel Frappuccino":420
}

//radio buttons
let foodItems = RadioGroup.template($ => ({
    top: 10, left: 10, right: 10,
    Behavior: class extends RadioGroupBehavior {
        onRadioButtonSelected(buttonName) {
            trace( buttonName + "\n");
            food = buttonName;
            calories = foods[buttonName];
            trace( "calories is: " + calories + "\n");
        }
    }
}));

let whiteSkin = new Skin({ fill: "white" });
let nameInputSkin = new Skin({ borders: { left: 2, right: 2, top: 2, bottom: 2 }, stroke: 'gray' });
let fieldStyle = new Style({ color: 'white', font: 'bold 20px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
let fieldHintStyle = new Style({ color: '#aaa', font: '15px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
let fieldLabelSkin = new Skin({ fill: ['transparent', 'transparent', '#C0C0C0', '#acd473'] });


//text field
let MyField = Container.template($ => ({ 
    bottom:5, width: 140, height: 30, left: 90, skin: nameInputSkin, contents: [
        Scroller($, { 
            left: 4, right: 4, top: 4, bottom: 4, active: true, 
            Behavior: FieldScrollerBehavior, clip: true, 
            contents: [
                Label($, { 
                    left: 0, top: 0, bottom: 0, skin: fieldLabelSkin, 
                    style: fieldStyle, anchor: 'NAME',
                    editable: true, string: $.name,
                    Behavior: class extends FieldLabelBehavior {
                        onEdited(label) {
                            let data = this.data;
                            data.name = label.string;
                            total = parseInt(data.name) * calories;
                            label.container.hint.visible = (data.name.length == 0);                            
                            trace(total + "  this is total \n");
                            
                        }
                    },
                }),
                Label($, {
                    left: 4, right: 4, top: 4, bottom: 4, style: fieldHintStyle,
                    string: "Quantity", name: "hint"
                }),
            ]
        })
    ]
}));
 
 


//Initial Screen
var initialScreen = Container.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
	contents: [
		Label($, { left: 0, right: 0, top: 30, style: headerStyle, string: 'Welcome to Calorie Converter' }),
		Label($, { height: 35, left: 35, right: 35, active: true, string: 'Click to Start', skin: buttonSkin, style: buttonStyle2,
			behavior: Behavior({
				onCreate: function(content){
            		this.upSkin = new Skin({
                		fill: "black", 
                		borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                		stroke: "white"
            		});
            		this.downSkin = new Skin({
             		  fill: "#3AFF3E", 
              		  borders: {left: 1, right: 1, top: 1, bottom: 1}, 
              		  stroke: "white"
           			});
            		content.skin = this.upSkin;
        		},
        		onTouchBegan: function(content){
          		  content.skin = this.downSkin;
        		},
        		onTouchEnded: function(content){
            		content.skin = this.upSkin;
            		application.remove(currentScreen);  // Remove the old screen from the application
            		currentScreen = scrollerExample;  // Make the new screen
            		application.add(currentScreen);  // Add the new screen to the application
        		},
			})
		})
 	]
}));

//scroll container
let darkGraySkin = new Skin({ fill: "#202020" });
let titleStyle = new Style({ font: "20px", color: "white" });
let resultStyle = new Style({ font: "20px", color: "black" });

let scrollContainer = Container.template($ => ({
    left: 0, right: 0, top:0, bottom: 0,
    contents: [
        VerticalScroller($, { 
            active: true, top: 10, bottom: 70,
            contents: [
                $.contentToScrollVertically,
                VerticalScrollbar(), 
                TopScrollerShadow(), 
                BottomScrollerShadow(),    
            ] 
                                
        }),

        new Container({ 
            top: 0, height: 20, left: 0, right: 0, skin: darkGraySkin,
            style: titleStyle, 
            contents: [
            	new Label({ string: "Select Food Item" }),
                
            ]
        }),
        new Container({ 
            bottom: 30, height: 40, left: 0, right: 0, skin: darkGraySkin, 
            style: titleStyle, 
            contents: [
            	
                new MyField({name: "Enter Quantity"})
            ]
        }),
        new Container({ 
            bottom: 0, height: 30, left: 0, right: 0, skin: buttonSkin, 
            style: titleStyle, 
            contents: [
            	Label($, { height: 35, left: 25, right: 25, active: true, string: 'Submit', skin: buttonSkin, style: buttonStyle,
					behavior: Behavior({
						onCreate: function(content){
		            		this.upSkin = new Skin({
		                		fill: "transparent", 
		                		
		            		});
		            		this.downSkin = new Skin({
		             		  fill: "#3AFF3E", 
		              		  borders: {left: 1, right: 1, top: 1, bottom: 1}, 
		              		  stroke: "white"
		           			});
		            		content.skin = this.upSkin;
		        		},
		        		onTouchBegan: function(content){
		        		  
		          		  content.skin = this.downSkin;
		        		},
		        		onTouchEnded: function(content){
		            		content.skin = this.upSkin;
		            		SystemKeyboard.hide();
		            		trace(total + "screen change \n");
		            		
		            		application.remove(currentScreen);  // Remove the old screen from the application
		            		currentScreen = newScreen;  // Make the new screen
		            		application.add(currentScreen);  // Add the new screen to the application
		        		},
					})
				})
            ]
        })
    ]
    
}));
let contentToScrollVertically = new foodItems({buttonNames: "Plate of Spaghetti,Banana,Big Mac,Slice of Bread,Plate of Pad Thai,Boba Milk Tea with Grass Jelly,Grande Caramel Frappuccino,Pop Tart,Medium Fries,Taco,Chocolate Cake,IHOP Chorizo Fiesta Omelette,Harmless Coconut Water (1 bottle),Cup of black coffee"})
let scrollerExample = new scrollContainer({ contentToScrollVertically });

// new screen
let newScreenContainer = Container.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0, skin: backgroundSkin,
	contents: [
		VerticalScroller($, { 
            active: true, top: 10, bottom: 35,
            contents: [
                $.resultToScrollVertically,
                VerticalScrollbar(), 
                TopScrollerShadow(), 
                BottomScrollerShadow(),    
            ] 
                                
        }),
		new Container({ 
	            top: 0, height: 60, left: 0, right: 0, skin: darkGraySkin,
            	style: titleStyle, 
            	contents: [
					new Label ({ string: "total Calories:  " + total}),
					
				],
				
		}),
		
		new Container({ 
            bottom: 0, height: 35, left: 0, right: 0, skin: buttonSkin, 
            style: titleStyle, 
            contents: [
				Label($, { bottom:0, height: 35, left: 0 , width:160,  active: true, string: 'Go Back', skin: buttonSkin, style: buttonStyle2,
					behavior: Behavior({
						onCreate: function(content){
		            		this.upSkin = new Skin({
		                		fill: "black", 
		                		borders: {left: 1, right: 1, top: 1, bottom: 1}, 
		                		stroke: "white"
		            		});
		            		this.downSkin = new Skin({
		             		  fill: "#3AFF3E", 
		              		  borders: {left: 1, right: 1, top: 1, bottom: 1}, 
		              		  stroke: "black"
		           			});
		            		content.skin = this.upSkin;
		        		},
		        		onTouchBegan: function(content){
		          		  content.skin = this.downSkin;
		        		},
		        		onTouchEnded: function(content){
		            		content.skin = this.upSkin;
		            		application.remove(currentScreen);  // Remove the old screen from the application
		            		currentScreen = scrollerExample;  // Make the new screen
		            		application.add(currentScreen);  // Add the new screen to the application
		        		},
					})
				}),
				Label($, { bottom:0, height: 35, right:0 ,width:160, active: true, string: 'Done', skin: buttonSkin, style: buttonStyle2,
					behavior: Behavior({
						onCreate: function(content){
		            		this.upSkin = new Skin({
		                		fill: "black", 
		                		borders: {left: 1, right: 1, top: 1, bottom: 1}, 
		                		stroke: "white"
		            		});
		            		this.downSkin = new Skin({
		             		  fill: "#3AFF3E", 
		              		  borders: {left: 1, right: 1, top: 1, bottom: 1}, 
		              		  stroke: "black"
		           			});
		            		content.skin = this.upSkin;
		        		},
		        		onTouchBegan: function(content){
		          		  content.skin = this.downSkin;
		        		},
		        		onTouchEnded: function(content){
		            		content.skin = this.upSkin;
		            		application.remove(currentScreen);  // Remove the old screen from the application
		            		currentScreen = new initialScreen();  // Make the new screen
		            		application.add(currentScreen);  // Add the new screen to the application
		        		},
					})
				})
			]
		})
 	]
}));
 
 
function amount(f){
	return Math.round(total/foods[f]);
}


let resultToScrollVertically = new Column({ 
top: 55, left: 0, right: 0,
    contents: [
      Object.keys(foods).map(food =>
    new Container({
        height: 30, left: 0, style: titleStyle,
        contents: [
        	
            new Label({ string: "= around  " + amount(food) + " " + food , style: resultStyle })
        ]
}))
    ]
});


let newScreen = new newScreenContainer({ resultToScrollVertically });

var currentScreen = new initialScreen();

//application
 application.behavior = Behavior({
    onLaunch: function(application) {
        application.skin = new Skin({ fill: "white" });
        application.active = true;

        application.add(currentScreen);
    }
})
