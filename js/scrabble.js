/*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely 
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on November 21, 2015 at 10:27 AM
 *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
 *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
 */
 
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9 } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2} ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4 } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3 } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9 } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1 } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1} ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4} ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2} ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6 } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8 } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1 } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6 } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4 } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6 } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4 } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1 } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2 } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1 } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2 } ;


// Probably don't need this... 
var BoardSlots = [];
BoardSlots["1"] = { "tile":"", "letter_value":1, "word_value":1 };
BoardSlots["2"] = { "tile":"", "letter_value":1, "word_value":1 };
BoardSlots["3"] = { "tile":"", "letter_value":1, "word_value":2 };
BoardSlots["4"] = { "tile":"", "letter_value":1, "word_value":1 };
BoardSlots["5"] = { "tile":"", "letter_value":1, "word_value":1 };
BoardSlots["6"] = { "tile":"", "letter_value":1, "word_value":1 };
BoardSlots["7"] = { "tile":"", "letter_value":2, "word_value":1 };
BoardSlots["8"] = { "tile":"", "letter_value":1, "word_value":1 };
BoardSlots["9"] = { "tile":"", "letter_value":2, "word_value":1 };
BoardSlots["10"] = { "tile":"", "letter_value":1, "word_value":1 };
BoardSlots["11"] = { "tile":"", "letter_value":1, "word_value":1 };
BoardSlots["12"] = { "tile":"", "letter_value":1, "word_value":1 };
BoardSlots["13"] = { "tile":"", "letter_value":1, "word_value":2 };
BoardSlots["14"] = { "tile":"", "letter_value":1, "word_value":1 };
BoardSlots["15"] = { "tile":"", "letter_value":1, "word_value":1 };

var total_score = 0;
var current_score = 0;

var bag = [];
var bag_total = 0;

var hand_size = 0;

var current_word = "";

// Initalization function
function init() {
    // Create bag of tiles to pull from
    // The array stores each 'tile' uniquely, so there'll be 9 A's, 2 B's, etc.
    // This keeps the probablity realistic.
    for (const key in ScrabbleTiles) {
        for (let x=0; x < ScrabbleTiles[key]["number-remaining"]; x++) {
            bag[bag_total] = key;
            bag_total = bag_total + 1;
        }
    }

    // Make tiles draggable and slots droppable (and the rack too) 
    // I reuse this a lot I probably should've made it into a proper fucntion but whatever
    $( function() {
        $(".draggable").draggable({
            revert: "invalid"
        });
        $(".droppable").droppable({
            accept: ".draggable",
            drop: function(event, ui) {
                $(this).append(ui.draggable);
                checkBoard();
            }
        });
        $(".slot").droppable({
            accept: ".draggable",
            drop: function(event, ui) {
                $(ui.draggable).css("top", "2px");
                $(ui.draggable).css("left", "3px");
                $(this).append(ui.draggable);

                checkBoard();

                $(this).droppable("option", "accept", ui.draggable);
            },
            out: function(event, ui){
                $(this).droppable("option", "accept", ".draggable");
                checkBoard();
            }   
        });
    });

    refillHand();
}

// Refills the rack back to 7 tiles
function refillHand(){
    var rack = document.getElementById("rack-container");
    $("#errormsg").html("");
    for (hand_size; hand_size < 7; hand_size++){
        // If the bag is empty this will not work.
        if (bag_total <= 0) { 
            $("#errormsg").html("The bag is empty!");
            break; 
        } else {
            // Creates the div that will become a tile.
            var tile = document.createElement("div");
            tile.setAttribute("class", "draggable");
            tile.className += " tile";
            
            // Grabs a random tile from the bag using the built in javascript random function.
            // Multiplying by bag_total gives us a number in the range of the bag size
            // Math.floor rounds down the number into an interger to index the bag with
            var rand =  Math.floor(Math.random() * bag_total); 
            
            // Update the bag parameters
            var tile_id = bag[rand];
            ScrabbleTiles[tile_id]["number-remaining"] = ScrabbleTiles[tile_id]["number-remaining"] - 1;
            bag_total = bag_total - 1;
            // Grab the tile out of the bag (deleting the slot it used to exist in the array)
            bag.splice(rand, 1);
            
            
            tile.setAttribute("id", tile_id);
    
            rack.appendChild(tile);
        }
        
    }
    $("#left").html(bag_total);
}

