import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ProductcontextProvider from "./Context/Product.jsx";
import { WishListContextProvider } from "./Context/WishListContext.jsx";
import FilteredItemsProvider from "./Context/FilteredItems.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WishListContextProvider>
      <ProductcontextProvider>
        <FilteredItemsProvider>
          <App />
        </FilteredItemsProvider>
      </ProductcontextProvider>
    </WishListContextProvider>
  </BrowserRouter>
);
