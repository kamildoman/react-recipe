import React, { useState } from "react";
import style from "./recipe.module.css"

function Recipe(props){

    const [expand, setExpand] = useState(false)

    function showDetails(){
        return (
            <div>
            <ul className={style.list}>
                {props.ingredients.map(ing => (
                    <li>{ing.text}</li>
                ))}
            </ul>
            <p className={style.calories}>Calories: {props.calories}</p>
            <a href={props.url}><img className={style.bigImg} src={props.image} alt="img" /></a>
            </div>
        )
    }

    function toggleExpand(){
        return setExpand(!expand)
    }



    return (
        <div style={{ backgroundImage: !expand && `url(${props.image})`}}  className={expand ? style.expanded : style.recipe}>
            <h1 onClick={() => toggleExpand()} className={!expand ? style.title : style.titleExpanded}>{props.title}</h1>
            {expand && showDetails()}
            
        </div>
    );
}


export default Recipe