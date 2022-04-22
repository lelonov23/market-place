import { observer } from "mobx-react";
import React from "react";
import { Store } from "../../store/Store";
import { Button, Form } from "react-bootstrap";

import styles from "./Filter.module.css";

interface Dict {
  [index: string]: any;
}

export interface FOpts {
  name: string;
  value: string;
  checked: boolean;
}

interface FilterProps {
  type: string | undefined;
}

const Filter: React.FC<FilterProps> = observer(({ type }) => {
  const opts = Store.filterOptions;
  const dictionary: Dict = {
    display: "Дисплей",
    os: "Операционная система",
    battery: "Батарея",
    resolution: "Разрешение экрана",
    processor: "Процессор",
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name, value } = e.target;
    const filterResult: FOpts = { checked, name, value };
    Store.addFilterData(filterResult, type);
  };

  return (
    <div className={styles.filter}>
      <h3>Фильтры</h3>
      <ul>
        {Object.keys(opts).map((key) => {
          return (
            <li className={styles.param} key={key}>
              <h4>{dictionary[key]}</h4>
              {opts[key].map((opt: any) => {
                return (
                  <div className={styles.opt} key={opt}>
                    <Form.Check
                      name={key}
                      value={opt}
                      id={opt}
                      onChange={(e) => changeHandler(e)}
                    />
                    {/* <input
                      type="checkbox"
                      name={key}
                      value={opt}
                      id={opt}
                      onChange={(e) => changeHandler(e)}
                    /> */}
                    <label htmlFor={opt}>{opt}</label>
                  </div>
                );
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Filter;
