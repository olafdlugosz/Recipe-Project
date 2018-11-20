import * as React from 'react';
import { Segment, Input,Header, Button, Dropdown,Menu, Label,Icon, Grid, GridColumn, Container, List, ListItem } from 'semantic-ui-react';
import { IFood, IMeasure } from '../interfaces/IFood';
import { Food } from './Food';
import { connect, update } from 'react-imperator';
import { Router, Route, Link, Redirect } from "react-router-dom";
import { IRecipe } from 'ClientApp/interfaces/IRecipe';

export interface IFoodSearchProps {
    foods?: IFood[];
    basketRecipes?: IRecipe[];
}

export interface IFoodSearchState {
    query: string;
}

export const FoodSearch = connect(class extends React.Component<IFoodSearchProps, IFoodSearchState> {
    constructor(props: IFoodSearchProps) {
        super(props);

        this.state = {
            query: "Big Mac",
            
        }
    }
    componentDidMount = () => {
        this.fetchSelection();
    }
    private fetchSelection = () => {

        fetch(`api/foodSearch/${this.state.query}`)
            .then(res => res.json()).then(res => {

                console.log(res);
                this.transformIntoIFood(res);
            })

    }
    private transformIntoIFood = (apiResponse: any) => {

        //yes, i know I could've just used a spread operator.. I learnt that later and this was fun.
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
                measuresObject = { uri: element.uri, label: element.label }
                measuresArray.push(measuresObject);
            })
            foodObject = {
                category: food.category,
                categoryLabel: food.categoryLabel,
                foodId: food.foodId,
                label: food.label,
                uri: food.uri,
                measures: measuresArray,
                nutrients: food.nutrients
            }
            if (Object.prototype.hasOwnProperty.call(food, 'brand')) {
                foodObject["brand"] = food.brand
            }
            if (Object.prototype.hasOwnProperty.call(food, 'foodContentsLabel')) {
                foodObject["foodContentsLabel"] = food.foodContentsLabel
            }
            foodArray.push(foodObject);
        });
        console.log(foodArray);
        update<IFood[]>("foods", () => foodArray)
    }
    private onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.which == 13 && this.state.query.length > 0) {

            this.fetchSelection()
        }
    }
    private onTextChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        this.setState({ query: e.currentTarget.value });
    }
    private onSearchButtonClick = () => {
        this.fetchSelection();
    }

    public render() {
        const { query } = this.state;
        const { foods, basketRecipes } = this.props;
        return (
            <React.Fragment>
     
            <Menu fixed="top" inverted>
            
            <Menu.Item as="a"  position="left"        
            onClick={ () => location.href = "#/"}>
            Recipe Search
            </Menu.Item>
            <Header as ="h4" color="olive"> Here you can find nutritional information for your favorite foods!</Header>
            <Menu.Item as='a' position="right" style={{ marginTop:'1em', marginLeft: '3em'}} onClick={() => location.href = "#/Checkout"}>
                <Icon name="cart arrow down" size="big"></Icon>
    
                {basketRecipes &&
                    <Label color='red' floating> {basketRecipes.length}</Label>}
    
            </Menu.Item>
    
      </Menu>
      
      
            <div>
                <Segment style={{marginTop: '6em'}}>
                    <Input value={query} onKeyUp={this.onKeyUp} onChange={this.onTextChange} placeholder="search for any food" />
                    <Button style={{marginTop: '5px'}}onClick={this.onSearchButtonClick} disabled={!(query.trim())}>Search</Button>
                </Segment>
                <React.Fragment>
                    {foods &&
                        foods.map((item: IFood, index: number) => {
                            return <List key={index}>
                                <ListItem><Food food={item} /></ListItem>
                            </List>
                        })
                    }
                </React.Fragment>
            </div>
            </React.Fragment>
        );
    }
}, ["foods", "basketRecipes"])
