export interface IRecipe {
    calories: number;
    image: string;
    label: string;
    source: string;
    totalWeight: number;
    ingredients: IIngredients[];
    nutritionInfo: INutritionInfo[];
    healthLabels: string[];
    url: string;

}
export interface IIngredients {
    text: string;
    weight: number;
    foodCategory: string;
}
export interface INutritionInfo{
    label: string;
    total: number;
}