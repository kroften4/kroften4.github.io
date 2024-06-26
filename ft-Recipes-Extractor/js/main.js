/* TODO:
- Add new page or smth which will contain some useful info 
    (lists of all basic and exotic ingredients, recipes, ingredients sorted by usage frequency...; 
    formulas for price evaluation)
- Centralise layout (how tf)
- Add warnings if a string could not be parsed (dish name not in the recipes list)
*/

const recipesJson = {
    "Alfredo": {
        "ingredients": {
            "Cheese": 1,
            "Milk": 1,
            "Noodles": 1
        },
        "rarity": "Tier 2"
    },
    "Anchovy Pizza": {
        "ingredients": {
            "Fish": 1,
            "Pizza": 1
        },
        "rarity": "Tier 3"
    },
    "Apple Juice": {
        "ingredients": {
            "Apple": 1,
            "Sugar": 1,
            "Water": 1
        },
        "rarity": "Exotic"
    },
    "Apple Pie": {
        "ingredients": {
            "Apple": 1,
            "Pie Crust": 1
        },
        "rarity": "Exotic"
    },
    "Asada Taco": {
        "ingredients": {
            "Meat": 1,
            "Onion": 1,
            "Tortilla": 1
        },
        "rarity": "Tier 1"
    },
    "Avocado Roll": {
        "ingredients": {
            "Avocado": 1,
            "Egg Nigiri": 1
        },
        "rarity": "Exotic"
    },
    "Bacon": {
        "ingredients": {
            "Meat": 2
        },
        "rarity": "Basic"
    },
    "Bagel": {
        "ingredients": {
            "Bread": 1,
            "Cream Cheese": 1
        },
        "rarity": "Tier 3"
    },
    "Baguette": {
        "ingredients": {
            "Bread": 3
        },
        "rarity": "Tier 2"
    },
    "Basic Taco": {
        "ingredients": {
            "Cheese": 1,
            "Meat": 1,
            "Tortilla": 1
        },
        "rarity": "Tier 2"
    },
    "Batter": {
        "ingredients": {
            "Egg": 1,
            "Flour": 1,
            "Olive Oil": 1
        },
        "rarity": "Tier 1"
    },
    "Blue Ice": {
        "ingredients": {
            "Packed Ice": 2
        },
        "rarity": "Secret"
    },
    "Boba Tea": {
        "ingredients": {
            "Milk": 1,
            "Tea": 1
        },
        "rarity": "Exotic"
    },
    "Boiled Egg": {
        "ingredients": {
            "Egg": 1,
            "Water": 1
        },
        "rarity": "Basic"
    },
    "Bread": {
        "ingredients": {
            "Dough": 1,
            "Flour": 1
        },
        "rarity": "Tier 1"
    },
    "Broth": {
        "ingredients": {
            "Meat": 1,
            "Water": 1
        },
        "rarity": "Basic"
    },
    "Burger": {
        "ingredients": {
            "Bread": 1,
            "Meat": 1
        },
        "rarity": "Tier 2"
    },
    "Burrito": {
        "ingredients": {
            "Beans": 1,
            "Lettuce": 1,
            "Tortilla": 1
        },
        "rarity": "Exotic"
    },
    "Butter": {
        "ingredients": {
            "Milk": 2
        },
        "rarity": "Basic"
    },
    "Cake": {
        "ingredients": {
            "Batter": 2,
            "Icing": 1
        },
        "rarity": "Tier 3"
    },
    "Candy": {
        "ingredients": {
            "Sugar": 3
        },
        "rarity": "Tier 1"
    },
    "Caramel": {
        "ingredients": {
            "Sugar": 2
        },
        "rarity": "Basic"
    },
    "Caramel Apple": {
        "ingredients": {
            "Apple": 1,
            "Caramel": 1
        },
        "rarity": "Exotic"
    },
    "Cheese": {
        "ingredients": {
            "Milk": 3
        },
        "rarity": "Tier 1"
    },
    "Cheese Fondue": {
        "ingredients": {
            "Cheese": 2
        },
        "rarity": "Tier 2"
    },
    "Cheeseburger": {
        "ingredients": {
            "Burger": 1,
            "Cheese": 1
        },
        "rarity": "Tier 3"
    },
    "Cherry Ice Pop": {
        "ingredients": {
            "Cherries": 1,
            "Ice": 1,
            "Sugar": 1
        },
        "rarity": "Exotic"
    },
    "Cherry Pie": {
        "ingredients": {
            "Cherries": 1,
            "Pie Crust": 1
        },
        "rarity": "Exotic"
    },
    "Cherry Shaved Ice": {
        "ingredients": {
            "Cherries": 1,
            "Ice": 1,
            "Syrup": 1
        },
        "rarity": "Exotic"
    },
    "Cherry Soda": {
        "ingredients": {
            "Cherries": 1,
            "Sugar": 1,
            "Water": 1
        },
        "rarity": "Exotic"
    },
    "Chocolate Cake": {
        "ingredients": {
            "Batter": 2,
            "Chocolate Icing": 1
        },
        "rarity": "Tier 3"
    },
    "Chocolate Cupcake": {
        "ingredients": {
            "Batter": 1,
            "Chocolate Icing": 1
        },
        "rarity": "Tier 2"
    },
    "Chocolate Donut": {
        "ingredients": {
            "Chocolate Icing": 1,
            "Dough": 1
        },
        "rarity": "Tier 2"
    },
    "Chocolate Fondue": {
        "ingredients": {
            "Chocolate": 2,
            "Milk": 1
        },
        "rarity": "Tier 1"
    },
    "Chocolate Ice Cream": {
        "ingredients": {
            "Chocolate": 1,
            "Vanilla Ice Cream": 1
        },
        "rarity": "Tier 2"
    },
    "Chocolate Ice Pop": {
        "ingredients": {
            "Chocolate": 1,
            "Ice": 1,
            "Sugar": 1
        },
        "rarity": "Tier 2"
    },
    "Chocolate Icing": {
        "ingredients": {
            "Chocolate": 1,
            "Milk": 1,
            "Sugar": 1
        },
        "rarity": "Tier 1"
    },
    "Chocolate Pie": {
        "ingredients": {
            "Chocolate": 1,
            "Pie Crust": 1
        },
        "rarity": "Tier 2"
    },
    "Chocolate Shaved Ice": {
        "ingredients": {
            "Chocolate": 1,
            "Ice": 1,
            "Syrup": 1
        },
        "rarity": "Tier 2"
    },
    "Chocolate-Chip Cookie": {
        "ingredients": {
            "Chocolate": 1,
            "Dough": 1,
            "Sugar": 1
        },
        "rarity": "Tier 2"
    },
    "Cinnamon Rolls": {
        "ingredients": {
            "Dough": 1,
            "Icing": 1,
            "Spices": 1
        },
        "rarity": "Tier 1"
    },
    "Coffee": {
        "ingredients": {
            "Beans": 1,
            "Water": 1
        },
        "rarity": "Exotic"
    },
    "Cookie": {
        "ingredients": {
            "Dough": 1,
            "Sugar": 1
        },
        "rarity": "Tier 1"
    },
    "Copypasta": {
        "ingredients": {
            "Pasta with Sauce": 2
        },
        "rarity": "Secret"
    },
    "Cream Cheese": {
        "ingredients": {
            "Cheese": 1,
            "Milk": 1
        },
        "rarity": "Tier 2"
    },
    "Croissant": {
        "ingredients": {
            "Butter": 2,
            "Dough": 1
        },
        "rarity": "Tier 2"
    },
    "Curry": {
        "ingredients": {
            "Broth": 1,
            "Rice": 1,
            "Spices": 1
        },
        "rarity": "Tier 1"
    },
    "Dango": {
        "ingredients": {
            "Dough": 1,
            "Rice": 1,
            "Syrup": 1
        },
        "rarity": "Tier 1"
    },
    "Deluxe Cheeseburger": {
        "ingredients": {
            "Cheeseburger": 1,
            "Lettuce": 1,
            "Tomato": 1
        },
        "rarity": "Tier 3"
    },
    "Dirt": {
        "ingredients": {
            "Mushroom": 1,
            "Water": 2
        },
        "rarity": "Secret"
    },
    "Donut": {
        "ingredients": {
            "Dough": 1,
            "Icing": 1
        },
        "rarity": "Tier 1"
    },
    "Dough": {
        "ingredients": {
            "Flour": 1,
            "Water": 1
        },
        "rarity": "Basic"
    },
    "Dumpling": {
        "ingredients": {
            "Dough": 1,
            "Meat": 1
        },
        "rarity": "Tier 1"
    },
    "Egg Nigiri": {
        "ingredients": {
            "Egg": 1,
            "Rice": 1
        },
        "rarity": "Basic"
    },
    "Fish Nigiri": {
        "ingredients": {
            "Fish": 1,
            "Rice": 1
        },
        "rarity": "Basic"
    },
    "Flan": {
        "ingredients": {
            "Caramel": 1,
            "Egg": 1,
            "Milk": 1
        },
        "rarity": "Tier 1"
    },
    "Flatbread": {
        "ingredients": {
            "Dough": 1,
            "Flour": 1,
            "Milk": 1
        },
        "rarity": "Tier 1"
    },
    "French Fries": {
        "ingredients": {
            "Olive Oil": 1,
            "Potato": 1,
            "Spices": 1
        },
        "rarity": "Tier 1"
    },
    "French Toast": {
        "ingredients": {
            "Egg": 1,
            "Syrup": 1,
            "Toast": 1
        },
        "rarity": "Tier 3"
    },
    "Fried Chicken": {
        "ingredients": {
            "Egg": 1,
            "Flour": 1,
            "Meat": 1
        },
        "rarity": "Tier 1"
    },
    "Fried Shrimp": {
        "ingredients": {
            "Egg": 1,
            "Flour": 1,
            "Shrimp": 1
        },
        "rarity": "Tier 1"
    },
    "Ginger Ale": {
        "ingredients": {
            "Ginger": 1,
            "Sugar": 1,
            "Water": 1
        },
        "rarity": "Exotic"
    },
    "Gingerbread Man": {
        "ingredients": {
            "Dough": 1,
            "Ginger": 1,
            "Icing": 1
        },
        "rarity": "Exotic"
    },
    "Hot Dog": {
        "ingredients": {
            "Bread": 1,
            "Meat": 1,
            "Tomato Sauce": 1
        },
        "rarity": "Tier 2"
    },
    "Ice": {
        "ingredients": {
            "Water": 2
        },
        "rarity": "Basic"
    },
    "Ice-Cold Lemonade": {
        "ingredients": {
            "Ice": 1,
            "Lemonade": 1
        },
        "rarity": "Tier 2"
    },
    "Iced Tea": {
        "ingredients": {
            "Ice": 1,
            "Tea": 1
        },
        "rarity": "Exotic"
    },
    "Icing": {
        "ingredients": {
            "Milk": 1,
            "Sugar": 1
        },
        "rarity": "Basic"
    },
    "Latte": {
        "ingredients": {
            "Coffee": 1,
            "Milk": 1
        },
        "rarity": "Exotic"
    },
    "Le Fishe au Chocolat": {
        "ingredients": {
            "Chocolate": 1,
            "Fish": 1
        },
        "rarity": "Secret"
    },
    "Lemon Cake": {
        "ingredients": {
            "Batter": 2,
            "Lemon Icing": 1
        },
        "rarity": "Tier 3"
    },
    "Lemon Cookie": {
        "ingredients": {
            "Dough": 1,
            "Lemon": 1,
            "Sugar": 1
        },
        "rarity": "Tier 2"
    },
    "Lemon Cupcake": {
        "ingredients": {
            "Batter": 1,
            "Lemon Icing": 1
        },
        "rarity": "Tier 2"
    },
    "Lemon Ice Cream": {
        "ingredients": {
            "Lemon": 1,
            "Vanilla Ice Cream": 1
        },
        "rarity": "Tier 2"
    },
    "Lemon Ice Pop": {
        "ingredients": {
            "Ice": 1,
            "Lemon": 1,
            "Sugar": 1
        },
        "rarity": "Tier 2"
    },
    "Lemon Icing": {
        "ingredients": {
            "Lemon": 1,
            "Milk": 1,
            "Sugar": 1
        },
        "rarity": "Tier 1"
    },
    "Lemon Pie": {
        "ingredients": {
            "Lemon": 1,
            "Pie Crust": 1
        },
        "rarity": "Tier 2"
    },
    "Lemon Shaved Ice": {
        "ingredients": {
            "Ice": 1,
            "Lemon": 1,
            "Syrup": 1
        },
        "rarity": "Tier 2"
    },
    "Lemonade": {
        "ingredients": {
            "Lemon": 1,
            "Sugar": 1,
            "Water": 1
        },
        "rarity": "Tier 1"
    },
    "Mac and Cheese": {
        "ingredients": {
            "Cheese": 1,
            "Noodles": 1
        },
        "rarity": "Tier 2"
    },
    "Mocha": {
        "ingredients": {
            "Chocolate": 1,
            "Coffee": 1,
            "Milk": 1
        },
        "rarity": "Exotic"
    },
    "Mushroom Pizza": {
        "ingredients": {
            "Mushroom": 1,
            "Pizza": 1
        },
        "rarity": "Exotic"
    },
    "Nachos": {
        "ingredients": {
            "Cheese": 1,
            "Tortilla Chips": 1
        },
        "rarity": "Tier 2"
    },
    "Noodles": {
        "ingredients": {
            "Dough": 1,
            "Egg": 1
        },
        "rarity": "Tier 1"
    },
    "NothingBurger": {
        "ingredients": {
            "Bread": 2
        },
        "rarity": "Secret"
    },
    "Nuclear Power Plant": {
        "ingredients": {
            "Uranium": 2
        },
        "rarity": "Secret"
    },
    "Oden": {
        "ingredients": {
            "Boiled Egg": 1,
            "Fish": 1,
            "Meat": 1
        },
        "rarity": "Tier 1"
    },
    "Olive Oil": {
        "ingredients": {
            "Olives": 2
        },
        "rarity": "Basic"
    },
    "Olive Pizza": {
        "ingredients": {
            "Olives": 1,
            "Pizza": 1
        },
        "rarity": "Tier 3"
    },
    "Omelette": {
        "ingredients": {
            "Egg": 2,
            "Milk": 1
        },
        "rarity": "Tier 1"
    },
    "Onion Rings": {
        "ingredients": {
            "Olive Oil": 1,
            "Onion": 1
        },
        "rarity": "Tier 1"
    },
    "Packed Ice": {
        "ingredients": {
            "Ice": 2
        },
        "rarity": "Secret"
    },
    "Pancakes": {
        "ingredients": {
            "Batter": 1,
            "Butter": 1,
            "Syrup": 1
        },
        "rarity": "Tier 2"
    },
    "Pasta and Meatballs": {
        "ingredients": {
            "Meat": 1,
            "Pasta with Sauce": 1
        },
        "rarity": "Tier 3"
    },
    "Pepperoni Pizza": {
        "ingredients": {
            "Meat": 1,
            "Pizza": 1
        },
        "rarity": "Tier 3"
    },
    "Philadelphia Roll": {
        "ingredients": {
            "Avocado Roll": 1,
            "Cream Cheese": 1
        },
        "rarity": "Exotic"
    },
    "Pie Crust": {
        "ingredients": {
            "Dough": 1,
            "Water": 1
        },
        "rarity": "Tier 1"
    },
    "Pineapple Pizza": {
        "ingredients": {
            "Pineapple": 1,
            "Pizza": 1
        },
        "rarity": "Exotic"
    },
    "Pineapple Soda": {
        "ingredients": {
            "Pineapple": 1,
            "Sugar": 1,
            "Water": 1
        },
        "rarity": "Exotic"
    },
    "Pizza": {
        "ingredients": {
            "Cheese": 1,
            "Dough": 1,
            "Tomato Sauce": 1
        },
        "rarity": "Tier 2"
    },
    "Popcorn": {
        "ingredients": {
            "Butter": 1,
            "Corn": 1
        },
        "rarity": "Exotic"
    },
    "Pretzel": {
        "ingredients": {
            "Dough": 1,
            "Milk": 1
        },
        "rarity": "Tier 1"
    },
    "Ramen": {
        "ingredients": {
            "Broth": 1,
            "Noodles": 1
        },
        "rarity": "Tier 2"
    },
    "Rice Ball": {
        "ingredients": {
            "Rice": 2
        },
        "rarity": "Tier 1"
    },
    "Rice Pudding": {
        "ingredients": {
            "Milk": 1,
            "Rice": 1,
            "Sugar": 1
        },
        "rarity": "Tier 1"
    },
    "Salad": {
        "ingredients": {
            "Lettuce": 1,
            "Olive Oil": 1,
            "Tomato": 1
        },
        "rarity": "Tier 1"
    },
    "Sashimi": {
        "ingredients": {
            "Fish": 2
        },
        "rarity": "Basic"
    },
    "Seawater": {
        "ingredients": {
            "Spices": 2,
            "Water": 1
        },
        "rarity": "Secret"
    },
    "Shrimp": {
        "ingredients": {
            "Fish": 1,
            "Water": 1
        },
        "rarity": "Basic"
    },
    "Spaghetti": {
        "ingredients": {
            "Noodles": 1,
            "Tomato Sauce": 1
        },
        "rarity": "Tier 2"
    },
    "Stuffed Flatbread": {
        "ingredients": {
            "Flatbread": 1,
            "Lettuce": 1,
            "Meat": 1
        },
        "rarity": "Tier 2"
    },
    "Sushi Roll": {
        "ingredients": {
            "Fish": 1,
            "Rice": 2
        },
        "rarity": "Tier 1"
    },
    "Syrup": {
        "ingredients": {
            "Sugar": 1,
            "Water": 1
        },
        "rarity": "Basic"
    },
    "Taco": {
        "ingredients": {
            "Basic Taco": 1,
            "Lettuce": 1,
            "Tomato Sauce": 1
        },
        "rarity": "Tier 3"
    },
    "Tamale": {
        "ingredients": {
            "Broth": 1,
            "Corn": 1,
            "Meat": 1
        },
        "rarity": "Exotic"
    },
    "Tea": {
        "ingredients": {
            "Tea Leaves": 1,
            "Water": 1
        },
        "rarity": "Exotic"
    },
    "Toast": {
        "ingredients": {
            "Bread": 1,
            "Butter": 1
        },
        "rarity": "Tier 2"
    },
    "Tomato Sauce": {
        "ingredients": {
            "Tomato": 2
        },
        "rarity": "Basic"
    },
    "Tortilla": {
        "ingredients": {
            "Flour": 2
        },
        "rarity": "Basic"
    },
    "Tortilla Chips": {
        "ingredients": {
            "Tortilla": 2
        },
        "rarity": "Tier 1"
    },
    "Uranium": {
        "ingredients": {
            "Lemon Cake": 2
        },
        "rarity": "Secret"
    },
    "Vanilla Cupcake": {
        "ingredients": {
            "Batter": 1,
            "Icing": 1
        },
        "rarity": "Tier 2"
    },
    "Vanilla Ice Cream": {
        "ingredients": {
            "Ice": 1,
            "Milk": 1,
            "Sugar": 1
        },
        "rarity": "Tier 1"
    }
};

