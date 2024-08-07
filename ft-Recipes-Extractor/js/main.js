/* TODO:
- Add new page or smth which will contain some useful info 
    (lists of all basic and exotic ingredients, recipes, ingredients sorted by usage frequency...; 
    formulas for price evaluation)
- read file "recipes.json"
*/

import { recipes as recipesJson } from "./recipes.js";

const recipesLevelsInOrder = [
    "Secret",
    "Exotic",
    "Tier 3",
    "Tier 2",
    "Tier 1",
    "Basic",
    "Unknown"
];

const basicIngredients = [
    "Tomato",
    "Flour",
    "Potato",
    "Milk",
    "Egg",
    "Sugar",
    "Spices",
    "Meat",
    "Fish",
    "Onion",
    "Chocolate",
    "Rice",
    "Water",
    "Lemon",
    "Olives",
    "Lettuce"
]

const honeyIngredients = [
    "Honey",
    "Honeycomb"
]

const exoticIngredients = [
    "Apple",
    "Corn",
    "Cherries",
    "Mushroom",
    "Pineapple",
    "Beans",
    "Tea Leaves",
    "Ginger",
    "Avocado",
    "Grapes"
];

const foods = basicIngredients.concat(exoticIngredients).concat(honeyIngredients)
    .concat(Object.keys(recipesJson))

const priceBonuses = {
    "cook": 10,
    "normalIng": 40,
    "exoticIng": 200,
    "quality": 0.15
};

class ItemParseError extends Error { };

function parseToItem(line) {
    let itemName, amount;
    line = line.replace(/\*/g, "");
    let ingredient = /^(?:. |:.+?: |<:.+?:\d+?> )(.+) ×(\d+)(?: \((?:Exotic|Honey)\))?(?: \(ID: \d+\))?$/u;
    let dish = /^(?:. |:.+?: |<:.+?:\d+?> ){2}(.+)(?: \[\d+ (?::dollar:|💵) \])(?: \(ID: \d+\))?$/u;
    let custom = /^(.+) (\d+)$/u;
    if (ingredient.test(line)) {
        let result = ingredient.exec(line);
        itemName = result[1];
        amount = result[2];
    } else if (dish.test(line)) {
        let result = dish.exec(line);
        itemName = result[1];
        amount = 1;
    } else if (custom.test(line)) {
        let result = custom.exec(line);
        itemName = result[1];
        amount = result[2];
    } else {
        throw new ItemParseError("Invalid line: " + line);
    }
    if (!(foods.includes(itemName)))
        throw new InvalidFoodError("Invalid Food: " + itemName)
    return { itemName: itemName, amount: amount };
}

class InvalidFoodError extends Error { };

function parseToItemsJson(message) {
    let userItems = {};
    let erroredLines = {};
    let item;
    message = message.split('\n');
    for (let i in message) {
        const line = message[i];
        try {
            item = parseToItem(line);
            if (!(item.itemName in userItems))
                userItems[item.itemName] = 0;
            userItems[item.itemName] += item.amount;
        } catch (e) {
            if (e instanceof ItemParseError || e instanceof InvalidFoodError) {
                erroredLines[i] = e.message;
            } else {
                throw e;
            }
        }
    }
    return { userItems: userItems, erroredLines: erroredLines };
}

function itemsObjectToString(itemsObject) {
    let result = [];
    for (let itemName in itemsObject)
        result.push(`${itemName} ×${itemsObject[itemName]}`);
    return result.join(', ');
}

function unpackDish(dishName, cookAmount = 0) {
    cookAmount += 1;
    let unpacked = {};
    for (const ing in recipesJson[dishName]["ingredients"]) {
        if (ing in recipesJson) {
            const deepUnpacked = unpackDish(ing);
            cookAmount += deepUnpacked["cookAmount"] * recipesJson[dishName]["ingredients"][ing];
            for (const deepIngName in deepUnpacked["ings"]) {
                if (!unpacked.hasOwnProperty(deepIngName))
                    unpacked[deepIngName] = 0;
                unpacked[deepIngName] += deepUnpacked["ings"][deepIngName] * recipesJson[dishName]["ingredients"][ing];
            }
        } else {
            if (!unpacked.hasOwnProperty(ing))
                unpacked[ing] = 0;
            unpacked[ing] += recipesJson[dishName]["ingredients"][ing];
        }
    }
    return { "ings": unpacked, "cookAmount": cookAmount };
}

Object.filter = (obj, predicate) =>
    Object.fromEntries(Object.entries(obj).filter(predicate));

function normalAndExoticIngsSeparated(unpackedDish) {
    let normal = Object.filter(unpackedDish, (ing) => !exoticIngredients.includes(ing[0]));
    let exotic = Object.filter(unpackedDish, (ing) => exoticIngredients.includes(ing[0]));
    return { "normal": normal, "exotic": exotic };
}

