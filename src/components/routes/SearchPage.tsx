import { observer } from "mobx-react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { Store } from "../../store/Store";
import SearchCategory from "../search/SearchCategory";

const SearchPage: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  if (query) {
    const res = Store.searchProducts(query);

    return (
      <div>
        <ul>
          {res.map((cat) => {
            return (
              <li key={cat[0].categoryId}>
                <SearchCategory cat={cat} query={query} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else return <h3>Введите поисковой запрос...</h3>;
});

export default SearchPage;