const recipesLevelsInOrder = [
    "Secret",
    "Exotic",
    "Tier 3",
    "Tier 2",
    "Tier 1",
    "Basic",
    "Unknown"
];

const exoticIngredients = [
    "Apple",
    "Corn",
    "Cherries",
    "Mushroom",
    "Pineapple",
    "Beans",
    "Tea Leaves",
    "Ginger",
    "Avocado"
];

const priceBonuses = {
    "cook": 10,
    "normalIng": 40,
    "exoticIng": 200,
    "quality": 0.15
};

function parseToItem(line) {
    line = line.replace(/\*/g, '');
    if (line.includes(":dollar:") || line.includes('💵')) {
        let priceIndex = -3;
        if (line.includes("ID")) priceIndex -= 2;
        const itemName = line.split(" ").slice(2, priceIndex).join(" ");
        const amount = 1;
        return {itemName: itemName, amount: amount};
    } else {
        let amountIndex = -1;
        if (line.includes("(ID:")) amountIndex -= 2;
        if (line.includes("(Exotic)") || line.includes("(Honey)") ) amountIndex--;
        const itemName = line.split(" ").slice(1, amountIndex).join(" ");
        const amount = parseInt(line.split(" ").slice(amountIndex)[0].slice(1));
        return {itemName: itemName, amount: amount};
    }
}

