import { useContext } from "react";
import { PriceContext } from "../../context/PriceContext";

export const HomePage = () => {

    const context = useContext(PriceContext);

    context?.test();

    return (<p>HomePage</p>);
}