// Checks the tiles on the board and updates the score/word
function checkBoard() {
    // clearing previous checks
    current_word = "";
    current_score = 0;
    // used for the word multiplier tiles since the score calc for word multipliers have to happen at the end
    var word_multiplier = 1;
    // Only have 15 tiles, so iterate 15 times
    for (let i=1; i < 16; i++) {
        var slot = "." + i.toString();
        var letter = $(slot).children().attr("id");
        if (letter != undefined) {
            // Store the tile in the data structure that I didn't use
            BoardSlots[i.toString()].tile = letter;

            // Check if one of the tiles a letter is on is on a multiply word tile; if so, multiply the word multiplier
            word_multiplier = word_multiplier * BoardSlots[i.toString()].word_value;

            // reading from left to right, grab the letters and concate them into one word
            current_word = current_word + $(slot).children().attr("id");
            // do the same but with the score of each letter
            current_score = (current_score + (ScrabbleTiles[letter].value  * BoardSlots[i.toString()].letter_value));
        } else {
            // Store the blank tile in the data struct.
            BoardSlots[i.toString()].tile = "";
        }
    }
    current_score = current_score * word_multiplier;

    // Update html
    $("#word").html(current_word);
    $("#score").html(current_score);
}

// Restarts the game
function restartGame(){
    // set everything back to init values 
    total_score = 0;
    bag = [];
    bag_total = 0;
    hand_size = 0;

    for (const key in ScrabbleTiles) {
        ScrabbleTiles[key]["number-remaining"] = ScrabbleTiles[key]["original-distribution"];
    }

    // Remove all tiles from the board and rack
    $(".tile").remove();

    // Remake the bag of tiles
    for (const key in ScrabbleTiles) {
        for (let x=0; x < ScrabbleTiles[key]["number-remaining"]; x++) {
            bag[bag_total] = key;
            bag_total = bag_total + 1;
        }
    }
    // make the tiles/slots draggable/droppable
    $( function() {
        $(".draggable").draggable({
            revert: "invalid"
        });
        $(".droppable").droppable({
            accept: ".draggable"
        });
        $(".slot").droppable({
            accept: ".draggable",
            drop: function(event, ui) {
                $(ui.draggable).css("top", "2px");
                $(ui.draggable).css("left", "3px");
                $(this).append(ui.draggable);
    
                $(this).droppable("option", "accept", ui.draggable);
            },
            out: function(event, ui){
                $(this).droppable("option", "accept", ".draggable");
            }   
        });
    });

    // Give the player a new hand
    refillHand();
    // Reset the score displays
    checkBoard();
}

// initizaltion
init();

// When you click the restart button it restarts the game
document.getElementById("restart").onclick = restartGame;

// Submiting words to the submitted words list, and updates total score
document.getElementById("submit").onclick = function() {
    // get the word on the board
    checkBoard();
    // put it in the submitted words list
    $("#words").append(current_word);
    $("#words").append("<br>");

    // update total score
    total_score = total_score + current_score;
    $("#total").html(total_score);

    // clear the board but not the rack
    for (let i=1; i < 16; i++) {
        var slot = "." + i.toString();
        var letter = $(slot).children().attr("id");
        if (letter != undefined) {
            $(slot).empty();
            hand_size = hand_size - 1;
        }
    }

    // Refill the player's hand and update the scoreboard
    refillHand();
    checkBoard();
    
    // make the tiles/slots draggable/droppable
    $( function() {
        $(".draggable").draggable({
            revert: "invalid"
        });
        $(".droppable").droppable({
            accept: ".draggable",
            drop: function(event, ui) {
                $(this).append(ui.draggable);
                checkBoard();
            }
        });
        $(".slot").droppable({
            accept: ".draggable",
            drop: function(event, ui) {
                $(ui.draggable).css("top", "2px");
                $(ui.draggable).css("left", "3px");
                $(this).append(ui.draggable);

                checkBoard();

                $(this).droppable("option", "accept", ui.draggable);
            },
            out: function(event, ui){
                $(this).droppable("option", "accept", ".draggable");
                checkBoard();
            }   
        });
    });
}