function parseToItemsJson(message) {
    let userItems = {};
    let erroredLines = {};
    message = message.split('\n');
    for (let i in message) {
        const line = message[i];
        item = parseToItem(line);
        if (item.itemName == "" && isNaN(item.amount)) erroredLines[i] = "item name and amount";
        else if (item.itemName == "") erroredLines[i] = "item name";
        else if (isNaN(item.amount)) erroredLines[i] = "amount";

        if (!(item.itemName in userItems)) userItems[item.itemName] = 0;
        userItems[item.itemName] += item.amount;
    }
    return {userItems: userItems, erroredLines: erroredLines};
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
    return {"ings": unpacked, "cookAmount": cookAmount};
}

Object.filter = (obj, predicate) => 
                  Object.fromEntries(Object.entries(obj).filter(predicate));

function normalAndExoticIngsSeparated(unpackedDish) {
    let normal = Object.filter(unpackedDish, (ing) => !exoticIngredients.includes(ing[0]));
    let exotic = Object.filter(unpackedDish, (ing) => exoticIngredients.includes(ing[0]));
    return {"normal": normal, "exotic": exotic};
}

function dishBaseValue(dishName) {
    unpacked = unpackDish(dishName);
    const ingsSeparated = normalAndExoticIngsSeparated(unpacked["ings"]);
    function sumValues(obj) {
        let sum = 0;
        Object.entries(obj).forEach((entry) => sum += entry[1]);
        return sum;
    }
    const normalIngsAmnt = sumValues(ingsSeparated["normal"]);
    const exoticIngsAmnt = sumValues(ingsSeparated["exotic"]);
    baseValue = priceBonuses["normalIng"] * normalIngsAmnt +
                priceBonuses["exoticIng"] * exoticIngsAmnt +
                priceBonuses["cook"] * unpacked["cookAmount"];
    return baseValue;
}

