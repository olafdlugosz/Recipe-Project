
export interface Parsed {
    quantity: number;
    measure: string;
    food: string;
    foodId: string;
    foodURI: string;
    weight: number;
    retainedWeight: number;
    measureURI: string;
    status: string;
}

export interface Ingredient {
    parsed: Parsed[];
}
export interface TotalNutrients {
    ENERC_KCAL: IUnitInfo;
    FAT: IUnitInfo;
    FASAT: IUnitInfo;
    FAMS: IUnitInfo;
    FAPU: IUnitInfo;
    PROCNT: IUnitInfo;
    CHOLE: IUnitInfo;
    NA: IUnitInfo;
    CA: IUnitInfo;
    MG: IUnitInfo;
    K: IUnitInfo;
    FE: IUnitInfo;
    ZN: IUnitInfo;
    P: IUnitInfo;
    VITA_RAE: IUnitInfo;
    VITC: IUnitInfo;
    THIA: IUnitInfo;
    RIBF: IUnitInfo;
    NIA: IUnitInfo;
    VITB6A: IUnitInfo;
    FOLDFE: IUnitInfo;
    FOLFD: IUnitInfo;
    VITB12: IUnitInfo;
    VITD: IUnitInfo;
    TOCPHA: IUnitInfo;
}
export interface TotalDaily {
    ENERC_KCAL: IUnitInfo;
    FAT: IUnitInfo;
    FASAT: IUnitInfo;
    FAMS: IUnitInfo;
    FAPU: IUnitInfo;
    PROCNT: IUnitInfo;
    CHOLE: IUnitInfo;
    NA: IUnitInfo;
    CA: IUnitInfo;
    MG: IUnitInfo;
    K: IUnitInfo;
    FE: IUnitInfo;
    ZN: IUnitInfo;
    P: IUnitInfo;
    VITA_RAE: IUnitInfo;
    VITC: IUnitInfo;
    THIA: IUnitInfo;
    RIBF: IUnitInfo;
    NIA: IUnitInfo;
    VITB6A: IUnitInfo;
    FOLDFE: IUnitInfo;
    FOLFD: IUnitInfo;
    VITB12: IUnitInfo;
    VITD: IUnitInfo;
    TOCPHA: IUnitInfo;
}
export interface IUnitInfo {
    label: string;
    quantity: number;
    unit: string;
}

export interface IFoodDetails {
    uri: string;
    yield: number;
    calories: number;
    totalWeight: number;
    dietLabels: string[];
    healthLabels: string[];
    cautions: any[];
    totalNutrients: TotalNutrients;
    totalDaily: TotalDaily;
    ingredients: Ingredient[];
}
