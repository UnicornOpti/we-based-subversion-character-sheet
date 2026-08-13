(() => {
  "use strict";

  const STORAGE_KEY = "subversion-browser-character-v1";
  const catalogs = window.SUBVERSION_CATALOGS || { items: [], abilities: [] };

  const CONFIG = {
    attributes: {
      agi: "Agility", wit: "Wit", awr: "Awareness",
      bwn: "Brawn", cha: "Charisma", wil: "Will"
    },
    attributeAbbreviations: { agi: "AGI", wit: "WIT", awr: "AWR", bwn: "BWN", cha: "CHA", wil: "WIL" },
    skills: {
      art: "Arts", dec: "Deception", hum: "Humanities", inf: "Influence",
      mag: "Magic Arts", mel: "Melee Combat", obs: "Observation", phy: "Physicality",
      pil: "Piloting", ran: "Ranged Combat", sci: "Science", tec: "Tech"
    },
    skillDefaults: {
      art: "cha", dec: "cha", hum: "wit", inf: "cha", mag: "wil", mel: "agi",
      obs: "awr", phy: "agi", pil: "awr", ran: "agi", sci: "wit", tec: "wit"
    },
    lineages: {
      dwarven: "Dwarven", elven: "Elven", goblin: "Goblin", harmaku: "Harmaku",
      human: "Human", orc: "Orc", yettin: "Yettin"
    },
    lineageOptions: {
      dwarven: {
        toxinResistant: "Toxin Resistant", lessonsFromTheGround: "Lessons from the Ground",
        small: "Small", monstrousHeritage: "Monstrous Heritage", unshakable: "Unshakable"
      },
      elven: {
        gracefulAgility: "Graceful Agility", benefitsOfLongLife: "Benefits of Long Life",
        haleIfNotHearty: "Hale if not Hearty", keenEye: "Keen Eye", faeSight: "Fae Sight"
      },
      goblin: {
        goblinScamper: "Goblin Scamper", quickMindQuickFeet: "Quick Mind, Quick Feet",
        sensitiveEars: "Sensitive Ears", longFingers: "Long Fingers", diminutive: "Diminutive"
      },
      harmaku: {
        usefulWings: "Useful Wings", deadlyTalons: "Deadly Talons", poiseAndPlumage: "Poise and Plumage",
        avianAgility: "Avian Agility", keenEyes: "Keen Eyes"
      },
      human: {
        forceOfWill: "Force of Will", residualInstincts: "Residual Instincts", marathoner: "Marathoner",
        teamOriented: "Team-Oriented", driven: "Driven"
      },
      orc: {
        broadShoulders: "Broad Shoulders", keen: "Keen", destinyThroughPassion: "Destiny through Passion",
        porcineSnout: "Porcine Snout", thickSkinned: "Thick Skinned"
      },
      yettin: {
        yettinSize: "Yettin Size", ogreFeatures: "Ogre Features", naturalWeaponsClaws: "Natural Weapons (Claws)",
        yetiFeatures: "Yeti Features", divergentHeritage: "Divergent Heritage"
      }
    },
    lineageRules: {
      toxinResistant: "+4 to defenses when resisting Toxins or Metabolic Damage.",
      lessonsFromTheGround: "Brawn has a minimum rank of 2.",
      small: "+2 to Physicality tests for hiding or navigating tight spaces.",
      monstrousHeritage: "Unarmed attacks deal 2d6 + Brawn damage and have AP 1.",
      unshakable: "+1 Vigilance and +1 maximum Grit.",
      gracefulAgility: "Agility has a minimum rank of 2.",
      benefitsOfLongLife: "Gain Reliable 2 when using a skill untrained.",
      haleIfNotHearty: "+10 maximum Health.",
      keenEye: "+1 die to Observation tests.",
      faeSight: "+3 on Shinesight tests.",
      goblinScamper: "Agility has a minimum rank of 2.",
      quickMindQuickFeet: "May take a Backup Action before initiative when not caught unaware.",
      sensitiveEars: "+1 die to Observation tests.",
      longFingers: "+1 die and Augment 1 on tests requiring fine manipulation.",
      diminutive: "+2 to Physicality tests for hiding or navigating tight spaces.",
      usefulWings: "+1 die to Physicality tests involving balance or jumping; may permit gliding.",
      deadlyTalons: "Unarmed attacks deal 2d6 + Brawn damage and have AP 1.",
      poiseAndPlumage: "Charisma has a minimum rank of 2.",
      avianAgility: "Agility has a minimum rank of 2.",
      keenEyes: "+1 die to Observation tests.",
      forceOfWill: "Will has a minimum rank of 2.",
      residualInstincts: "+2 Vigilance.",
      marathoner: "+2 dice to Physicality when running.",
      teamOriented: "Gain Reliable 3 when helping in a Teamwork Test.",
      driven: "+2 maximum Grit.",
      broadShoulders: "Brawn has a minimum rank of 2.",
      keen: "Awareness has a minimum rank of 2.",
      destinyThroughPassion: "+2 Aegis.",
      porcineSnout: "+3 to smell-related Observation tests.",
      thickSkinned: "+1 Armor.",
      yettinSize: "Brawn has a minimum rank of 2.",
      ogreFeatures: "+2 Vigilance.",
      naturalWeaponsClaws: "Unarmed attacks deal 2d6 + Brawn damage and have AP 1.",
      yetiFeatures: "+1 Armor; situational Reliable 3 or Dulled for extreme temperatures.",
      divergentHeritage: "Will has a minimum rank of 2."
    },
    origins: {
      altaipheran: "Altaipheran", babylonian: "Babylonian", chaldani: "Chaldani",
      churuqian: "Churuqian", deBroceliande: "de Broceliande", ghassulian: "Ghassulian (Tulko)", custom: "Custom"
    },
    backgrounds: {
      agriculturist: "Agriculturist", apprenticeCaster: "Apprentice Caster", artist: "Artist",
      baru: "Baru or Baru-Born", bootedOut: "Booted Out", criminal: "Criminal",
      downtroddenRefugee: "Downtrodden/Refugee", explorer: "Explorer", influential: "Influential",
      mercenarySoldier: "Mercenary or Soldier", rebel: "Rebel", wageSlave: "Wage Slave",
      yojinApprentice: "Yojin Apprentice", custom: "Custom"
    },
    castes: {
      undercity: "Undercity", lower: "Lower", lowerMiddle: "Lower-Middle",
      upperMiddle: "Upper-Middle", upper: "Upper", elite: "Elite"
    },
    casteFortune: { undercity: 10, lower: 5, lowerMiddle: 0, upperMiddle: -10, upper: -30, elite: -125 },
    ideologies: {
      neoAnarchist: "Neo-Anarchist", aider: "Aider", democraticRevolutionist: "Democratic Revolutionist",
      sunlighter: "Sunlighter", consecrated: "Consecrated", technologist: "Technologist",
      enlightened: "Enlightened", unbound: "Unbound", greaser: "Greaser",
      militaryRevolutionist: "Military Revolutionist", independent: "Independent", cynic: "Cynic"
    }
  };

  const FLOOR_EFFECTS = {
    lessonsFromTheGround: ["bwn", 2], gracefulAgility: ["agi", 2], goblinScamper: ["agi", 2],
    poiseAndPlumage: ["cha", 2], avianAgility: ["agi", 2], forceOfWill: ["wil", 2],
    broadShoulders: ["bwn", 2], keen: ["awr", 2], yettinSize: ["bwn", 2], divergentHeritage: ["wil", 2]
  };

  const uid = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const number = (value, fallback = 0) => Number.isFinite(Number(value)) ? Math.trunc(Number(value)) : fallback;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const escapeHTML = value => String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

  function defaultSkills() {
    return Object.fromEntries(Object.keys(CONFIG.skills).map(key => [key, { trained: false, rank: 0, misc: 0, reliable: 0, dulled: 0 }]));
  }

  function defaultState() {
    return {
      format: "subversion-browser-character",
      version: 2,
      name: "",
      portrait: { dataUrl: "", fileName: "" },
      pronouns: "",
      lineage: "",
      lineageOption: "",
      origin: "",
      originCustom: "",
      background: "",
      backgroundCustom: "",
      caste: "lowerMiddle",
      ideology: "",
      debt: "",
      values: ["", "", ""],
      attributes: { agi: 0, wit: 0, awr: 0, bwn: 0, cha: 0, wil: 0 },
      modifiers: { guard: 0, vigilance: 0, aegis: 0, initiative: 0, health: 0, animity: 0, grit: 0, armor: 0, adamant: 0 },
      resources: { health: { current: 12 }, animity: { current: 12 }, grit: { current: 6 } },
      consequences: 0,
      impulses: { names: "", triggers: "", downtime: "" },
      rollModifiers: { attribute: "", diceModifier: 0, reliable: 0, dulled: 0, inspired: false },
      skills: defaultSkills(),
      biography: "",
      items: [],
      abilities: []
    };
  }

  function mergeState(base, update) {
    if (!update || typeof update !== "object") return base;
    if (Array.isArray(base)) return Array.isArray(update) ? update : base;
    const result = { ...base };
    for (const [key, value] of Object.entries(update)) {
      if (value && typeof value === "object" && !Array.isArray(value) && base[key] && typeof base[key] === "object") {
        result[key] = mergeState(base[key], value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return mergeState(defaultState(), saved);
    } catch {
      return defaultState();
    }
  }

  let state = loadState();
  let saveTimer;

  function getPath(object, path) {
    return path.split(".").reduce((value, key) => value?.[key], object);
  }

  function setPath(object, path, value) {
    const keys = path.split(".");
    const last = keys.pop();
    const parent = keys.reduce((value, key) => value[key], object);
    parent[last] = value;
  }

  function scheduleSave() {
    const status = document.getElementById("save-status");
    status.textContent = "Saving…";
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        status.textContent = "Saved locally";
      } catch (error) {
        console.error("Unable to save character", error);
        status.textContent = "Could not save — export a backup";
      }
    }, 220);
  }

  function renderPortrait() {
    const image = document.getElementById("portrait-image");
    const placeholder = document.getElementById("portrait-placeholder");
    const remove = document.getElementById("remove-portrait");
    const hasPortrait = Boolean(state.portrait?.dataUrl);
    if (hasPortrait) image.src = state.portrait.dataUrl;
    else image.removeAttribute("src");
    image.hidden = !hasPortrait;
    placeholder.hidden = hasPortrait;
    remove.hidden = !hasPortrait;
  }

  function loadImageFile(file) {
    return new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(image);
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("That image could not be opened."));
      };
      image.src = objectUrl;
    });
  }

  async function makePortraitData(file) {
    if (!file.type.startsWith("image/")) throw new Error("Choose a JPG, PNG, WebP, or GIF image.");
    if (file.size > 20 * 1024 * 1024) throw new Error("Choose an image smaller than 20 MB.");
    const image = await loadImageFile(file);
    const sourceWidth = image.naturalWidth || image.width;
    const sourceHeight = image.naturalHeight || image.height;
    if (!sourceWidth || !sourceHeight) throw new Error("That image has no readable dimensions.");

    const targetRatio = 3 / 4;
    const sourceRatio = sourceWidth / sourceHeight;
    let sx = 0;
    let sy = 0;
    let sw = sourceWidth;
    let sh = sourceHeight;
    if (sourceRatio > targetRatio) {
      sw = sourceHeight * targetRatio;
      sx = (sourceWidth - sw) / 2;
    } else {
      sh = sourceWidth / targetRatio;
      sy = (sourceHeight - sh) / 2;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 800;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) throw new Error("Your browser could not prepare that image.");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    let dataUrl = canvas.toDataURL("image/webp", 0.82);
    if (!dataUrl.startsWith("data:image/webp") || dataUrl.length > 900000) {
      const smaller = document.createElement("canvas");
      smaller.width = 450;
      smaller.height = 600;
      const smallerContext = smaller.getContext("2d", { alpha: false });
      smallerContext.fillStyle = "#f4f0e6";
      smallerContext.fillRect(0, 0, smaller.width, smaller.height);
      smallerContext.drawImage(canvas, 0, 0, smaller.width, smaller.height);
      dataUrl = smaller.toDataURL("image/jpeg", 0.76);
    }
    if (dataUrl.length > 1200000) throw new Error("That image remains too large after resizing. Try a simpler or smaller image.");
    return dataUrl;
  }

  function fillSelect(select, choices, placeholder, selected = "") {
    select.innerHTML = `<option value="">${escapeHTML(placeholder)}</option>` + Object.entries(choices)
      .map(([value, label]) => `<option value="${escapeHTML(value)}">${escapeHTML(label)}</option>`).join("");
    select.value = selected || "";
  }

  function initializeChoiceSelects() {
    fillSelect(document.getElementById("lineage"), CONFIG.lineages, "Select a Lineage", state.lineage);
    fillSelect(document.getElementById("origin"), CONFIG.origins, "Select an Origin", state.origin);
    fillSelect(document.getElementById("background"), CONFIG.backgrounds, "Select a Background", state.background);
    fillSelect(document.getElementById("caste"), CONFIG.castes, "Select a Caste", state.caste);
    fillSelect(document.getElementById("ideology"), CONFIG.ideologies, "Select an Ideology", state.ideology);
    fillSelect(document.getElementById("roll-attribute"), CONFIG.attributes, "Use the skill's linked attribute", state.rollModifiers.attribute);
    renderLineageOptions();
  }

  function renderLineageOptions() {
    fillSelect(
      document.getElementById("lineage-option"),
      CONFIG.lineageOptions[state.lineage] || {},
      "Select an Option",
      state.lineageOption
    );
    document.getElementById("lineage-rule").textContent = CONFIG.lineageRules[state.lineageOption] || "";
  }

  function syncStaticInputs() {
    document.querySelectorAll("[data-path]").forEach(input => {
      const value = getPath(state, input.dataset.path);
      if (input.type === "checkbox") input.checked = Boolean(value);
      else input.value = value ?? "";
    });
    document.getElementById("origin-custom-wrap").hidden = state.origin !== "custom";
    document.getElementById("background-custom-wrap").hidden = state.background !== "custom";
  }

  function deriveStats() {
    const option = state.lineageOption;
    const floor = FLOOR_EFFECTS[option];
    if (floor) {
      const [attribute, minimum] = floor;
      if (number(state.attributes[attribute]) < minimum) {
        state.attributes[attribute] = minimum;
        const input = document.querySelector(`[data-path="attributes.${attribute}"]`);
        if (input) input.value = minimum;
      }
    }

    const a = key => number(state.attributes[key]);
    const m = key => number(state.modifiers[key]);
    const bonus = { guard: 0, vigilance: 0, aegis: 0, health: 0, animity: 0, grit: 0, armor: 0, adamant: 0 };
    if (option === "unshakable") { bonus.vigilance += 1; bonus.grit += 1; }
    if (option === "haleIfNotHearty") bonus.health += 10;
    if (option === "residualInstincts") bonus.vigilance += 2;
    if (option === "driven") bonus.grit += 2;
    if (option === "destinyThroughPassion") bonus.aegis += 2;
    if (["thickSkinned", "yetiFeatures"].includes(option)) bonus.armor += 1;
    if (option === "ogreFeatures") bonus.vigilance += 2;
    if (state.ideology === "cynic") bonus.vigilance += 1;

    const derived = {
      guard: a("agi") * 2 + 8 + m("guard") + bonus.guard,
      vigilance: a("wit") * 2 + 8 + m("vigilance") + bonus.vigilance,
      aegis: a("awr") * 2 + 8 + m("aegis") + bonus.aegis,
      initiative: a("agi") * 3 + a("awr") * 2 + a("wit") + m("initiative"),
      armor: m("armor") + bonus.armor,
      adamant: m("adamant") + bonus.adamant,
      health: a("bwn") * 4 + 12 + m("health") + bonus.health,
      animity: a("cha") * 4 + 12 + m("animity") + bonus.animity,
      grit: a("wil") + 6 + m("grit") + bonus.grit
    };

    for (const key of ["guard", "vigilance", "aegis", "initiative", "armor", "adamant"]) {
      document.getElementById(`stat-${key}`).textContent = derived[key];
    }
    for (const key of ["health", "animity", "grit"]) document.getElementById(`max-${key}`).textContent = derived[key];

    document.getElementById("lineage-rule").textContent = CONFIG.lineageRules[option] || "";
    const casteFortune = CONFIG.casteFortune[state.caste];
    document.getElementById("caste-note").textContent = Number.isFinite(casteFortune)
      ? `Starting Fortune adjustment: ${casteFortune > 0 ? "+" : ""}${casteFortune}` : "";
    document.getElementById("origin-custom-wrap").hidden = state.origin !== "custom";
    document.getElementById("background-custom-wrap").hidden = state.background !== "custom";
    renderConsequenceBoxes();
    refreshSkillValues();
    return derived;
  }

  function skillPoolDetails(skillKey) {
    const skill = state.skills[skillKey];
    const trained = Boolean(skill.trained);
    const lineageBonus = skillKey === "obs" && ["keenEye", "sensitiveEars", "keenEyes"].includes(state.lineageOption) ? 1 : 0;
    const nominalPool = 3 + (trained ? Math.max(0, number(skill.rank)) : 0) + number(state.rollModifiers.diceModifier) + lineageBonus;
    return {
      trained,
      lineageBonus,
      nominalPool,
      pool: Math.max(3, nominalPool),
      missingDiceDulled: Math.max(0, 3 - nominalPool)
    };
  }

  function renderSkills() {
    const body = document.getElementById("skills-body");
    body.innerHTML = Object.entries(CONFIG.skills).map(([key, label]) => {
      const skill = state.skills[key] || (state.skills[key] = { trained: false, rank: 0, misc: 0, reliable: 0, dulled: 0 });
      const attrKey = CONFIG.skillDefaults[key];
      return `<tr data-skill="${key}">
        <td><strong>${escapeHTML(label)}</strong></td>
        <td>(${CONFIG.attributeAbbreviations[attrKey]})</td>
        <td><input aria-label="${escapeHTML(label)} trained" type="checkbox" data-skill-field="trained" ${skill.trained ? "checked" : ""}></td>
        <td><input aria-label="${escapeHTML(label)} rank" type="number" min="0" max="6" data-skill-field="rank" value="${number(skill.rank)}"></td>
        <td class="skill-attribute-value">0</td>
        <td><input aria-label="${escapeHTML(label)} miscellaneous modifier" type="number" data-skill-field="misc" value="${number(skill.misc)}"></td>
        <td><button type="button" class="skill-roll" data-roll-skill="${key}">Roll</button></td>
      </tr>`;
    }).join("");
    refreshSkillValues();
  }

  function refreshSkillValues() {
    document.querySelectorAll("#skills-body tr[data-skill]").forEach(row => {
      const key = row.dataset.skill;
      const attrKey = state.rollModifiers.attribute || CONFIG.skillDefaults[key];
      const attrValue = number(state.attributes[attrKey]);
      const skill = state.skills[key];
      const pool = skillPoolDetails(key).pool;
      const modifier = attrValue + number(skill.misc);
      row.querySelector(".skill-attribute-value").textContent = attrValue;
      row.querySelector(".skill-roll").textContent = `${pool}d6, keep 3 ${modifier >= 0 ? "+" : "−"}${Math.abs(modifier)}`;
    });
  }

  function renderConsequenceBoxes() {
    document.getElementById("consequence-boxes").innerHTML = [1,2,3,4,5].map(index =>
      `<button type="button" class="consequence-box ${state.consequences >= index ? "active" : ""}" data-consequence="${index}" aria-label="Set ${index} consequence${index === 1 ? "" : "s"}" aria-pressed="${state.consequences >= index}">${state.consequences >= index ? "✓" : ""}</button>`
    ).join("");
  }

  function buildCatalogPickers() {
    const itemSelect = document.getElementById("item-picker");
    itemSelect.innerHTML = `<option value="">Choose an item...</option>` + catalogs.items.map(category =>
      `<optgroup label="${escapeHTML(category.label)}">${category.items.map(item =>
        `<option value="${escapeHTML(item.id)}">${escapeHTML(item.name)} (${item.cost} Fortune)</option>`
      ).join("")}</optgroup>`
    ).join("");
    renderAbilityPicker();
  }

  function renderAbilityPicker(filter = "") {
    const query = filter.trim().toLocaleLowerCase();
    const select = document.getElementById("ability-picker");
    let count = 0;
    const groups = catalogs.abilities.map(category => {
      const items = category.items.filter(entry => !query || `${entry.name} ${category.label}`.toLocaleLowerCase().includes(query));
      count += items.length;
      if (!items.length) return "";
      return `<optgroup label="${escapeHTML(category.label)}">${items.map(entry =>
        `<option value="${escapeHTML(entry.id)}">${escapeHTML(entry.name)} — p. ${entry.page} — ${escapeHTML(entry.cost)}</option>`
      ).join("")}</optgroup>`;
    }).join("");
    select.innerHTML = `<option value="">${count ? `Choose an ability (${count} shown)...` : "No matching abilities"}</option>${groups}`;
  }

  function findCatalogItem(id) {
    for (const category of catalogs.items) {
      const entry = category.items.find(item => item.id === id);
      if (entry) return { ...entry, category: category.label };
    }
    return null;
  }

  function findCatalogAbility(id) {
    for (const category of catalogs.abilities) {
      const entry = category.items.find(item => item.id === id);
      if (entry) return { ...entry, paradigm: category.label };
    }
    return null;
  }

  function renderItems() {
    const body = document.getElementById("items-body");
    body.innerHTML = state.items.map((item, index) => `<tr>
      <td><strong>${escapeHTML(item.name)}</strong>${item.roll?.diceNum ? `<br><button type="button" class="secondary roll-item" data-index="${index}">Roll ${escapeHTML(item.damage || "effect")}</button>` : ""}</td>
      <td><input type="number" min="0" value="${number(item.quantity, 1)}" data-item-quantity="${index}" aria-label="${escapeHTML(item.name)} quantity"></td>
      <td>${escapeHTML(item.category)}</td>
      <td>${escapeHTML(item.cost)}</td>
      <td class="rules-cell">${escapeHTML(item.rules)}</td>
      <td><button type="button" class="danger delete-entry" data-delete-item="${index}" aria-label="Delete ${escapeHTML(item.name)}">×</button></td>
    </tr>`).join("");
    document.getElementById("items-empty").hidden = state.items.length > 0;
  }

  function renderAbilities() {
    const body = document.getElementById("abilities-body");
    body.innerHTML = state.abilities.map((ability, index) => `<tr>
      <td><strong>${escapeHTML(ability.name)}</strong></td>
      <td>${escapeHTML(ability.paradigm)}</td>
      <td>${ability.page || ""}</td>
      <td>${escapeHTML(ability.cost)}</td>
      <td class="rules-cell">${escapeHTML(ability.effect)}</td>
      <td><button type="button" class="danger delete-entry" data-delete-ability="${index}" aria-label="Delete ${escapeHTML(ability.name)}">×</button></td>
    </tr>`).join("");
    document.getElementById("abilities-empty").hidden = state.abilities.length > 0;
  }

  function keptDice(dice) {
    return dice.map((value, index) => ({ value, index }))
      .sort((a, b) => (b.value - a.value) || (a.index - b.index)).slice(0, 3);
  }

  function scoreDice(dice, dulled) {
    const kept = keptDice(dice);
    return {
      critical: dulled === 0 && kept.length === 3 && kept.every(die => die.value === 6),
      keptTotal: kept.reduce((sum, die) => sum + die.value, 0),
      allTotal: dice.reduce((sum, die) => sum + die, 0)
    };
  }

  function betterScore(left, right) {
    if (left.critical !== right.critical) return left.critical ? 1 : -1;
    if (left.keptTotal !== right.keptTotal) return left.keptTotal - right.keptTotal;
    return left.allTotal - right.allTotal;
  }

  function applyKeywords(rawDice, { dulled, inspired, reliable }) {
    let dice = [...rawDice];
    if (dulled > 0) {
      const cap = Math.max(1, 6 - dulled);
      dice = dice.map(value => Math.min(value, cap));
    }
    if (inspired) {
      const candidates = dice.map((_, index) => {
        const candidate = [...dice];
        if (candidate[index] < 6) candidate[index] += 1;
        return candidate;
      });
      dice = candidates.reduce((best, candidate) => betterScore(scoreDice(candidate, dulled), scoreDice(best, dulled)) > 0 ? candidate : best, dice);
    }
    if (reliable > 0) dice = dice.map(value => Math.max(value, reliable));
    return dice;
  }

  function rollSkill(skillKey) {
    const skill = state.skills[skillKey];
    const poolDetails = skillPoolDetails(skillKey);
    const rawDice = Array.from({ length: poolDetails.pool }, () => Math.floor(Math.random() * 6) + 1);
    const attrKey = state.rollModifiers.attribute || CONFIG.skillDefaults[skillKey];
    const attribute = number(state.attributes[attrKey]);
    const lineageReliable = state.lineageOption === "benefitsOfLongLife" && !poolDetails.trained ? 2 : 0;
    const reliable = clamp(Math.max(number(state.rollModifiers.reliable), number(skill.reliable), lineageReliable), 0, 6);
    const dulled = Math.max(0,
      number(state.consequences) +
      (poolDetails.trained ? 0 : 2) +
      poolDetails.missingDiceDulled +
      number(state.rollModifiers.dulled) +
      number(skill.dulled)
    );
    const inspired = Boolean(state.rollModifiers.inspired);
    const adjustedDice = applyKeywords(rawDice, { dulled, inspired, reliable });
    const kept = keptDice(adjustedDice);
    const keptTotal = kept.reduce((sum, die) => sum + die.value, 0);
    const modifier = number(skill.misc);
    const total = keptTotal + attribute + modifier;
    const critical = dulled === 0 && kept.every(die => die.value === 6);
    const notes = [
      !poolDetails.trained ? "Untrained" : "",
      state.consequences ? `${state.consequences} from Consequences` : "",
      poolDetails.missingDiceDulled ? `${poolDetails.missingDiceDulled} from reduced dice pool` : "",
      reliable ? `Reliable ${reliable}` : "",
      inspired ? "Inspired" : "",
      dulled ? `${dulled} Dulled instance${dulled === 1 ? "" : "s"}` : ""
    ].filter(Boolean);
    showRoll({
      label: `${CONFIG.skills[skillKey]} Test`, rawDice, adjustedDice,
      keptIndices: kept.map(die => die.index), keptTotal, attribute,
      attributeLabel: CONFIG.attributes[attrKey], modifier, total,
      outcome: critical ? "Critical Success" : "Total", notes
    });
  }

  function showRoll(result) {
    const adjusted = result.adjustedDice.some((value, index) => value !== result.rawDice[index]);
    const renderDice = dice => dice.map((value, index) => `<span class="die ${result.keptIndices.includes(index) ? "kept" : ""}">${value}</span>`).join("");
    document.getElementById("roll-result").innerHTML = `<article class="roll-card">
      <h2>${escapeHTML(result.label)}</h2>
      <div class="dice-row"><strong>Rolled:</strong>${renderDice(result.rawDice)}</div>
      ${adjusted ? `<div class="dice-row"><strong>Adjusted:</strong>${renderDice(result.adjustedDice)}</div>` : ""}
      <p>Kept ${result.keptTotal} + ${escapeHTML(result.attributeLabel)} ${result.attribute} ${result.modifier >= 0 ? "+" : "−"} modifier ${Math.abs(result.modifier)}</p>
      <div class="roll-total"><span>${escapeHTML(result.outcome)}</span><strong>${result.total}</strong></div>
      <p class="roll-notes">${result.notes.map(escapeHTML).join(" • ") || "No special modifiers"}</p>
    </article>`;
    document.getElementById("roll-dialog").showModal();
  }

  function rollItem(index) {
    const item = state.items[index];
    const diceNum = Math.max(0, number(item.roll?.diceNum));
    const rawDice = Array.from({ length: diceNum }, () => Math.floor(Math.random() * 6) + 1);
    let bonus = 0;
    const formula = item.roll?.diceBonus || "";
    if (formula.includes("floor(@bwn.value/2)")) bonus = Math.floor(number(state.attributes.bwn) / 2);
    else if (formula.includes("@bwn.value")) bonus = number(state.attributes.bwn);
    else bonus = number(formula.replace(/[^0-9-]/g, ""), 0);
    const diceTotal = rawDice.reduce((sum, die) => sum + die, 0);
    showRoll({
      label: item.name, rawDice, adjustedDice: rawDice, keptIndices: rawDice.map((_, i) => i),
      keptTotal: diceTotal, attribute: bonus, attributeLabel: "Bonus", modifier: 0,
      total: diceTotal + bonus, outcome: item.damage || "Item Roll", notes: [item.rules]
    });
  }

  function openEntryDialog(type) {
    const isAbility = type === "ability";
    document.getElementById("entry-type").value = type;
    document.getElementById("entry-dialog-title").textContent = isAbility ? "Add Custom Ability" : "Add Custom Item";
    document.getElementById("entry-group-label").firstChild.textContent = isAbility ? "Paradigm" : "Category";
    document.getElementById("entry-page-label").hidden = !isAbility;
    document.getElementById("entry-form").reset();
    document.getElementById("entry-type").value = type;
    document.getElementById("entry-dialog").showModal();
  }

  function renderAll() {
    initializeChoiceSelects();
    syncStaticInputs();
    renderPortrait();
    renderSkills();
    buildCatalogPickers();
    renderItems();
    renderAbilities();
    deriveStats();
  }

  document.addEventListener("input", event => {
    const input = event.target.closest("[data-path]");
    if (!input) return;
    let value = input.type === "checkbox" ? input.checked : input.value;
    if (input.type === "number") value = number(value);
    setPath(state, input.dataset.path, value);
    deriveStats();
    scheduleSave();
  });

  document.addEventListener("change", event => {
    const input = event.target.closest("[data-path]");
    if (!input) return;
    if (input.dataset.path === "lineage") {
      state.lineageOption = "";
      renderLineageOptions();
    }
    deriveStats();
    scheduleSave();
  });

  document.getElementById("skills-body").addEventListener("input", event => {
    const input = event.target.closest("[data-skill-field]");
    if (!input) return;
    const key = input.closest("tr").dataset.skill;
    const value = input.type === "checkbox" ? input.checked : number(input.value);
    state.skills[key][input.dataset.skillField] = value;
    refreshSkillValues();
    scheduleSave();
  });

  document.getElementById("skills-body").addEventListener("click", event => {
    const button = event.target.closest("[data-roll-skill]");
    if (button) rollSkill(button.dataset.rollSkill);
  });

  document.getElementById("consequence-boxes").addEventListener("click", event => {
    const button = event.target.closest("[data-consequence]");
    if (!button) return;
    const selected = number(button.dataset.consequence);
    state.consequences = state.consequences === selected ? selected - 1 : selected;
    deriveStats();
    scheduleSave();
  });

  document.querySelectorAll(".tab-button").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(tab => tab.classList.toggle("active", tab === button));
    document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.toggle("active", panel.dataset.panel === button.dataset.tab));
  }));

  document.getElementById("reset-roll-modifiers").addEventListener("click", () => {
    state.rollModifiers = { attribute: "", diceModifier: 0, reliable: 0, dulled: 0, inspired: false };
    syncStaticInputs();
    deriveStats();
    scheduleSave();
  });

  document.getElementById("choose-portrait-from-frame").addEventListener("click", () => {
    document.getElementById("portrait-file").click();
  });

  document.getElementById("portrait-file").addEventListener("change", async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const status = document.getElementById("save-status");
    status.textContent = "Preparing portrait…";
    try {
      const dataUrl = await makePortraitData(file);
      state.portrait = { dataUrl, fileName: file.name || "portrait" };
      renderPortrait();
      scheduleSave();
    } catch (error) {
      status.textContent = "Portrait not changed";
      alert(error.message || "The portrait could not be added.");
    } finally {
      event.target.value = "";
    }
  });

  document.getElementById("remove-portrait").addEventListener("click", () => {
    state.portrait = { dataUrl: "", fileName: "" };
    renderPortrait();
    scheduleSave();
  });

  document.getElementById("ability-search").addEventListener("input", event => renderAbilityPicker(event.target.value));

  document.getElementById("add-item").addEventListener("click", () => {
    const select = document.getElementById("item-picker");
    const entry = findCatalogItem(select.value);
    if (!entry) return select.focus();
    state.items.push({
      uid: uid(), coreId: entry.id, name: entry.name, quantity: 1, category: entry.category,
      cost: entry.cost, rules: entry.summary, damage: entry.damage || "", roll: entry.roll || null
    });
    select.value = "";
    renderItems();
    scheduleSave();
  });

  document.getElementById("add-ability").addEventListener("click", () => {
    const select = document.getElementById("ability-picker");
    const entry = findCatalogAbility(select.value);
    if (!entry) return select.focus();
    state.abilities.push({ uid: uid(), coreId: entry.id, name: entry.name, paradigm: entry.paradigm, page: entry.page, cost: entry.cost, effect: entry.effect });
    select.value = "";
    renderAbilities();
    scheduleSave();
  });

  document.getElementById("items-body").addEventListener("input", event => {
    const input = event.target.closest("[data-item-quantity]");
    if (!input) return;
    state.items[number(input.dataset.itemQuantity)].quantity = Math.max(0, number(input.value));
    scheduleSave();
  });

  document.getElementById("items-body").addEventListener("click", event => {
    const deleteButton = event.target.closest("[data-delete-item]");
    const rollButton = event.target.closest(".roll-item");
    if (deleteButton) {
      state.items.splice(number(deleteButton.dataset.deleteItem), 1);
      renderItems();
      scheduleSave();
    } else if (rollButton) rollItem(number(rollButton.dataset.index));
  });

  document.getElementById("abilities-body").addEventListener("click", event => {
    const button = event.target.closest("[data-delete-ability]");
    if (!button) return;
    state.abilities.splice(number(button.dataset.deleteAbility), 1);
    renderAbilities();
    scheduleSave();
  });

  document.getElementById("add-custom-item").addEventListener("click", () => openEntryDialog("item"));
  document.getElementById("add-custom-ability").addEventListener("click", () => openEntryDialog("ability"));
  document.getElementById("entry-cancel").addEventListener("click", () => document.getElementById("entry-dialog").close());
  document.getElementById("entry-form").addEventListener("submit", event => {
    event.preventDefault();
    const type = document.getElementById("entry-type").value;
    const name = document.getElementById("entry-name").value.trim();
    const group = document.getElementById("entry-group").value.trim();
    const cost = document.getElementById("entry-cost").value.trim();
    const effect = document.getElementById("entry-effect").value.trim();
    if (type === "ability") {
      state.abilities.push({ uid: uid(), name, paradigm: group, page: number(document.getElementById("entry-page").value), cost, effect });
      renderAbilities();
    } else {
      state.items.push({ uid: uid(), name, quantity: 1, category: group, cost, rules: effect, roll: null });
      renderItems();
    }
    document.getElementById("entry-dialog").close();
    scheduleSave();
  });

  document.getElementById("new-character").addEventListener("click", () => {
    if (!confirm("Start a new character? Export this character first if you want a separate backup.")) return;
    state = defaultState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderAll();
    document.getElementById("save-status").textContent = "New character saved locally";
  });

  document.getElementById("export-character").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    const safeName = (state.name || "subversion-character").toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    link.href = URL.createObjectURL(blob);
    link.download = `${safeName || "subversion-character"}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  });

  document.getElementById("import-character").addEventListener("change", async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const imported = JSON.parse(await file.text());
      if (imported.format !== "subversion-browser-character") throw new Error("This is not a Subversion browser character file.");
      state = mergeState(defaultState(), imported);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      renderAll();
      document.getElementById("save-status").textContent = "Imported and saved locally";
    } catch (error) {
      alert(error.message || "The character file could not be imported.");
    } finally {
      event.target.value = "";
    }
  });

  document.getElementById("print-character").addEventListener("click", () => window.print());

  renderAll();
})();
