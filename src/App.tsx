import { useEffect, useState } from "react";
import { getData } from "./api";
import { Select } from "./components/Select";
import "./styles/App.scss";
import { flatArray } from "./utils/flatArray";
import { splitOnPrimitiveArrs } from "./utils/splitOnPrimitiveArrs";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [initialData, setInitialData] = useState<Array<any>>([]);

  const [selectedValues, setSelectedValues] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await getData();

        const flatedData = flatArray(data.testArr);
        const primitives = splitOnPrimitiveArrs(flatedData);

        setInitialData(primitives);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.response?.data || "Error");
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="app">
      <div className="container">
        <div className="app__wrapper">
          <h2 className="app__title">Тестовое задание</h2>
          <div className="app__content">
            {initialData.length > 0 && (
              <>
                <div className="app__selects">
                  {initialData.map((arr, i) => (
                    <Select key={i} options={arr} />
                  ))}
                </div>
                <ul className="app__selected-items">
                  {selectedValues.map((item, index) => (
                    <li key={item + index}>{item}</li>
                  ))}
                </ul>
              </>
            )}
            {isLoading && <div className="app__loading">Загрузка...</div>}
            {errorMessage && <div className="app__error-message">{errorMessage}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
