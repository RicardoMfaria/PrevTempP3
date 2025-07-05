import { Card } from 'primereact/card';
import striptags from 'striptags';

const Exibir = ({clima, opcao }) => {
  const {
    temperaturaMinima,
    temperaturaMaxima,
    pressaoAtmosferica,
    umidadeRelativaAr,
  } = clima;

  return (
    <Card
      title="Resultado"
      className="mb-4 p-5 mx-5"
      style={{ backgroundColor: '#A7FFEB' }}
    >
    <div className="mt-3 flex flex-column align-items-center">
       {opcao === 'temperatura' && (
        <div className="flex flex-column gap-2">
            <p><strong>Temperatura mínima:</strong> {striptags(String(temperaturaMinima))} °C</p>
            <p><strong>Temperatura máxima:</strong> {striptags(String(temperaturaMaxima))} °C</p>
        </div>
        )}

        {opcao === 'pressao' && (
        <div className="flex flex-column gap-2">
            <p><strong>Pressão atmosférica:</strong> {striptags(String(pressaoAtmosferica))} hPa</p>
            <p><strong>Umidade relativa do ar:</strong> {striptags(String(umidadeRelativaAr))} %</p>
        </div>
        )}
        </div>
    </Card>
  );
};
export default Exibir;