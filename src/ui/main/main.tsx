import React, {useState} from 'react';
import styles from "./main.module.scss"

type ChipType = {
    id: number
    value: string
}

const chipsStore: ChipType[] = []


const Main = () => {
    const [store, setStore] = useState(chipsStore)
    const [chipValue, setChipValue] = useState<string>("")
    const [error, setError] = useState(false)


    const updateStore = (value: string, targetValue: string) => {
        setError(false)
        const valueArray = targetValue.split("")
        if (valueArray.filter(el => el === '"').length % 2) {
            setError(true)
        } else {
            setStore([...store, {id: store.length + 1, value: value}])
            setChipValue("")
        }
    }

    const editChip = (id: number, value: string) => {
        const newStore = store.map(chip => {
            if (chip.id === id) {
                return {
                    id: id, value: value
                }
            } else return chip
        })
        setStore(newStore)
        setChipValue("")
    }

    const deleteChip = (id: number) => {
        setStore(store.filter(chip => chip.id !== id))
    }

    const inputEditor = (targetValue: string) => {
        const value = targetValue.replace(/^(,+)/g, '');
        setChipValue(value ?? '')
        const valueArray = targetValue.split("")
        if (valueArray[valueArray.length - 1] === "," && valueArray.length > 1) {
            updateStore(chipValue, targetValue)
        }
    }

    return (
        <div className={styles.mainWrapper}>
            {
                store.map(chip => {

                    return <div className={styles.inputWrapper}>
                        <div key={chip.id} className={styles.chip}>
                            <input value={chip.value} onBlur={(e) => editChip(chip.id, e.currentTarget.value)}
                                   className={styles.inputChip}
                                   placeholder={chip.value}
                                   onChange={(e) => editChip(chip.id, e.currentTarget.value)}
                            />
                            <button onClick={() => deleteChip(chip.id)} className={styles.removeChipButton}>X</button>
                        </div>
                    </div>
                })
            }
            <div>
                <input
                    value={chipValue}
                    onBlur={(e) => {
                        return e.currentTarget.value ? updateStore(chipValue, e.currentTarget.value) : null
                    }}
                    className={styles.input}
                    placeholder={"Введите ключевые слова"}
                    onChange={(e) => {
                        inputEditor(e.currentTarget.value)
                    }}
                />
                {error ? <div className={styles.error}>Закройте кавычки с двух сторон</div> : null}
            </div>
        </div>
    );
};

export default Main;