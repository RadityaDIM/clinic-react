import { pokemonService } from "../../services/pokemonService";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ModalDetailPokemon } from "../modalDetailPokemon";

export const Pokemon = () => {
  // console.log(pokemonService.getAll());
  // state paling atas
  const [pokemon, setPokemon] = useState([]);
  const [modalShow, setModalShow] = useState();
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); //siku default value

  let fetchData = async () => {
    const response = await pokemonService.getAll();
    setPokemon(response.results);
  };

  let handleDetail = async (url) => {
    setModalShow(true);
    const response = await pokemonService.getById(url);
    setPokemonDetails(response);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {/* index bawaan */}
          {pokemon.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.name}</td>
                <td onClick={() => handleDetail(data.url)}>Detail</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ModalDetailPokemon
        data={pokemonDetails}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
