import * as React from 'react';
import { IFood, IMeasure } from 'ClientApp/interfaces/IFood';
import { Segment, ModalProps, Header, Label, Dropdown, Button, List, ListItem, Grid, GridColumn, GridRow, ItemContent, Icon, Image, Modal } from 'semantic-ui-react';
import { IFoodDetails, IUnitInfo, ITotalDaily, ITotalNutrients, IIngredient, IParsed } from 'ClientApp/interfaces/IFoodDetails';
import { FoodDetail } from './FoodDetail';


export interface IFoodProps {
  food: IFood;
}

export interface IFoodState {
  amount: string;
  selectedUnit: string;
  foodDetails: IFoodDetails;
  isFetched: boolean;
  amountOptions: any[];
  unitOptions: any[];
  isLoading: boolean;
}

export class Food extends React.Component<IFoodProps, IFoodState> {
  constructor(props: IFoodProps) {
    super(props);

    this.state = {
      amount: "",
      selectedUnit: "",
      foodDetails: {} as IFoodDetails,
      isFetched: false,
      amountOptions: [],
      unitOptions: [],
      isLoading: false
    }
  }
  componentDidMount = () => {
    this.createAmountOptions();
    this.createUnitOptions();

  }
  //Take away this function and see a drastic performance drop in the input of FoodSearch component
  //I cannot seem to locate the bottleneck, but chrome will throw timeout, reflow [Violation] 
  //If one wants to type in the input after data has been fetched. Any help in locating the bottleneck
  //will be appreciated...This issue presists after trying different dropdown menus, taking away maps etc
  //What is going on??
  shouldComponentUpdate(nextProps: IFoodProps, nextState: IFoodState) {
    let currPropsStr = JSON.stringify(this.props);
    let nextPropsStr = JSON.stringify(nextProps);
    let currStateStr = JSON.stringify(this.state);
    let nextStateStr = JSON.stringify(nextState);
    if (currPropsStr === nextPropsStr && currStateStr === nextStateStr) {
      return false;
    } else {
      this.setState({amountOptions: [], unitOptions: []}, () => {
        this.createAmountOptions();
        this.createUnitOptions();

      })
      return true;
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
    this.setState({ amountOptions: amountOptionsArray });
  }
  private handleAmountChange = (e: React.SyntheticEvent<HTMLElement>, selected: any) => {
    this.setState({ amount: selected.value })
  }
  private createUnitOptions = () => {

    let unitOptions: any[];
    unitOptions = [];
    let unitObject: { key: string, text: string, value: string }

    this.props.food.measures.forEach((item: any) => {
      unitObject = { key: item.label, text: item.label, value: item.uri }
      unitOptions.push(unitObject)
    })
    this.setState({ unitOptions: unitOptions })
  }
  private handleUnitChange = (e: React.SyntheticEvent<HTMLElement>, selected: any) => {
    this.setState({ selectedUnit: selected.value })
  }

  private fetchNutrientsDetails = async () => {
    this.setState({isLoading: true})
    const data = await fetch('https://api.edamam.com/api/food-database/nutrients?app_id=cd4cf0ad&app_key=63dd569834e24ed866292fc795fbdd31', {
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
    ).then(response => response.json());
    // const json = await data.json()
    console.log("this is data:", data)
    this.transformIntoIFoodDetails(data as IFoodDetails);
  }
  private transformIntoIFoodDetails = (apiResponse: IFoodDetails) => {

    let foodDetails: IFoodDetails;
    //the spread operator just took away all the fun of manually transforming objects to interfaces..
    foodDetails = { ...apiResponse };

    console.log("foodDetails", foodDetails);
    this.setState({ foodDetails: foodDetails, isFetched: true, isLoading: false })

  }
  public render() {
    const { food } = this.props
    const { amount, selectedUnit, foodDetails, isFetched, amountOptions, unitOptions, isLoading } = this.state

    return (
      <Segment>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={13}>
              <Header as="h3">{food.brand}{food.label}</Header>
              <p>{food.foodContentsLabel}</p>
              <Grid.Row>
                <Dropdown
                  search
                  searchInput={{ type: 'string' }}
                  selection
                  options={amountOptions}
                  placeholder='Select amount...'
                  onChange={this.handleAmountChange}
                  clearable
                  loading={isLoading}
                  
                />
                <Dropdown
                  search
                  searchInput={{ type: 'string' }}
                  selection
                  options={unitOptions}
                  placeholder='Select unit...'
                  onChange={this.handleUnitChange}
                  clearable
                  loading={isLoading}
                />

                <Button onClick={this.fetchNutrientsDetails} disabled={!(amount.trim() && selectedUnit.trim())}>Get Nutrition Detailes!</Button>
                <Modal open={isFetched}>
                  <Modal.Header>Nutrional Detail</Modal.Header>
                  <Modal.Content >
                    <Modal.Description>
                      <Header>{isFetched && foodDetails.ingredients[0].parsed[0].food }</Header>
                      <Header>{isFetched && foodDetails.totalWeight + "g" }</Header>

                      {foodDetails &&
                        <FoodDetail foodDetails={foodDetails}></FoodDetail>}
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions >
                    <Button secondary onClick={() => this.setState({ isFetched: false })}>
                      Close
                  </Button>
                  </Modal.Actions>
                </Modal>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h5">Basic Nutrients:</Header>
              <React.Fragment>
                {Object.keys(food.nutrients).map((key: any, index: number) => {
                  return <div key={index}>{key}: {this.formatNutrientsTotal(food.nutrients[key])}</div>;
                })}
              </React.Fragment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
