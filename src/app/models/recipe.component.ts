import { Ingredient } from "./ingredient.model";

export interface Recipe{
    title: string;
    description: string;
    imageURL: string;
    ingredients: Ingredient[];
}