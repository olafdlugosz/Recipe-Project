import * as React from 'react';
import { IRecipe } from 'ClientApp/interfaces/IRecipe';
import { Segment, Icon, Image, Header, Grid, GridColumn, List, ListItem } from 'semantic-ui-react';
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
                // if (basket.indexOf(checkOutItem) > -1) {
                //     let index = basket.indexOf(checkOutItem)
                //     basket.splice(index, 1)
                    
                //     return basket;
                // }
               return basket.filter((item) => checkOutItem !== item);
            }
            return [];
        })
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
                </div>
            </Segment>
        </div>
    );
}
}
