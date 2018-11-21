import * as React from 'react';
import { IRecipe, IIngredients, INutritionInfo } from 'ClientApp/interfaces/IRecipe';
import Store from "../interfaces/Store";
import { Container, Segment, TableRow, Menu, Label, Icon, Image, Grid, Header, List, Table, TableBody, TableCell, TableFooter, TableHeader, TableHeaderCell, GridColumn, GridRow } from 'semantic-ui-react';
import { Router, Route, Link, Redirect } from "react-router-dom";
import { RecipeSearch } from './RecipeSearch';
import { update, connect } from "react-imperator";


export interface IRecipeDetailProps {
  basketRecipes?: IRecipe[];

}

export interface IRecipeDetailState {
}

export const RecipeDetail = connect(class extends React.Component<IRecipeDetailProps, IRecipeDetailState> {
  constructor(props: IRecipeDetailProps) {
    super(props);

    this.state = {

    }
  }
  private formatWeightOrCalories = (calories: number) => {
    let cal = calories.toString();
    if (cal.indexOf(".") > -1) {
      let calArray = cal.split(".");
      return calArray[0];
    } else {
      return cal;
    }
  }
  private formatNutritionInfoTotal = (total: number) => {
    let tot = total.toString();
    if (tot.indexOf(".") > -1) {
      let totArray = tot.split(".");
      let finalString = totArray[0] + "." + totArray[1].substring(0, 1);
      return finalString;
    } else {
      return tot;
    }
  }
  private addToBasket = () => {

    update<IRecipe[]>("basketRecipes", (basket: IRecipe[]) => {
      console.log("basket:", basket)
      return [...(basket || []), Store.selectedRecipe]
    })


  }
  private goToBasket = () => {
    if (this.props.basketRecipes) {
      if (this.props.basketRecipes.length > 0) {
        location.href = "#/Checkout"
      }
    }
  }

  public render() {
    const recipe = Store.selectedRecipe
    const { basketRecipes } = this.props;
    console.log(recipe)
    return (
      <React.Fragment>
        <Grid columns={3}>
          <Menu fixed="top" inverted>
            <GridColumn width={3}>


              <Menu.Item as="a" position="left" style={{ marginTop: '1em', marginLeft: '3em' }}
                onClick={() => location.href = "#/"}>
                RecipeSearch
      </Menu.Item>
            </GridColumn>
            <GridColumn width={3}>
              <Menu.Item as="a" style={{ marginTop: '1em', marginLeft: '3em' }}
                onClick={() => location.href = "/FoodSearch"}>
                Food Analyzer
      </Menu.Item>

            </GridColumn>


            <Menu.Item as='a' position="right" style={{ marginTop: '1em', marginLeft: '3em' }} onClick={() => this.goToBasket()}>
              <Icon name="cart arrow down" size="big"></Icon>

              {basketRecipes &&
                <Label color='red' floating> {basketRecipes.length}</Label>}

            </Menu.Item>

          </Menu>

        </Grid>
        <div>
          <Container style={{ marginTop: '6em' }}>
            <Segment>
              <Grid celled>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Header as="h3">{recipe.label}</Header>
                    <Image src={recipe.image} label={recipe.source}></Image>
                    <div>
                      {recipe.healthLabels.map((j: string, index: number) => {
                        return <div key={index + "healthLabel"}>{j}</div>
                      })}
                    </div>
                    <span>Calories: {this.formatWeightOrCalories(recipe.calories)}</span>
                    <div>Total weight: {this.formatWeightOrCalories(recipe.totalWeight) + "g"}</div>
                    <Link to="/" >Back</Link>
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <List as="ul">
                      <Header as="h4">Ingredients:</Header>
                      {recipe.ingredients.map((x: IIngredients, index: number) => {
                        return <List.Item key={index}>{x.text}</List.Item>
                      })}
                    </List>
                    <a href={recipe.url}>Go to Cooking Instructions</a>
                  </Grid.Column>
                  <div>
                    <span>     Add To Basket</span>
                    <Icon name="plus circle" size="large" onClick={this.addToBasket} />
                  </div>

                </Grid.Row>
              </Grid>
            </Segment>
            <Segment>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Nutrition Information</TableHeaderCell>
                    <TableHeaderCell></TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recipe.nutritionInfo.map((x: INutritionInfo, index: number) => {
                    return <Table.Row key={index + "NutritionInfo"}>
                      <TableCell>
                        {x.label}
                      </TableCell>
                      <TableCell>
                        {this.formatNutritionInfoTotal(x.total)}
                      </TableCell>
                    </Table.Row>
                  })}
                </TableBody>
              </Table>
            </Segment>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}, ["basketRecipes"])
