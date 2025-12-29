import { useEffect, useState } from "react"

export default function Recipe()
{

    const [recipeName,setRecipeName]=useState("");
    const [ingerdients,setIngerdients]=useState("");
    const [instructions,setInstructions]=useState("");
    const [recipes,setRecipes]=useState([]);

    //save recipe to localstorage
    const saveRecipes=(updateRecipes)=>{
        localStorage.setItem("recipes",JSON.stringify(updateRecipes));
        setRecipes(updateRecipes);
    }

    //load recipes from localstorage
    useEffect(()=>{
        const storedRecipes=JSON.parse(localStorage.getItem("recipes"))||[];
        setRecipes(storedRecipes);
    },[])

    //add recipe

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!recipeName || !ingerdients || !instructions)
        {
            alert("please fill the all fields")
            return;
        }
        const newRecipe={
            id:Date.now(),name:recipeName,ingerdients,instructions
        }
        saveRecipes([...recipes,newRecipe]);

        //clear form date
        setRecipeName("");
        setIngerdients("");
        setInstructions("");
    }

    return(
        <>
        <div>
            <h1>Recipe Book</h1>
            <form onSubmit={handleSubmit}>
            <h2>Add Recipe</h2>
            
            <label>Name:</label><br />
            <input type="text" value={recipeName} onChange={(e)=>setRecipeName(e.target.value)} /><br />
            
            <label>Ingerdients(common separated)</label><br />
            <textarea value={ingerdients} onChange={(e)=>setIngerdients(e.target.value)}></textarea><br />
            
            <label>Instruction:</label><br />
             <textarea value={instructions} onChange={(e)=>setInstructions(e.target.value)}></textarea><br />
            
             <button type="submit">Add Recipe</button>
             </form>

            <h3>All Recipes</h3>
            {recipes.length===0 && <p>No recipes added yet</p>}
            {
                recipes.map((i)=>(
                    <div key={i.id}>
                        <h4>Recipe Name:{i.name}</h4>
                        <p><strong>Ingredients:</strong>{i.ingerdients}</p>
                         <p><strong>Instruction:</strong>{i.instructions}</p>
                         <button>Edit</button>
                         <button>Delete</button>

                    </div>
                ))
            }


        </div>
        </>
    )
}