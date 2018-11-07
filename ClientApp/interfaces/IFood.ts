export interface IFood {
    category: string;
    categoryLabel: string;
    foodId: string;
    label: string;
    uri: string;
    measures: IMeasure[];
    nutrients: any;
    brand?: string;
    foodContentsLabel? : string;        

}
export interface IMeasure {
    uri: string;
    label: string;
}