function dishBaseValue(dishName) {
    let unpacked = unpackDish(dishName);
    const ingsSeparated = normalAndExoticIngsSeparated(unpacked["ings"]);
    function sumValues(obj) {
        let sum = 0;
        Object.entries(obj).forEach((entry) => sum += entry[1]);
        return sum;
    }
    const normalIngsAmnt = sumValues(ingsSeparated["normal"]);
    const exoticIngsAmnt = sumValues(ingsSeparated["exotic"]);
    let baseValue = priceBonuses["normalIng"] * normalIngsAmnt +
        priceBonuses["exoticIng"] * exoticIngsAmnt +
        priceBonuses["cook"] * unpacked["cookAmount"];
    return baseValue;
}

function dishPrice(dishName, dishLevel = 2) {
    baseValue = dishBaseValue(dishName);
    return baseValue + Math.round(baseValue * (dishLevel - 1) * priceBonuses["quality"]);
}

function sendForm(e) {
    let hideSecretRecipesCheckbox = document.getElementById("hide-secret-recipes-checkbox");

    // extract items from input
    const userInput = document.getElementById("user-items-input").value;
    const { userItems, erroredLines } = parseToItemsJson(userInput);

    // collect awailable recipes
    let awailableRecipes = {};
    for (var recipeName in recipesJson) {
        const recipe = recipesJson[recipeName];
        // catching recipes with unfilled ingredients
        if (Object.keys(recipe["ingredients"]).length == 0) {
            continue;
        }
        if (hideSecretRecipesCheckbox.checked && recipe["rarity"] == "Secret") {
            continue;
        }
        let canCook = true;
        for (var recipeIngredient in recipe["ingredients"]) {
            let requiredAmount = recipe["ingredients"][recipeIngredient];
            let userAmount = userItems[recipeIngredient];
            if (recipeIngredient in userItems) {
                if (userAmount < requiredAmount) {
                    canCook = false;
                    break;
                }
            } else {
                canCook = false;
                break;
            }
        }
        if (canCook) {
            awailableRecipes[recipeName] = recipe;
        }
    }

    // sort awailable recipes
    let awailableRecipesArray = [];
    for (var key in awailableRecipes) {
        awailableRecipesArray.push([key, awailableRecipes[key]]);
    }
    let sortBy = document.getElementById('recipes-sort-select').value;
    switch (sortBy) {
        case 'rarity':
            awailableRecipesArray.sort((a, b) => {
                return recipesLevelsInOrder.indexOf(a[1]["rarity"]) - recipesLevelsInOrder.indexOf(b[1]["rarity"]);
            });
            break;
        case 'name':
            awailableRecipesArray.sort();
            break;
        case 'baseval':
            awailableRecipesArray.sort((a, b) => {
                return dishBaseValue(b[0]) - dishBaseValue(a[0]);
            });
            break;
        case 'price':
            awailableRecipesArray.sort((a, b) => {
                return dishPrice(b[0]) - dishPrice(a[0]);
            });
            break;
        default:
            awailableRecipesArray.sort();
            break;
    }
    let awailableRecipesSorted = {};
    awailableRecipesArray.forEach(element => {
        awailableRecipesSorted[element[0]] = element[1];
    });

    // build response
    const rarityEmojisPaths = {
        "Basic": "assets/rarity-emojis/basic_recipe.webp",
        "Tier 1": "assets/rarity-emojis/tier1_recipe.webp",
        "Tier 2": "assets/rarity-emojis/tier2_recipe.webp",
        "Tier 3": "assets/rarity-emojis/tier3_recipe.webp",
        "Exotic": "assets/rarity-emojis/exotic_recipe.webp",
        "Secret": "assets/rarity-emojis/secret_recipe.webp",
        "Unknown": "assets/rarity-emojis/unknown_recipe.webp"
    };
    let response = "";
    for (var recipeName in awailableRecipesSorted) {
        const recipe = awailableRecipes[recipeName];
        let rarityEmoji = `<img src="${rarityEmojisPaths[recipe["rarity"]]}" height="13"></img>`;
        let line = `• <b>${recipeName}</b> (${rarityEmoji}${recipe["rarity"]} 💵${dishBaseValue(recipeName)}):\n` +
            `   ${itemsObjectToString(recipe["ingredients"])}\n`;
        response += line;
    }
    if (!response) {
        response = "Seems like you can't cook anything out of these ingredients";
        if (hideSecretRecipesCheckbox.checked) response += " (secret recipes might've been hidden)";
    }
    if (Object.keys(erroredLines).length != 0) {
        response += "\n\nWarnings:\n";
        for (let prop of Object.keys(erroredLines)) {
            response += `line ${parseInt(prop) + 1}: ${erroredLines[prop]}\n`;
        }
    }
    const outputBox = document.getElementById("output-textarea");
    outputBox.innerHTML = response;
}
const sendButton = document.getElementById("send-form-btn");
sendButton.addEventListener("click", sendForm);
