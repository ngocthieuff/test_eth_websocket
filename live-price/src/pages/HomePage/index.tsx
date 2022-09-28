import { useContext } from "react";
import { PriceContext } from "../../context/PriceContext";

export const HomePage = () => {

    const context = useContext(PriceContext);

    context?.test();
    return (<div>
        <p>Current block {context?.currentBlock}</p>
    </div>);
}