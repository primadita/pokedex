class Pokemon{
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
    // #endregion

    constructor({pName, 
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
            pBaseStats = {"hp": 0, "attack": 0, "defense": 0, "specAttack": 0, "specDefense": 0, "speed": 0}
        } = {}){
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
    }

    // #region Methods
    getGenerationNumber(){
        this.generation = this.generation.toString().toUpperCase();
        this.generation = this.generation.replace('GENERATION-','');
        return this.generation;
    }

    replaceText(){
        this.description = this.description.replace('\n', '');
        this.description = this.description.replace('\f', '');
        return this.description;
    }

    getBackgroundColor(){
        switch (this.color){
            case "red":
                break;

        }
    }

    
    // #endregion

}