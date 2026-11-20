import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PRODUKTY = [
  { id: 1, nazwa: "Notes", cena: 12.5 },
  { id: 2, nazwa: "Długopis", cena: 3.2 },
  { id: 3, nazwa: "Plecak", cena: 89.0 },
  { id: 4, nazwa: "Kalkulator", cena: 45.9 },
  { id: 5, nazwa: "Zakreślacz", cena: 4.75 },
];

const suma = (pozycje) =>
  pozycje.reduce((acc, p) => acc + p.cena * p.ilosc, 0);

const logKoszyk = (pozycje) => {
  console.log(
    `Koszyk: ${pozycje.length} pozycji; suma: ${suma(pozycje).toFixed(2)}`
  );
};

export default function App() {
  const [koszyk, setKoszyk] = useState([]);

  const dodajDoKoszyka = (produkt) => {
    const istnieje = koszyk.some((p) => p.id === produkt.id);
    const nowyKoszyk = istnieje
      ? koszyk.map((p) =>
          p.id === produkt.id ? { ...p, ilosc: p.ilosc + 1 } : p
        )
      : [...koszyk, { ...produkt, ilosc: 1 }];

    setKoszyk(nowyKoszyk);
    logKoszyk(nowyKoszyk);
  };

  const usunZKoszyka = (id) => {
    const nowyKoszyk = koszyk.filter((p) => p.id !== id);
    setKoszyk(nowyKoszyk);
    logKoszyk(nowyKoszyk);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2>Sklepik szkolny</h2>

      <div className="list-group mb-4">
        {PRODUKTY.map((produkt) => (
          <div
            key={produkt.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {produkt.nazwa} – {produkt.cena.toFixed(2)} zł
            </span>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => dodajDoKoszyka(produkt)}
            >
              Do koszyka
            </button>
          </div>
        ))}
      </div>

      <h3>Koszyk ({koszyk.length} pozycji)</h3>

      {koszyk.length === 0 ? (
        <div className="alert alert-info">Koszyk jest pusty</div>
      ) : (
        <>
          <table className="table table-sm align-middle">
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Ilość</th>
                <th>Cena</th>
                <th>Suma</th>
                <th>Akcja</th>
              </tr>
            </thead>
            <tbody>
              {koszyk.map((p) => (
                <tr key={p.id}>
                  <td>{p.nazwa}</td>
                  <td>{p.ilosc}</td>
                  <td>{p.cena.toFixed(2)} zł</td>
                  <td>{(p.cena * p.ilosc).toFixed(2)} zł</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => usunZKoszyka(p.id)}
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fw-bold">Suma: {suma(koszyk).toFixed(2)} zł</p>
        </>
      )}
    </div>
  );
}