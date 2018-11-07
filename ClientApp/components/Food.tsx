import * as React from 'react';
import { IFood, IMeasure } from 'ClientApp/interfaces/IFood';
import { Segment, Header, Label, Dropdown, Button, List, ListItem, Grid, GridColumn, GridRow, ItemContent } from 'semantic-ui-react';

export interface IFoodProps {
  food: IFood;
}

export interface IFoodState {
  amount: string;
  selectedUnit: string;
}

export class Food extends React.Component<IFoodProps, IFoodState> {
  constructor(props: IFoodProps) {
    super(props);

    this.state = {
      amount: "",
      selectedUnit: ""
    }
  }

  private formatNutrientsTotal = (total: number) => {
    let tot = total.toString();
    if (tot.indexOf(".") > -1) {
      let totArray = tot.split(".");
      let finalString = totArray[0] + "." + totArray[1].substring(0, 2);
      return finalString;
    } else {
      return tot;
    }
  }
  private createAmountOptions = () => {
    let amountOptionsArray = [];
    let amountObject: { key: string, text: string, value: string }

    for (let index = 1; index < 101; index++) {
      amountObject = { key: index.toString(), text: index.toString(), value: index.toString() }
      amountOptionsArray.push(amountObject);
    }
    return amountOptionsArray;
  }
  private handleAmountChange = (e: React.SyntheticEvent<HTMLElement>, selected: any) => {
    this.setState({ amount: selected.value })
  }
  private createUnitOptions = () => {
    
    let unitOptions: any[];
    unitOptions = [];
    let unitObject: { key: string, text: string, value: string}
    
    this.props.food.measures.forEach((item : any) => {
      unitObject = {key: item.label, text: item.label, value: item.uri}
      unitOptions.push(unitObject)
    })
    return unitOptions;
  }
  private handleUnitChange = (e: React.SyntheticEvent<HTMLElement>, selected: any) => {
    this.setState({ selectedUnit: selected.value })
  }

  private fetchNutrientsDetails = () => {

    fetch('https://api.edamam.com/api/food-database/nutrients?app_id=cd4cf0ad&app_key=63dd569834e24ed866292fc795fbdd31', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "yield": 1,
        "ingredients": [
          {
            "quantity": Number(this.state.amount),
            "measureURI": this.state.selectedUnit,
            "foodURI": this.props.food.uri
          }
        ]
      })

    }
    ).then(res => res.json()).then(res => {

      console.log(res);
      
  })
  }
  public render() {
    const { food } = this.props
    const { amount, selectedUnit } = this.state
    const amountOptions = this.createAmountOptions();
    const unitOptions = this.createUnitOptions();
    return (
      <Segment>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={13}>
              <Header as="h3">{Object.prototype.hasOwnProperty.call(food, "brand") ? <span>{food.brand}</span> : ""} {food.label} </Header>
              <Label>{food.categoryLabel}</Label>
              <Label>{food.category}</Label>
              {Object.prototype.hasOwnProperty.call(food, "foodContentsLabel") ?
                <p>{food.foodContentsLabel}</p>
                : ""}
              <Grid.Row>
                <Dropdown
                  search
                  searchInput={{ type: 'string' }}
                  selection
                  options={amountOptions}
                  placeholder='Select amount...'
                  onChange={this.handleAmountChange}
                />
                <Dropdown
                search
                searchInput={{ type: 'string' }}
                selection
                options={unitOptions}
                placeholder='Select unit...'
                onChange={this.handleUnitChange}
              />
                <Button onClick={this.fetchNutrientsDetails} disabled={!(amount.trim() && selectedUnit.trim())}>Get Nutrition Detailes!</Button>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h5">Basic Nutrients:</Header>
              <React.Fragment>
                {Object.keys(food.nutrients).map((key: any) => {
                  return <div>{key}: {this.formatNutrientsTotal(food.nutrients[key])}</div>;
                })}
              </React.Fragment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
