import * as React from 'react';
import { IRecipe} from '../interfaces/IRecipe';
import { Segment, Icon, Menu, Label, Grid, GridColumn } from 'semantic-ui-react';
import { connect } from 'react-imperator';
import { CheckoutItem } from './CheckoutItem';
import "../css/styles.css";

export interface ICheckoutProps {
    basketRecipes?: IRecipe[];
}

export const Checkout = connect(class extends React.Component<ICheckoutProps> {
    constructor(props: ICheckoutProps) {
        super(props);
    }
    //Kick the user out if Checkout is empty
    componentDidUpdate = () => {
        if (this.props.basketRecipes) {
            if (this.props.basketRecipes.length == 0) {
                location.href = "#/"
            }
        }
    }

    public render() {
        const { basketRecipes } = this.props
        return (
            <React.Fragment>
                <Grid columns={3}>
                    <Menu fixed="top" inverted>
                        <GridColumn width={3}>
                            <Menu.Item as="a" position="left" style={{ marginTop: '1em' }}
                                onClick={() => location.href = "#/"}>
                                RecipeSearch
                            </Menu.Item>
                        </GridColumn>
                        <GridColumn width={3}>
                            <Menu.Item as="a" style={{ marginTop: '1em' }}
                                onClick={() => location.href = "#/FoodSearch"}>
                                Food Analyzer
                            </Menu.Item>

                        </GridColumn>
                            <Menu.Item as='a' position="right" style={{ marginTop: '1em', marginRight: '1em' }} onClick={() => location.href = "#/Checkout"}>
                            <Icon name="book" size="big"></Icon>
                            {basketRecipes &&
                                <Label color='red' floating> {basketRecipes.length}</Label>}
                            </Menu.Item>
                    </Menu>
                </Grid>
                <Grid columns="4" style={{ marginTop: '6em' }}>
                    <Grid.Row>
                        {basketRecipes &&
                            basketRecipes.map((x: IRecipe, index: number) => {
                                return <Segment style={{ marginTop: "1em", marginLeft: "10px" }} className="recipeContainer"  size="small" key={index}>
                                    <GridColumn>
                                        <CheckoutItem checkoutItem={x} />
                                    </GridColumn>
                                </Segment>
                            })}
                    </Grid.Row>

                </Grid>
            </React.Fragment>
        );
    }
}, ["basketRecipes"])
