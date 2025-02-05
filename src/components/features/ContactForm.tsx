import { useState } from "react";
import { Contact } from "../../store/contact.state";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";

interface ContactFormProps {
  initialData?: Contact;
  onSubmit: (data: Contact) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialData, onSubmit }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [formData, setFormData] = useState<Contact>(initialData || {
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    alternativePhone: "",
    bookmarked: false,
  } as Contact);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: id || formData.id
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-xl">
      <div className="flex items-center mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft
            className="h-6 w-6 text-gray-600"
            strokeWidth={1.5}
          />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 ml-4">
          {id ? "Edit Contact" : "Create New Contact"}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value  ?? ''}))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 placeholder:italic"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Primary Phone *
            </label>
            <input
              type="tel"
              id="phone"
              required
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="123-456-7890"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value  ?? ''}))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 placeholder:italic"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value ?? ''}))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 placeholder:italic"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Street Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="123 Main St, Springfield, IL"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value ?? '' }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 placeholder:italic"
            />
          </div>

          <div>
            <label htmlFor="alternatePhone" className="block text-sm font-medium text-gray-700 mb-2">
              Alternate Phone
            </label>
            <input
              type="tel"
              id="alternatePhone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="123-456-7890"
              value={formData.alternativePhone}
              onChange={(e) => setFormData(prev => ({ ...prev, alternativePhone: e.target.value ?? '' }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 placeholder:italic"
            />
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center justify-between border-t pt-8">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="bookmarked"
            checked={formData.bookmarked}
            onChange={(e) => setFormData(prev => ({ ...prev, bookmarked: e.target.checked }))}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="bookmarked" className="ml-3 text-sm text-gray-600">
            Bookmark this contact
          </label>
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
        >
          {id ? "Update Contact" : "Create Contact"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;