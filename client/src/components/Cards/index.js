import React from "react";
import spinner from "../../../images/bulbasaur-gif.gif";
import Card from "./ItemCard";
import "./styles.css";

function Cards({ pokemones, pokemonsOfPagina, estadoFiltro }) {
  return (
    <div className="cardsContainer">
      <div className="cardsContainer--grid">
        {pokemones.length === 0 && estadoFiltro === "" && (
          <img src={spinner} style={{ height: "10em", marginTop: "10em" }} alt="" />
        )}
        {pokemones === "Pokemon no encontrado" && <h2>...Pokemon No Encontrado...</h2>}
        {typeof pokemonsOfPagina === "object" &&
          pokemonsOfPagina.map((p) => (
            <Card nombre={p.name} imgurl={p.imgurl} tipos={p.tipos} Id={p.id} />
          ))}
      </div>
    </div>
  );
}

export default Cards;