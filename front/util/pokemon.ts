export interface PokemonDetails {
    abilities: Ability2[];
    base_experience: number;
    forms: Ability[];
    game_indices: GameIndex[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    past_types: any[];
    species: Ability;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
    weight: number;
}

export interface Ability2 {
    name: string;
    url: string;
}

export interface Ability {
    ability: Ability2;
    is_hidden: boolean;
    slot: number;
}

export interface Form {
    name: string;
    url: string;
}

export interface Version {
    name: string;
    url: string;
}

export interface GameIndex {
    game_index: number;
    version: Version;
}

export interface Move2 {
    name: string;
    url: string;
}

export interface MoveLearnMethod {
    name: string;
    url: string;
}

export interface VersionGroup {
    name: string;
    url: string;
}

export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: MoveLearnMethod;
    version_group: VersionGroup;
}

export interface Move {
    move: Move2;
    version_group_details: VersionGroupDetail[];
}

export interface Species {
    name: string;
    url: string;
}

export interface DreamWorld {
    front_default: string;
    front_female?: any;
}

export interface Home {
    front_default: string;
    front_female?: any;
    front_shiny: string;
    front_shiny_female?: any;
}

export interface OfficialArtwork {
    front_default: string;
}

export interface Other {
    dream_world: DreamWorld;
    home: Home;
    officialArtwork: OfficialArtwork;
}

export interface RedBlue {
    back_default: string;
    back_gray: string;
    back_transparent: string;
    front_default: string;
    front_gray: string;
    front_transparent: string;
}

export interface Yellow {
    back_default: string;
    back_gray: string;
    back_transparent: string;
    front_default: string;
    front_gray: string;
    front_transparent: string;
}

export interface GenerationI {
    redBlue: RedBlue;
    yellow: Yellow;
}

export interface Crystal {
    back_default: string;
    back_shiny: string;
    back_shiny_transparent: string;
    back_transparent: string;
    front_default: string;
    front_shiny: string;
    front_shiny_transparent: string;
    front_transparent: string;
}

export interface Gold {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    front_transparent: string;
}

export interface Silver {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    front_transparent: string;
}

export interface GenerationIi {
    crystal: Crystal;
    gold: Gold;
    silver: Silver;
}

export interface Emerald {
    front_default: string;
    front_shiny: string;
}

export interface FireredLeafgreen {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
}

export interface RubySapphire {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
}

export interface GenerationIii {
    emerald: Emerald;
    fireredLeafgreen: FireredLeafgreen;
    rubySapphire: RubySapphire;
}

export interface DiamondPearl {
    back_default: string;
    back_female?: any;
    back_shiny: string;
    back_shiny_female?: any;
    front_default: string;
    front_female?: any;
    front_shiny: string;
    front_shiny_female?: any;
}

export interface HeartgoldSoulsilver {
    back_default: string;
    back_female?: any;
    back_shiny: string;
    back_shiny_female?: any;
    front_default: string;
    front_female?: any;
    front_shiny: string;
    front_shiny_female?: any;
}

export interface Platinum {
    back_default: string;
    back_female?: any;
    back_shiny: string;
    back_shiny_female?: any;
    front_default: string;
    front_female?: any;
    front_shiny: string;
    front_shiny_female?: any;
}

export interface GenerationIv {
    diamondPearl: DiamondPearl;
    heartgoldSoulsilver: HeartgoldSoulsilver;
    platinum: Platinum;
}

export interface Animated {
    back_default: string;
    back_female?: any;
    back_shiny: string;
    back_shiny_female?: any;
    front_default: string;
    front_female?: any;
    front_shiny: string;
    front_shiny_female?: any;
}

export interface BlackWhite {
    animated: Animated;
    back_default: string;
    back_female?: any;
    back_shiny: string;
    back_shiny_female?: any;
    front_default: string;
    front_female?: any;
    front_shiny: string;
    front_shiny_female?: any;
}

export interface GenerationV {
    blackWhite: BlackWhite;
}

export interface OmegarubyAlphasapphire {
    front_default: string;
    front_female?: any;
    front_shiny: string;
    front_shiny_female?: any;
}

export interface XY {
    front_default: string;
    front_female?: any;
    front_shiny: string;
    front_shiny_female?: any;
}

export interface GenerationVi {
    omegarubyAlphasapphire: OmegarubyAlphasapphire;
    xY: XY;
}

export interface Icons {
    front_default: string;
    front_female?: any;
}

export interface UltraSunUltraMoon {
    front_default: string;
    front_female?: any;
    front_shiny: string;
    front_shiny_female?: any;
}

export interface GenerationVii {
    icons: Icons;
    ultraSunUltraMoon: UltraSunUltraMoon;
}

export interface Icons2 {
    front_default: string;
    front_female?: any;
}

export interface GenerationViii {
    icons: Icons2;
}

export interface Versions {
    generationi: GenerationI;
    generationii: GenerationIi;
    generationiii: GenerationIii;
    generationiv: GenerationIv;
    generationv: GenerationV;
    generationvi: GenerationVi;
    generationvii: GenerationVii;
    generationviii: GenerationViii;
}

export interface Sprites {
    back_default: string;
    back_female?: any;
    back_shiny: string;
    back_shiny_female?: any;
    front_default: string;
    front_female?: any;
    front_shiny: string;
    front_shiny_female?: any;
    other: Other;
    versions: Versions;
}

export interface Stat2 {
    name: string;
    url: string;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: Stat2;
}

export interface Type2 {
    name: string;
    url: string;
}

export interface Type {
    slot: number;
    type: Type2;
}

export interface PokeList {
    name: string;
    url: string;
    abilities: Ability[];
    base_experience: number;
    forms: Form[];
    game_indices: GameIndex[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    order: number;
    past_types: any[];
    species: Species;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
    weight: number;
}
