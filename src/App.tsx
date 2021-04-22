import { useEffect, useState } from "react";
import { getData } from "./api";
import { Select } from "./components/Select";
import { SelectedItemsList } from "./components/SelectedItemsList";
import "./styles/App.scss";
import { flatArray } from "./utils/flatArray";
import { splitOnPrimitiveArrs } from "./utils/splitOnPrimitiveArrs";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [initialData, setInitialData] = useState<Array<Array<any>>>([]);
  // для перехода между состояниями списка
  const [lastSteps, setLastSteps] = useState<Array<Array<string>>>([[]]);
  const [currentStep, setCurrentStep] = useState(0);
  // текущее состояние списка
  const [selectedValues, setSelectedValues] = useState<Array<string>>([]);
  const addItemsInSelectedValues = (
    prevSelectItems: Array<string>,
    newSelectItems: Array<string>
  ) => {
    const newSelectedValues: Array<string> = [];
    // убираем значения из селекта, которые уже были выбраны
    for (let item of selectedValues) {
      let isItemInPrevSelected = false;
      for (let prevSelected of prevSelectItems) {
        if (item === prevSelected) {
          isItemInPrevSelected = true;
        }
      }
      if (!isItemInPrevSelected) {
        newSelectedValues.push(item);
      }
    }
    // и пушим новые
    newSelectedValues.push(...newSelectItems);
    setSelectedValues(newSelectedValues);

    if (lastSteps.length > 9) {
      const newSteps = Array.from(lastSteps);
      newSteps.shift();
      newSteps.push(newSelectedValues);
      setLastSteps(newSteps);
      return;
    }

    setCurrentStep((prev) => prev + 1);
    setLastSteps((prev) => [...prev, newSelectedValues]);
  };

  const resetApp = () => {
    // глубокая копия начального массива
    const newInitialData: Array<Array<any>> = [];
    for (let arr of initialData) {
      newInitialData.push([...arr]);
    }
    // сохраняем последние 10 шагов состояния и сбрасываем текущее состояние до исходного
    localStorage.setItem("lastSteps", JSON.stringify(lastSteps));
    localStorage.setItem("currentStep", JSON.stringify(currentStep));
    setSelectedValues([]);
    setInitialData(newInitialData);
  };

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

    const setDataFromLocalStorage = () => {
      const currentStep = localStorage.getItem("currentStep");
      const lastSteps = localStorage.getItem("lastSteps");
      if (currentStep) {
        setCurrentStep(JSON.parse(currentStep));
      }
      if (lastSteps) {
        setLastSteps(JSON.parse(lastSteps));
      }
    };

    // при инициализации приложения достаем данные с сервера и из local storage
    setDataFromLocalStorage();
    fetchData();
  }, []);

  const onCancelButtonClick = () => {
    if (currentStep === 0) {
      return;
    }

    setSelectedValues([...lastSteps[currentStep - 1]]);
    setCurrentStep(currentStep - 1);
  };

  const onForwardButtonClick = () => {
    if (currentStep === 9) {
      return;
    }

    setSelectedValues([...lastSteps[currentStep + 1]]);
    setCurrentStep(currentStep + 1);
  };

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
                    <Select
                      addItemsInSelectedValues={addItemsInSelectedValues}
                      key={i}
                      options={arr}
                    />
                  ))}
                </div>
                <SelectedItemsList selectedValues={selectedValues} />
              </>
            )}
            {isLoading && <div className="app__loading">Загрузка...</div>}
            {errorMessage && <div className="app__error-message">{errorMessage}</div>}
          </div>
          <button onClick={resetApp} className="app__restart-btn">
            Сбросить
          </button>
          <button
            disabled={currentStep === 0}
            onClick={onCancelButtonClick}
            className="app__cancel-btn app__btn"
          >
            Отмена
          </button>
          <button
            disabled={currentStep === 9}
            onClick={onForwardButtonClick}
            className="app__forward-btn app__btn"
          >
            Вперед
          </button>
        </div>
      </div>
    </section>
  );
};

export default App;
