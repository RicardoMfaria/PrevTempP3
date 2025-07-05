import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import axios from 'axios';
import striptags from 'striptags';

const Busca = () => {

  const [localizacao, setLocalizacao] = useState('-23.561167625063238,-46.65648357473211');

  const [opcao, setOpcao] = useState(null);

  const [climaTempo, setClimaTempo] = useState(null);

  const DELAY_BUSCA = 5000;

  let tempBusca;

  const busca = async (lat, lon) => {
    const { data } = await axios.get('http://localhost:3000/current-weather', {
      params: {
        lat,
        lon
      }
    });
    setClimaTempo(data);
  };

 useEffect(() => {
  if (tempBusca) clearTimeout(tempBusca);

  tempBusca = setTimeout(() => {
    let lat = '';
    let lon = '';
    let i = 0;

    for (; i < localizacao.length; i++) {
      if (localizacao[i] === ',') {
        i++;
        break;
      }
      lat += localizacao[i];
    }

    for (; i < localizacao.length; i++) {
      lon += localizacao[i];
    }

    if (lat && lon && opcao) {
      busca(lat, lon);
    }
  }, DELAY_BUSCA);

  return () => {
    clearTimeout(tempBusca);
    };
  }, [localizacao, opcao]);

  return (
    <div className="flex flex-column align-items-center mt-5 p-4">
      <label 
        htmlFor="localizacao" 
        className="mb-2 font-bold text-lg">
        Latitude, Longitude:
      </label>
      
      <InputText 
        id="localizacao"
        type="text"
        value={localizacao}
        onChange={(e) => setLocalizacao(striptags(e.target.value))}
        className="p-inputtext p-component p-inputtext-lg w-20rem mb-4 border-round-lg"
      />

      <div className="flex gap-4 mb-3">
        <div className="flex align-items-center">
          <RadioButton
            inputId="MinMax"
            name="opcao"
            value="temperatura"
            onChange={(e) => setOpcao(e.value)}
            checked={opcao === 'temperatura'}
          />
          <label 
            htmlFor="MinMax" 
            className="ml-2">
            Temperaturas
          </label>
        </div>

        <div className="flex align-items-center">
          <RadioButton
            inputId="PresUmid"
            name="opcao"
            value="pressao"
            onChange={(e) => setOpcao(e.value)}
            checked={opcao === 'pressao'}
          />
          <label 
            htmlFor="PresUmid" 
            className="ml-2">
            Pressão / Umidade
            </label>
        </div>
      </div>

    </div>
  );
};

export default Busca;