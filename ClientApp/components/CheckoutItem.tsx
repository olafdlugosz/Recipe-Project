import * as React from 'react';
import { IRecipe } from 'ClientApp/interfaces/IRecipe';
import { Segment, Icon, Image, Header,Button, Grid, GridColumn, List, ListItem } from 'semantic-ui-react';
import { connect, update } from 'react-imperator';

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
                        Remove Recipe <Icon name="minus circle" onClick={this.removeFromBasket}></Icon>
                        <Button onClick={() => this.SendByMail()}>Send Mail</Button>
                    </div>
                </Segment>
            </div>
        );
    }
}
