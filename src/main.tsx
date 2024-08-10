import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
   <Provider store={store}>
   <App />
   <Toaster/>
   </Provider>
  </ThemeProvider>
  </BrowserRouter>
);
