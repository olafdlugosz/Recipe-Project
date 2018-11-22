import * as React from 'react';
import { IRecipe, IIngredients } from 'ClientApp/interfaces/IRecipe';
import {Label, Input, Popup, Icon, Image, Header, Button, Grid} from 'semantic-ui-react';
import {update } from 'react-imperator';
import {Link } from "react-router-dom";
import Store from "../interfaces/Store";

export interface ICheckoutItemProps {
    checkoutItem: IRecipe
}

export interface ICheckoutItemState {
    mailAdress: string;
    validateInput: boolean;
}

export class CheckoutItem extends React.Component<ICheckoutItemProps, ICheckoutItemState> {
    constructor(props: ICheckoutItemProps) {
        super(props);

        this.state = {
            mailAdress: "",
            validateInput: false
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
    private createMessageBody = () => {
        let ingredientsList = this.props.checkoutItem.ingredients.map((x: IIngredients, index: number) => {
            return x.text
        })
        return ingredientsList.toString();
    }
    //Unfortunetely the shoppingList sends the whole message body as 1 long string, If you have any solution on how to
    //format the body so it appears as a list of strings, inside of the email. I'd really like to know. 
    private sendMail = () => {
        if (this.validate() == false) {
            this.setState({ validateInput: true })
            return
        } else {
            let targetMail = this.state.mailAdress;
            let mailTitle = this.props.checkoutItem.label
            let messageBody = this.createMessageBody()
            fetch(`api/SendMail/${targetMail}/${mailTitle}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageBody)

            }
            ).catch(error => console.log(error))
        }
    }
    private formatCheckoutItemLabel = (label: string) => {
        let stringToSplit = label.split(" ");
        return stringToSplit[0] + " " + stringToSplit[1];
    }
    private onTextChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({ mailAdress: e.currentTarget.value, validateInput: false });
    }
    private validate = () => {
        let email = this.state.mailAdress
        if (this.validateEmail(email)) {
            return true

        } else {
            return false;
        }
    }
    private validateEmail = (email: string) => {
        //Regex for email validation
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    public render() {
        const { checkoutItem } = this.props
        const { mailAdress, validateInput } = this.state

        return (
            <div>
                <Header as="h3">{checkoutItem.label.length > 35 ? this.formatCheckoutItemLabel(checkoutItem.label) : checkoutItem.label}
                    <Popup trigger={<Icon style={{ marginLeft: "5px" }} size="large" name="mail"></Icon>} flowing on="click">
                        <Grid centered divided columns={1}>
                            <Grid.Column textAlign='center'>
                                <Header as='h4'>Email shopping list</Header>
                                <p>Type in your e-mail adress</p>
                                <div>
                                    {validateInput ? <Label inverted="true" color='red' pointing="below">
                                        This e-mail is invalid!
                                  </Label> : ""}
                                </div>
                                <div>
                                    <Input value={mailAdress} onChange={this.onTextChange}></Input>
                                </div>
                                <Button disabled={!mailAdress.trim()} onClick={() => this.sendMail()} style={{ marginTop: '5px' }}>Send</Button>
                            </Grid.Column>
                        </Grid>
                    </Popup>
                </Header>
                <Image size="small" label={checkoutItem.source} src={checkoutItem.image}></Image>
                <div>
                    <Link to="/CheckoutItemDetail" style={{ marginRight: "5px" }} onClick={() => Store.selectedRecipe = checkoutItem}>Details</Link>
                    Remove Recipe <Icon name="minus circle" size="large" onClick={this.removeFromBasket}></Icon>
                </div>
            </div>
        );
    }
}
