import React from "react";

type ContextType = {
    test: any;
};

export const PriceContext = React.createContext<undefined | ContextType>(undefined);

export const PriceProvider = ({ children } : { children : any }) => {

    function test() {
        console.log('test');
    }

    const contextType: ContextType = {
        test: test,
    }

    return (
       <PriceContext.Provider value={contextType}>
            {children}
       </PriceContext.Provider>
    )
}