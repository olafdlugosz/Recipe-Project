import * as React from 'react';
import { Segment, Input, Header, Button, Menu, Label, Icon, Container, List, ListItem } from 'semantic-ui-react';
import { IFood, IMeasure } from '../interfaces/IFood';
import { Food } from './Food';
import { connect, update } from 'react-imperator';
import { IRecipe } from 'ClientApp/interfaces/IRecipe';

export interface IFoodSearchProps {
    foods?: IFood[];
    basketRecipes?: IRecipe[];
}

export interface IFoodSearchState {
    query: string;
    isLoading: boolean;
}

export const FoodSearch = connect(class extends React.Component<IFoodSearchProps, IFoodSearchState> {
    constructor(props: IFoodSearchProps) {
        super(props);

        this.state = {
            query: "Big Mac",
            isLoading: false
        }
    }
    //Populate the page with a Bic Mac query upon first open
    componentDidMount = () => {
        if (!this.props.foods) {
            this.setState({ isLoading: true })
            this.fetchSelection();
        }
    }
    private fetchSelection = () => {

        fetch(`api/foodSearch/${this.state.query}`)
            .then(res => res.json()).then(res => {
                this.transformIntoIFood(res);
                this.setState({ isLoading: false })
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
        update<IFood[]>("foods", () => foodArray)
    }
    private onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.which == 13 && this.state.query.length > 0) {
            this.fetchSelection()
        }
    }
    private onTextChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({ query: e.currentTarget.value });
    }
    private onSearchButtonClick = () => {
        this.fetchSelection();
    }
    private goToBasket = () => {
        if (this.props.basketRecipes) {
            if (this.props.basketRecipes.length > 0) {
                location.href = "#/Checkout"
            }
        }
    }

    public render() {
        const { query, isLoading } = this.state;
        const { foods, basketRecipes } = this.props;
        return (
            <React.Fragment>
                <Menu fixed="top" inverted>

                    <Menu.Item as="a" position="left"
                        onClick={() => location.href = "#/"}>
                        Recipe Search
                    </Menu.Item>
                    <Header as="h4" color="olive"> Here you can find nutritional information for your favorite foods!</Header>
                    <Menu.Item as='a' position="right" style={{ marginTop: '1em', marginRight: '1em' }} onClick={() => this.goToBasket()}>
                        <Icon name="cart arrow down" size="big"></Icon>

                        {basketRecipes &&
                            <Label color='red' floating> {basketRecipes.length}</Label>}

                    </Menu.Item>

                </Menu>
                <Container>
                    <Segment style={{ marginTop: '6em' }} inverted color="yellow">
                        <Input value={query} onKeyUp={this.onKeyUp} loading={isLoading} onChange={this.onTextChange} placeholder="search for any food" />
                        <Button style={{ marginTop: '5px' }} onClick={this.onSearchButtonClick} disabled={!(query.trim())}>Search</Button>
                    </Segment>
                    <React.Fragment>
                        {foods &&
                            foods.map((item: IFood, index: number) => {
                                return <Container ><List key={index}>
                                    <ListItem><Food food={item} /></ListItem>
                                </List>
                                </Container>
                            })
                        }
                    </React.Fragment>
                </Container>
            </React.Fragment>
        );
    }
}, ["foods", "basketRecipes"])
