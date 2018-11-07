import * as React from 'react';
import { IRecipe } from 'ClientApp/interfaces/IRecipe';
import { Segment,Icon, Image, Header, Grid, GridColumn, List, ListItem } from 'semantic-ui-react';

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

  public render() {
      const {checkoutItem} = this.props
    return (
      <div>
        <Segment>

         <Header as ="h3">{checkoutItem.label}</Header>
         <Image size ="small" label = {checkoutItem.source} src = {checkoutItem.image}></Image>
         <div>
        
         </div>       
       </Segment>
      </div>
    );
  }
}
