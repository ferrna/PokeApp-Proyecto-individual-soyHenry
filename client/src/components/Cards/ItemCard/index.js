import React, { Suspense, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CardStats from "./CardStats";
import { v4 as uuidv4 } from "uuid";
import { pad, switchBgStyle, switchTypeStyle } from "../../utils/colours/functions";
import { upperCaseName } from "../../utils/functions";
import axios from "axios";
import "./styles.css";

export default function Card({ nombre, imgurl, tipos, Id }) {
  const name = upperCaseName(nombre);

  const [pokeStats, setPokeStats] = useState();

  // fetch App for pokemon's Stats
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      axios(`pokemons/${Id}`).then((res) => setPokeStats({ ...res.data }));
    }
    return () => {
      mounted = false;
    };
  }, [Id]);

  return (
    <div className={"card " + switchBgStyle(tipos[0])}>
      <div className="card--typesAndId">
        <div className="card--typesAndId_types">
          {tipos &&
            tipos.map((p) => (
              <span key={uuidv4()} className={switchTypeStyle(p) + " type"}>
                {p}
              </span>
            ))}
        </div>
        <span className="">#{pad(Id)}</span>
      </div>
      <div className="card--Center">
        <img src={imgurl} alt={name} className="card--Center_img" width="150" />
        <h2 className="card--Center_pokeName">{name}</h2>

        {/* TODO: agregar un componente loader como fallback del componente  CardStats */}
        <Suspense fallback={<></>}>{pokeStats && <CardStats pokeData={pokeStats} />}</Suspense>

        <NavLink to={`/home/pokemons/${Id}`} className="card--Center_details">
          Ver detalles
        </NavLink>
      </div>
    </div>
  );
}

/* <div className={c.card}>
      <div className={c.top}>
        <div className={c.type1}>
          <i className={switchTypeStyle(tiposº1)}>{tiposº1}</i>
        </div>
        <span className={c.id}>#{pad(Id)}</span>
      </div>
      <div className={c.types}>
        {tiposS &&
          tiposS.map((p) => <i className={switchTypeStyle(p)}>{p}</i>)}
      </div>
      <div className={c.divpoke}>
        <img src={imgurl} alt="" className={c.imgpoke} />
        <h3>{nombre[0].toUpperCase() + nombre.slice(1)}</h3>
      </div>
      <NavLink to={`/home/pokemons/${Id}`} className={c.details}>
        Details
      </NavLink>
    </div> */
