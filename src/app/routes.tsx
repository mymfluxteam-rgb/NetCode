import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { BuySourceCode } from "./components/BuySourceCode";
import { Privacy } from "./components/Privacy";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { NotFound } from "./components/NotFound";
import { ProductPage } from "./components/ProductPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "buy-source-code", Component: BuySourceCode },
      { path: "product/:id", Component: ProductPage },
      { path: "privacy", Component: Privacy },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
