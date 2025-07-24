class Pokemon {
  // #region Attributes
  name;
  imgDefault;
  imgShiny;
  id;
  description;
  types;
  color;
  height;
  abilities;
  habitat;
  generation;
  growthRate;
  basestats;
  evolution;
  bgClass;
  // #endregion

  constructor({
    pName,
    pDefSprite,
    pShinySprite,
    pId,
    pDesc,
    pTypes = [],
    pColor,
    pHeight,
    pAbilities = [],
    pHabitat,
    pGeneration,
    pGrowthRate,
    pBaseStats = {
      hp: 0,
      attack: 0,
      defense: 0,
      specAttack: 0,
      specDefense: 0,
      speed: 0,
    },
  } = {}) {
    this.id = pId;
    this.name = pName;
    this.imgDefault = pDefSprite;
    this.imgShiny = pShinySprite;
    this.description = pDesc;
    this.types = pTypes;
    this.color = pColor;
    this.height = pHeight;
    this.abilities = pAbilities;
    this.habitat = pHabitat;
    this.generation = pGeneration;
    this.growthRate = pGrowthRate;
    this.basestats = pBaseStats;
    this.getGenerationNumber();
    this.replaceText();
    this.getCorrectHeight();
    this.firstAlphabetToUpperCase();
  }

  // #region Methods
  firstAlphabetToUpperCase() {
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    return this.name;
  }

  getGenerationNumber() {
    this.generation = this.generation.toString().toUpperCase();
    this.generation = this.generation.replace("GENERATION-", "");
    return this.generation;
  }

  replaceText() {
    this.description = this.description.replace("\n", " ");
    this.description = this.description.replace("\f", " ");
    return this.description;
  }
  getCorrectHeight() {
    this.height = Number(this.height) * 10;
    return this.height;
  }

  findMaxOfBaseStat() {
    const basestatsValues = Object.values(this.basestats);
    return Math.max(...basestatsValues);
  }

  getBackgroundColor() {
    switch (this.types[0]) {
      case "normal":
        this.bgClass = "normal";
        break;
      case "fire":
        this.bgClass = "fire";
        break;
      case "water":
        this.bgClass = "water";
        break;
      case "electric":
        this.bgClass = "electric";
        break;
      case "grass":
        this.bgClass = "grass";
        break;
      case "ice":
        this.bgClass = "ice";
        break;
      case "fighting":
        this.bgClass = "fighting";
        break;
      case "poison":
        this.bgClass = "poison";
        break;
      case "ground":
        this.bgClass = "ground";
        break;
      case "flying":
        this.bgClass = "flying";
        break;
      case "psychic":
        this.bgClass = "psychic";
        break;
      case "bug":
        this.bgClass = "bug";
        break;
      case "rock":
        this.bgClass = "rock";
        break;
      case "ghost":
        this.bgClass = "ghost";
        break;
      case "dragon":
        this.bgClass = "dragon";
        break;
      case "dark":
        this.bgClass = "dark";
        break;
      case "steel":
        this.bgClass = "steel";
        break;
      case "fairy":
        this.bgClass = "fairy";
        break;
    }
    return this.bgClass;
  }
  // #endregion
}
