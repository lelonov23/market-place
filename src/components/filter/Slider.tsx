import Nouislider from "nouislider-react";
import React from "react";
import { Store } from "../../store/Store";

const Slider: React.FC = () => {
  //   const [priceRange, setPriceRange] = React.useState<number[]>([]);

  //   React.useEffect(() => {
  //     setPriceRange(Store.priceRange);
  //     console.log(Store.priceRange);
  //   }, [Store.currentProducts]);

  return (
    <div>
      <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} connect />
    </div>
  );
};

export default Slider;
