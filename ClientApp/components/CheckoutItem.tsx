import * as React from 'react';
import { IRecipe } from 'ClientApp/interfaces/IRecipe';
import { Segment, Icon, Image, Header,Button, Grid, GridColumn, List, ListItem } from 'semantic-ui-react';
import { connect, update } from 'react-imperator';
import { RecipeSearch } from '../components/RecipeSearch';
import { Router, Route, Link, Redirect } from "react-router-dom";
import Store from "../interfaces/Store";

export interface ICheckoutItemProps {
    checkoutItem: IRecipe
}

export interface ICheckoutItemState {
}

export class CheckoutItem extends React.Component<ICheckoutItemProps, ICheckoutItemState> {
    constructor(props: ICheckoutItemProps) {
        super(props);

        this.state = {
        }
    }

    private removeFromBasket = () => {

        const checkOutItem = this.props.checkoutItem;

        update<IRecipe[]>("basketRecipes", (basket: IRecipe[]) => {
            if (basket) {
                checkOutItem.isAdded = false;
                return basket.filter((item) => checkOutItem !== item);
            }
            return [];
        })
    }
    private SendByMail = () => {
        let targetMail = "olafdlugosz@gmail.com"
        let mailTitle = "it works";
        let messageBody = "It works"
        fetch(`api/SendMail/${targetMail}/${mailTitle}/${messageBody}`).catch(error => console.log(error))
    }



    public render() {
        const { checkoutItem } = this.props
        return (
            <div>
                <Segment>

                    <Header as="h3">{checkoutItem.label}</Header>
                    <Image size="small" label={checkoutItem.source} src={checkoutItem.image}></Image>
                    <div>
                    <Link to="/CheckoutItemDetail" onClick={() => Store.selectedRecipe = checkoutItem}>Details</Link>
                        Remove Recipe <Icon name="minus circle" onClick={this.removeFromBasket}></Icon>
                        <Button onClick={() => this.SendByMail()}>Send Mail</Button>
                    </div>
                </Segment>
            </div>
        );
    }
}
