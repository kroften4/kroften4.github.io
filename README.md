# Food-Truck-recipes-extractor
A web tool created for Food Truck discord bot made by man_o_valor, which helps you to find out what you can cook based on ingredients + dishes you have

[Food Truck discord server](https://discord.gg/5FcDdcEU2R)
## Usage
- copy your ingredients and dishes from the corresponding commands
- it should look like this (with \*\* around each item name if you're on mobile):
  
  ingredients format:
  
  `🍅 Tomato ×2` / `🍅 **Tomato** ×2`
  
  dishes format:
  
  `💛 :oliveoil: Olive Oil [90 💵 ]` / `💛 :oliveoil: **Olive Oil** [90 💵 ]`
  
  These should look like this by default when you copy, you don't need to change anything
- The whole message when you paste it in on the website should look something like this (order does not matter):
```
🍅 Tomato ×2
🥔 Potato ×1
💛 :oliveoil: Olive Oil [90 💵 ]
🩶 :tortilla: Tortilla [40 💵 ]
```
- in the output you might sometimes see '?' before the recipe name - that means that the recipe has not yet been tested but i'm pretty sure it works (anyway that should be a rare occasion)
## How it works
ingredients format: `text Ingredient Name x123` - line gets split by spaces, for ingredient name the first and the last elements are thrown away, for ingredient amount it gets the last element and throws away the first symbol

dish format: `text text Dish Name text 💵 text` - detected by having a '💵' in the line

Recipes json: I have a Google Sheet which I update first, then by using python I convert it into a formatted json and print it out, then copy it and paste into the code
## Contacts
My discord username: krftn
## Credits
[vg_coder](https://vgcoder.w3spaces.com/) - css and general help
