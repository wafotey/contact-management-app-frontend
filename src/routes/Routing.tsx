import { Navigate, Route, Routes } from "react-router";
import NotFoundPage from "../pages/ not-found/NotFoundPage";
import ContactsPage from "../pages/contacts/ContactsPage";
import { ContactPage } from "../pages/contact/ContactPage";




const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contacts" />} /> 
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/contact/:id" element={<ContactPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Routing;
