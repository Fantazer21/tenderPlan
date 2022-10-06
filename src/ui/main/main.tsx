import React, {useState} from 'react';
import styles from "./main.module.scss"

type ChipType = {
    id: number
    value: string
}

const chipsStore: ChipType[] = []


const Main = () => {
    const [store, setStore] = useState(chipsStore)
    const [value, setValue] = useState("")

    const updateStore = (value: string) => {
        setStore([...store, {id: store.length + 1, value: value}])
        setValue("")
    }

    const deleteChip = (id: number) => {
        setStore(store.filter(chip => chip.id !== id))
    }

    return (
        <div className={styles.mainWrapper}>
            {
                store.map(chip => {
                    return <div className={styles.chip}>
                        <input className={styles.inputChip} placeholder={chip.value}/>
                        <button onClick={() => deleteChip(chip.id)} className={styles.removeChipButton}>X</button>
                    </div>
                })
            }
            <div>
                <input value={value} onBlur={() => updateStore(value)} className={styles.input}
                       placeholder={"Введите ключевые слова"} onChange={(e) => setValue(e.currentTarget.value)}/>
            </div>
        </div>
    );
};

export default Main;