const puppeteer = require("puppeteer");
const fs = require("fs");

const runScraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // go to page and wait for content to load
    await page.goto(
      "https://roll20.net/compendium/dnd5e/Monsters%20List#content"
    );
    await page.waitForSelector(
      "#pagecontent > div.list-content > div:nth-child(1) > div > a"
    );

    // get list of monster page urls
    const urlList = await page.evaluate(() => {
      const list = document.querySelectorAll(
        "#pagecontent > div.list-content > div.listResult > div > a"
      );
      const urls = [];
      list.forEach((tag) => urls.push(tag.getAttribute("href")));
      return urls;
    });

    // monsterList
    const monsterList = [];

    // go through each monster
    for (let i = 0; i < urlList.length; i++) {
      await page.waitForTimeout(1200);
      // open monster card
      await page.click(
        `#pagecontent > div.list-content > div:nth-child(${
          i + 1
        }) > div.header.inapp-hide.single-hide > div`
      );

      // evaluate to get monster details
      const monster = await page.evaluate(() => {
        const monster = {};

        // select monster card body
        const cards = document.querySelectorAll(
          `#pagecontent > div.list-content > div.listResult > div.card > div > div.body`
        );
        const card = cards[cards.length - 1];

        // get monster name
        const name = card.querySelector("div.name > h1");
        monster.name = name.innerHTML;

        // size, type, alignment
        let subtitle = card.querySelector("div.subtitle");
        subtitle = subtitle.innerText;
        subtitle = subtitle.split(",");
        let sizeType = subtitle[0];
        sizeType = sizeType.split(" ");
        monster.alignment = subtitle[1].trim();
        monster.size = sizeType.shift();
        monster.type = sizeType.length === 1 ? sizeType[0] : sizeType.join(" ");

        // AC, HP, speed
        const list = card.querySelector("div.single-list > ul");
        if (list) {
          const pieces = list.querySelectorAll("li");
          monster.armor_class = pieces[0].innerText.slice(12).trim();
          monster.hit_points = pieces[1].innerText.slice(11).trim();
          monster.speed = pieces[2].innerText.slice(6).trim();
        }

        // attributes
        const attributes = card.querySelector("div.attributes");
        const scores = attributes.querySelectorAll("div > div.attr-num");
        monster.attributes = {};
        monster.attributes.strength = scores[0].innerText;
        monster.attributes.dexterity = scores[1].innerText;
        monster.attributes.constitution = scores[2].innerText;
        monster.attributes.intelligence = scores[3].innerText;
        monster.attributes.wisdom = scores[4].innerText;
        monster.attributes.charisma = scores[5].innerText;

        // saving throws, skills, senses, languages, challenge
        const list2 = card.querySelectorAll("div:nth-child(8) > ul > li");
        if (list2.length) {
          const list2Spans = [];
          for (let i = 0; i < list2.length; i++) {
            list2Spans.push(list2[i].querySelector("span"));
          }
          for (let i = 0; i < list2Spans.length; i++) {
            const name = list2Spans[i].innerText
              .trim()
              .replace(" ", "_")
              .toLowerCase();

            const desc = list2[i].innerText.slice(name.length).trim();
            monster[name] = desc;
          }
        }

        // traits
        const traits = card.querySelectorAll("div.traits > ul > li");
        if (traits.length) {
          const traitsSpans = [];
          for (let i = 0; i < traits.length; i++) {
            traitsSpans.push(traits[i].querySelector("span"));
          }
          monster.traits = [];
          for (let i = 0; i < traitsSpans.length; i++) {
            const trait = {};
            trait.name = traitsSpans[i].innerText.trim();
            trait.desc = traits[i].innerText
              .slice(trait.name.length + 1)
              .trim();
            monster.traits.push(trait);
          }
        }

        // actions
        const actions = card.querySelectorAll("div.actions > ul > li");
        if (actions.length) {
          const actionsSpans = [];
          for (let i = 0; i < actions.length; i++) {
            actionsSpans.push(actions[i].querySelector("span"));
          }
          monster.actions = [];
          for (let i = 0; i < actionsSpans.length; i++) {
            const action = {};
            action.name = actionsSpans[i].innerText.trim();
            action.name = action.name.slice(0, action.name.length - 1);
            action.desc = actions[i].innerText
              .slice(action.name.length + 1)
              .trim();
            monster.actions.push(action);
          }
        }

        // reactions
        const reactions = card.querySelectorAll("div.reactions > ul > li");
        if (reactions.length) {
          const reactionsSpans = [];
          for (let i = 0; i < reactions.length; i++) {
            reactionsSpans.push(reactions[i].querySelector("span"));
          }
          monster.reactions = [];
          for (let i = 0; i < reactionsSpans.length; i++) {
            const reaction = {};
            reaction.name = reactionsSpans[i].innerText.trim();
            reaction.name = reaction.name.slice(0, reaction.name.length - 1);
            reaction.desc = reactions[i].innerText
              .slice(reaction.name.length + 1)
              .trim();
            monster.reactions.push(reaction);
          }
        }

        // legendary actions
        const legendaryActions = card.querySelectorAll(
          "div.legendary-actions > ul > li"
        );
        if (legendaryActions.length) {
          const legendaryActionsSpans = [];
          for (let i = 0; i < legendaryActions.length; i++) {
            legendaryActionsSpans.push(
              legendaryActions[i].querySelector("span")
            );
          }
          monster.legendaryActions = { desc: "", actions: [] };
          const legendaryDesc = card.querySelector(
            "div.legendary-actions > div"
          );
          monster.legendaryActions.desc = legendaryDesc.innerText;
          for (let i = 0; i < legendaryActionsSpans.length; i++) {
            const legendaryAction = {};
            legendaryAction.name = legendaryActionsSpans[i].innerText.trim();
            legendaryAction.name = legendaryAction.name.slice(
              0,
              legendaryAction.name.length - 1
            );
            legendaryAction.desc = legendaryActions[i].innerText
              .slice(legendaryAction.name.length + 1)
              .trim();
            monster.legendaryActions.actions.push(legendaryAction);
          }
        }

        // return new monster
        return monster;
      });

      // add monster to list
      monsterList.push(monster);
    }

    // create file
    fs.writeFileSync("monsters.json", JSON.stringify(monsterList));

    // close browser
    await browser.close();
  } catch (error) {
    // log error and close browser
    console.log(error);
    await browser.close();
  }
};

runScraper();
