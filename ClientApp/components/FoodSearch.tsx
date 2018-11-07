import * as React from 'react';
import { Segment, Input, Button, Dropdown, Grid, GridColumn, Container, List, ListItem } from 'semantic-ui-react';
import { IFood, IMeasure } from '../interfaces/IFood';
import {Food} from './Food';

export interface IFoodSearchProps {
}

export interface IFoodSearchState {
    query: string;
    foods: IFood[];
}

export class FoodSearch extends React.Component<IFoodSearchProps, IFoodSearchState> {
    constructor(props: IFoodSearchProps) {
        super(props);

        this.state = {
            query: "",
            foods: []
        }
    }
    private fetchSelection = () => {

        fetch(`api/foodSearch/${this.state.query}`)
            .then(res => res.json()).then(res => {

                console.log(res);
                 this.transformIntoIFoodObject(res);
            })

    }
    private transformIntoIFoodObject = (apiResponse: any) => {

        let foodArray: IFood[];
        let foodObject: IFood;
        let measuresArray: IMeasure[];
        let measuresObject: IMeasure;

        foodArray = [];
        apiResponse.hints.forEach((item: any) => {
            const food = item.food;
            foodObject = {} as IFood;
            measuresArray = [];
            measuresObject = {} as IMeasure;

            item.measures.forEach((element: any) => {
                measuresObject = {uri: element.uri, label: element.label }
                measuresArray.push(measuresObject);
            })
           // Object.prototype.hasOwnProperty.call(request.query, 'whatever')
           foodObject = {
               category: food.category,
               categoryLabel: food.categoryLabel,
               foodId: food.foodId,
               label: food.label,
               uri: food.uri,
               measures: measuresArray,
               nutrients: food.nutrients     
            }
            if(Object.prototype.hasOwnProperty.call(food,'brand')){
                foodObject["brand"] = food.brand
            }
            if(Object.prototype.hasOwnProperty.call(food,'foodContentsLabel')){
                foodObject["foodContentsLabel"] = food.foodContentsLabel
            }
            foodArray.push(foodObject);
        });
        this.setState({foods: foodArray});
    }
    private onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.which != 13 || !(this.state.query.trim())) {
            return;
        }
        this.fetchSelection()
    }
    private onTextChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({ query: e.currentTarget.value });
    }

    public render() {
        const { query, foods } = this.state;
        return (
            <div>
            <Segment>
                <Input value={query} onKeyUp={this.onKeyUp} onChange={this.onTextChange} placeholder="choose your main ingredient" />
            </Segment>
            <React.Fragment>
            {foods.length > 0?
                foods.map((item: IFood, index: number) => {
                    return <List key={index}>
                    <ListItem><Food food = {item}/></ListItem>
                    </List>
                })
                : <React.Fragment></React.Fragment>}
            </React.Fragment>
            </div>
        );
    }
}
