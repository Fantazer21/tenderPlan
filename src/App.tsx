import React from 'react';
import styles from "./app.module.scss"
import Main from "./ui/main/main";

function App() {
  return (
    <div className={styles.appWrapper}>
        <Main/>
    </div>
  );
}

export default App;
