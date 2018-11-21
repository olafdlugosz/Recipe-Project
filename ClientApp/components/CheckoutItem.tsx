import * as React from 'react';
import { IRecipe, IIngredients } from 'ClientApp/interfaces/IRecipe';
import { Segment,Label, Input, Popup, Icon, Image, Header, Button, Grid, GridColumn, List, ListItem } from 'semantic-ui-react';
import { connect, update } from 'react-imperator';
import { RecipeSearch } from '../components/RecipeSearch';
import { Router, Route, Link, Redirect } from "react-router-dom";
import Store from "../interfaces/Store";
import {INutritionInfo} from "../interfaces/IRecipe"


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
        
        let ingredientsList = this.props.checkoutItem.ingredients.map((x: IIngredients) => {
            return x.text
        })
        console.log("IngredientsList: ", ingredientsList)
        return ingredientsList.toString();

    }
    private sendMail = () => {
        if(this.validate() == false){
            console.log("This Email is not valid!")
            this.setState({validateInput: true})            
            return
        }else{
        let targetMail = this.state.mailAdress;
        let mailTitle = this.props.checkoutItem.label
        let messageBody = "hello"
    
        console.log("targetmail: ", targetMail)
        console.log("mailTitle", mailTitle);

        console.log("messageBody: ", messageBody)
        fetch(`api/SendMail/${targetMail}/${mailTitle}/${messageBody}`).then(() => {console.log("Email Sent!")}).catch(error => console.log(error))}
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

        if(this.validateEmail(email)){
            console.log("Validation Successful!")
                return true
            
        } else
        console.log("Validation Failed!")
        return false;
    }
    private validateEmail = (email: string) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    }   

    public render() {
        const { checkoutItem } = this.props
        const {mailAdress, validateInput} = this.state

        return (
            <div>
                <Segment>
                    <Header as="h3">{checkoutItem.label.length > 35 ? this.formatCheckoutItemLabel(checkoutItem.label) : checkoutItem.label}
                        <Popup trigger={<Icon style={{marginLeft: "5px"}} size="large" name="mail"></Icon>} flowing on="click">
                            <Grid centered divided columns={1}>
                                <Grid.Column textAlign='center'>
                                    <Header as='h4'>Email shopping list</Header>
                                    <p>Type in your e-mail adress</p>
                                    <div>
                                    {validateInput? <Label inverted="true" color='red' pointing="below">
                                    This e-mail is invalid!
                                  </Label> : ""}
                                  </div>
                                  <div>
                                        <Input value={mailAdress} onChange={this.onTextChange}></Input>
                                    </div>
                                    <Button disabled ={!mailAdress.trim()}onClick={() => this.sendMail()} style={{ marginTop: '5px' }}>Send</Button>
                                </Grid.Column>

                            </Grid>
                        </Popup>
                    </Header>
                    <Image size="small" label={checkoutItem.source} src={checkoutItem.image}></Image>
                    <div>
                        <Link to="/CheckoutItemDetail" style={{ marginRight: "5px" }} onClick={() => Store.selectedRecipe = checkoutItem}>Details</Link>
                        Remove Recipe <Icon name="minus circle" onClick={this.removeFromBasket}></Icon>
                    </div>

                </Segment>
            </div>
        );
    }
}
