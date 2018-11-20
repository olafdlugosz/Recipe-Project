import * as React from 'react';
import { Segment, Input, Button, Dropdown, Grid, GridColumn, Divider, Icon, Label, Menu, MenuItem, Container, Header } from 'semantic-ui-react';
import { IRecipe, IIngredients, INutritionInfo } from '../interfaces/IRecipe';
import { Recipe } from '../components/Recipe';
import { Router, Route, Link, Redirect } from "react-router-dom";
import Store from "../interfaces/Store";
import { connect, update } from 'react-imperator';
import { Checkout } from './Checkout';

export interface IRecipeSearchProps {
    recipes?: IRecipe[];
    basketRecipes?: IRecipe[];
}

export interface IRecipeSearchState {
    query: string;
    minCalorie: number;
    maxCalorie: number;
    diet: string;
    cookTime: number;
    healthOption: string;
    startIndex: string;
    lastIndex: string;
    isLoading: boolean;
}

export const RecipeSearch = connect(class extends React.Component<IRecipeSearchProps, IRecipeSearchState> {
    constructor(props: IRecipeSearchProps) {
        super(props);

        this.state = {
            query: '',
            minCalorie: 0,
            maxCalorie: 0,
            diet: '',
            cookTime: 0,
            healthOption: '',
            startIndex: "0",
            lastIndex: "20",
            isLoading: false
        }
    }
    componentDidMount = () => {
        if(!this.props.recipes){
        this.setState({isLoading: true})
        let params = `&from=${this.state.startIndex}&to=${this.state.lastIndex}`
        let query = "chicken";
        fetch(`api/search/${query}/${params}`)
            .then(res => res.json()).then(res => {

                console.log(res);
                this.transformIntoIRecipe(res);
            })
        }else {
            return;
        }
    }
    //search/{query}/{startIndex}/{lastIndex}/{typeOfDiet}/{minCalories}/{maxCalories}/{health}/{maxCookTime}
     //&from={startIndex}&to={lastIndex}&diet={typeOfDiet}&calories={minCalories}-{maxCalories}&health={health}&time={maxCookTime}
     ///0/20/${this.state.diet}/${this.state.minCalorie}/${this.state.maxCalorie}/${this.state.healthOption}/${this.state.cookTime}
    private fetchSelection = () => {
        this.setState({isLoading: true})
        let params = this.formatParams();
        fetch(`api/search/${this.state.query}/${params}`)
            .then(res => res.json()).then(res => {

                console.log(res);
                this.transformIntoIRecipe(res);
            })

    }
    private formatParams = () => {
        let parameters = `&from=${this.state.startIndex}&to=${this.state.lastIndex}`
        if (this.state.maxCalorie > 0){parameters += `&calories=${this.state.minCalorie}-${this.state.maxCalorie}`}
        if(this.state.diet.length > 0){parameters += `&diet=${this.state.diet}`}
        if(this.state.cookTime > 0){parameters += `&time=${this.state.cookTime}`}
        if(this.state.healthOption.length > 0){parameters +=`&health=${this.state.healthOption}` } 
        return parameters;
    }
    private transformIntoIRecipe = (apiResponse: any) => {

        let recipeArray: IRecipe[];
        let recipeObject: IRecipe;
        let ingredientsArray: IIngredients[];
        let ingredientsObject: IIngredients;
        let digestArray: INutritionInfo[];
        let digestObject: INutritionInfo;

        recipeArray = [];
        apiResponse.hits.forEach((element: any) => {
            const x = element.recipe;
            digestArray = [];
            ingredientsArray = [];
            recipeObject = {} as IRecipe;
            ingredientsObject = {} as IIngredients;
            digestObject = {} as INutritionInfo;
            x.ingredients.forEach((j: any) => {
                ingredientsObject = { text: j.text, weight: j.weight, foodCategory: j.foodCategory }
                ingredientsArray.push(ingredientsObject)
            })
            x.digest.forEach((k: any) => {
                digestObject = { label: k.label, total: k.total }
                digestArray.push(digestObject)
            })
            recipeObject = {
                label: x.label,
                calories: x.calories,
                image: x.image,
                source: x.source,
                totalWeight: x.totalWeight,
                healthLabels: x.healthLabels,
                url: x.url,
                ingredients: ingredientsArray,
                nutritionInfo: digestArray,
                isAdded: false
            }

            recipeArray.push(recipeObject);
        });

        update<IRecipe[]>("recipes", () => recipeArray)
        this.setState({isLoading: false})

    }

    private onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.which != 13 || !(this.state.query.trim())) {
            return;
        }
        this.fetchSelection()
    }
    private onSearchButtonClick = () => {
        this.fetchSelection()
    }
    private onTextChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({ query: e.currentTarget.value });
    }

    private handleMinCalorieChange = (e: React.SyntheticEvent<HTMLElement>, selected: any) => {
        this.setState({ minCalorie: selected.value })
    }
    private handleMaxCalorieChange = (e: React.SyntheticEvent<HTMLElement>, selected: any) => {
        this.setState({ maxCalorie: selected.value })
    }
    private handleDietChange = (e: React.SyntheticEvent<HTMLElement>, selected: any) => {
        this.setState({ diet: selected.value })
    }
    private handleCookTimeChange = (e: React.SyntheticEvent<HTMLElement>, selected: any) => {
        this.setState({ cookTime: selected.value })
    }
    private handleHealthOptionChange = (e: React.SyntheticEvent<HTMLElement>, selected: any) => {
        this.setState({ healthOption: selected.value })
    }
    public render() {
        const { query, isLoading } = this.state
        const { recipes, basketRecipes } = this.props

        const minCalorieDropdownOptions = [
            { key: 100, text: '100', value: 100 },
            { key: 200, text: '200', value: 200 },
            { key: 300, text: '300', value: 300 },
            { key: 400, text: '400', value: 400 },
            { key: 500, text: '500', value: 500 },
            { key: 600, text: '600', value: 600 },
            { key: 700, text: '700', value: 700 },
            { key: 800, text: '800', value: 800 },
            { key: 900, text: '900', value: 900 }
        ]
        const maxCalorieDropdownOptions = [
            { key: 1000, text: '1000', value: 1000 },
            { key: 1100, text: '1100', value: 1100 },
            { key: 1200, text: '1200', value: 1200 },
            { key: 1300, text: '1300', value: 1300 },
            { key: 1400, text: '1400', value: 1400 },
            { key: 1500, text: '1500', value: 1500 },
            { key: 1600, text: '1600', value: 1600 },
            { key: 1700, text: '1700', value: 1700 },
            { key: 1800, text: '1800', value: 1800 },
            { key: 1900, text: '1900', value: 1900 },
            { key: 2000, text: '2000', value: 2000 },
        ]
        const dietDropdownOptions = [
            { key: 'Balanced', text: 'Balanced', value: 'balanced' },
            { key: 'High-Fiber', text: 'High-Fiber', value: 'high-fiber' },
            { key: 'High-Protein', text: 'High-Protein', value: 'high-protein' },
            { key: 'Low-Carb', text: 'Low-Carb', value: 'low-carb' },
            { key: 'Low-Fat', text: 'Low-Fat', value: 'low-fat' },
            { key: 'Low-Sodium', text: 'Low-Sodium', value: 'low-sodium' }
        ]
        const cookTimeDropdownOptions = [
            { key: 10, text: '10min', value: 10 },
            { key: 20, text: '20min', value: 20 },
            { key: 30, text: '30min', value: 30 },
            { key: 45, text: '45min', value: 45 },
            { key: 60, text: '1h', value: 60 },
            { key: 90, text: '1.5h', value: 90 },
            { key: 120, text: '2h', value: 120 },
            { key: 150, text: '2.5h', value: 150 },
            { key: 180, text: '3h', value: 180 },
            { key: 210, text: '3.5h', value: 210 },
            { key: 240, text: '4h', value: 240 },
        ]
        const healthDropdownOptions = [
            { key: 'Alcohol-free', text: 'Alcohol-free', value: 'alcohol-free' },
            { key: 'Celery-free', text: 'Celery-free', value: 'celery-free' },
            { key: 'Crustacean-free', text: 'Crustacean-free', value: 'crustacean-free' },
            { key: 'Dairy', text: 'Dairy', value: 'dairy-free' },
            { key: 'Eggs', text: 'Eggs', value: 'eggs-free' },
            { key: 'Fish', text: 'Fish', value: 'fish-free' },
            { key: 'Gluten', text: 'Gluten', value: 'gluten-free' },
            { key: 'Kidney friendly', text: 'Kidney friendly', value: 'kidney-friendly' },
            { key: 'Kosher', text: 'Kosher', value: 'kosher' },
            { key: 'Low potassium', text: 'Low potassium', value: 'low-potassium' },
            { key: 'Lupine-free', text: 'Lupine-free', value: 'lupine-free' },
            { key: 'Mustard-free', text: 'Mustard-free', value: 'mustard-free' },
            { key: 'No oil added', text: 'No oil added', value: 'no-oil-added' },
            { key: 'No-sugar', text: 'No-sugar', value: 'low-sugar' },
            { key: 'Paleo', text: 'Paleo', value: 'paleo' },
            { key: 'Peanuts', text: 'Peanuts', value: 'peanuts-free' },
            { key: 'Pork Free', text: 'Pork Free', value: 'pork-free' },
            { key: 'Red meat-free', text: 'Red meat-free', value: 'red-meat-free' },
            { key: 'Sesame-free', text: 'Sesame-free', value: 'sesame-free' },
            { key: 'Shellfish Free', text: 'Shellfish Free', value: 'shellfish-free' },
            { key: 'Soy Free', text: 'Soy Free', value: 'soy-free' },
            { key: 'Tree Nuts Free', text: 'Tree Nuts Free', value: 'tree-nuts-free' },
            { key: 'Vegan', text: 'Vegan', value: 'vegan' },
            { key: 'Vegetarian', text: 'Vegetarian', value: 'vegetarian' },
            { key: 'Wheat-free', text: 'Wheat-free', value: 'wheat-free' },
        ]

        return (

            <React.Fragment>
            <Menu fixed="top" inverted>
            
            <Menu.Item as="a"  position="left"        
            onClick={ () => location.href = "#/FoodSearch"}>
            Food Analyzer
            </Menu.Item>
            <Header as ="h4" color="olive"> Here you can search for your favorite recipies!</Header>
            <Menu.Item as='a' position="right" style={{ marginTop:'1em', marginLeft: '3em'}} onClick={() => location.href = "#/Checkout"}>
                <Icon name="cart arrow down" size="big"></Icon>
    
                {basketRecipes &&
                    <Label color='red' floating> {basketRecipes.length}</Label>}
    
            </Menu.Item>
            
            </Menu>
                <Grid style={{marginTop: '3em'}}>
                    <GridColumn >
                        
                            <Grid columns={2} celled>
                            <GridColumn width="2" >
                            <Segment >
                                    <Input size = "medium" value={query} loading={isLoading} onKeyUp={this.onKeyUp} onChange={this.onTextChange} placeholder="choose your main ingredient" />

                                    <Dropdown
                                    style={{marginRight: '2em'}}
                                        search
                                        searchInput={{ type: 'number' }}
                                        selection
                                        options={minCalorieDropdownOptions}
                                        placeholder='Select minimum calories...'
                                        onChange={this.handleMinCalorieChange}
                                        loading={isLoading}
                                        
                                    />
                                    <Dropdown
                                        search
                                        searchInput={{ type: 'number' }}
                                        selection
                                        options={maxCalorieDropdownOptions}
                                        placeholder='Select maximum calories...'
                                        onChange={this.handleMaxCalorieChange}
                                        loading={isLoading}
                                    />
                                    <Dropdown
                                        search
                                        searchInput={{ type: 'string' }}
                                        selection
                                        options={dietDropdownOptions}
                                        placeholder='Select your diet...'
                                        onChange={this.handleDietChange}
                                        loading={isLoading}
                                    />
                                    <Dropdown
                                        search
                                        searchInput={{ type: 'number' }}
                                        selection
                                        options={cookTimeDropdownOptions}
                                        placeholder='choose max Cook Time'
                                        onChange={this.handleCookTimeChange}
                                        loading={isLoading}
                                    />
                                    <Dropdown
                                        search
                                        searchInput={{ type: 'string' }}
                                        selection
                                        options={healthDropdownOptions}
                                        placeholder='choose your health option'
                                        onChange={this.handleHealthOptionChange}
                                        loading={isLoading}
                                    />
                                    <Button style={{marginTop: '5px'}}onClick={this.onSearchButtonClick} disabled={!(query.trim())}>Search</Button>
                                    </Segment>
                                </GridColumn>
                                <GridColumn width={14}>

                                    <React.Fragment>
                                    <Grid columns="4">
                                        <Grid.Row>
                                            {recipes &&
                
                                                recipes.map((x: IRecipe, index: number) => {
                                                    return <Segment size="small" className="recipeContrainer" key={index}>
                                                        <GridColumn>
                                                            <Recipe  recipe={x} />
                                                        </GridColumn>
                                                    </Segment>
                
                                                })}
                                        </Grid.Row>
                                    </Grid>
                                </React.Fragment>
                                </GridColumn>
                            </Grid>
                        

                    </GridColumn>
                </Grid>
 
            </React.Fragment>
        );
    }
}, ["recipes", "basketRecipes"])
