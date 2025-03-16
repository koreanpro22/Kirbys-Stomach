"use server"

import { getAllIngredients } from "./actions";

type Ingredient = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
};

export default async function() {
    
    const items = await getAllIngredients();
    console.log(items)
    return <div>
        <h1>Pantry</h1>
        {items?.map((item: Ingredient, idx: number) => {
            console.log(item)
            return <div key={idx}>
                <p>{item.name} {item.quantity} {item.unit}</p>
            </div>
        })}
    </div>
}