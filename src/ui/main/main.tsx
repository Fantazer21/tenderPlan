import React, { useState } from "react";
import styles from "./main.module.scss";

type ChipType = {
  id: number;
  value: string;
};

const chipsStore: ChipType[] = [];

const Main = () => {
  const [store, setStore] = useState(chipsStore);
  const [chipValue, setChipValue] = useState<string>("");
  const [error, setError] = useState(false);

  const updateStore = (value: string, targetValue: string) => {
    setError(false);
    const valueArray = targetValue.split("");
    const hasNonClosedQuote = valueArray.filter((el) => el === '"').length % 2;
    if (hasNonClosedQuote) {
      setError(true);
    } else {
      setStore([...store, { id: store.length + 1, value: value }]);
      setChipValue("");
    }
  };

  const editChip = (id: number, value: string) => {
    const newStore = store.map((chip) => {
      if (chip.id !== id) return chip;
      return {
        id: id,
        value: value,
      };
    });
    setStore(newStore);
    setChipValue("");
  };

  const deleteChip = (id: number) => {
    setStore(store.filter((chip) => chip.id !== id));
  };

  const inputEditor = (targetValue: string) => {
    const value = targetValue.replace(/^(,+)/g, "");
    setChipValue(value ?? "");
    const valueArray = targetValue.split("");
    if (valueArray.length > 1 && valueArray.at(-1) === ",") {
      updateStore(chipValue, targetValue);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      {store.map((chip) => {
        return (
          <div className={styles.inputWrapper}>
            <div key={chip.id} className={styles.chip}>
              <input
                value={chip.value}
                onBlur={({ target: { value } }) => editChip(chip.id, value)}
                className={styles.inputChip}
                placeholder={chip.value}
                onChange={({ target: { value } }) => editChip(chip.id, value)}
              />
              <button
                onClick={() => deleteChip(chip.id)}
                className={styles.removeChipButton}
              >
                X
              </button>
            </div>
          </div>
        );
      })}
      <div>
        <input
          value={chipValue}
          onBlur={({ target: { value } }) => {
            if (!value) return;
            updateStore(chipValue, value);
          }}
          className={styles.input}
          placeholder={"Введите ключевые слова"}
          onChange={({ target: { value } }) => {
            inputEditor(value);
          }}
        />
        {error && (
          <div className={styles.error}>Закройте кавычки с двух сторон</div>
        )}
      </div>
    </div>
  );
};

export default Main;