function dishPrice(dishName, dishLevel=2) {
    baseValue = dishBaseValue(dishName);
    return baseValue + Math.round(baseValue * (dishLevel - 1) * priceBonuses["quality"]);
}

function sendForm(e) {
    // extract items from input
    const userInput = document.getElementById("user-items-input").value;
    const {userItems, erroredLines} = parseToItemsJson(userInput);

    // collect awailable recipes
    let awailableRecipes = {};
    for (var recipeName in recipesJson) {
        const recipe = recipesJson[recipeName];
        // catching recipes with unfilled ingredients
        if (Object.keys(recipe["ingredients"]).length == 0) {
            continue;
        }
        hideSecretRecipesCheckbox = document.getElementById("hide-secret-recipes-checkbox");
        if (hideSecretRecipesCheckbox.checked && recipe["rarity"] == "Secret") {
            continue;
        }
        let canCook = true;
        for (var recipeIngredient in recipe["ingredients"]) {
            requiredAmount = recipe["ingredients"][recipeIngredient];
            userAmount = userItems[recipeIngredient];
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
    sortBy = document.getElementById('recipes-sort-select').value;
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
        rarityEmoji = `<img src="${rarityEmojisPaths[recipe["rarity"]]}" height="13"></img>`;
        line = `• <b>${recipeName}</b> (${rarityEmoji}${recipe["rarity"]} 💵${dishBaseValue(recipeName)}):\n` +
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
            response += `Couldn't extract ${erroredLines[prop]} from line ${parseInt(prop) + 1}\n`;
        }
    }
    const outputBox = document.getElementById("output-textarea");
    outputBox.innerHTML = response;
}
const sendButton = document.getElementById("send-form-btn");
sendButton.addEventListener("click", sendForm);
