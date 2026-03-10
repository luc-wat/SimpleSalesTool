import { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import Banner from "./Banner";
import ErrorAlert from "./ErrorAlert";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center
                        justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg
                            shadow-lg p-6 max-w-md
                            w-full relative">
                <button
                    className="absolute top-2
                               right-2 text-gray-500
                               hover:text-gray-700"
                    onClick={onClose}
                >
                    &#x2715; {/* Close button */}
                </button>
                {children}
            </div>
        </div>
    );
};

const AddCustomerModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({ customerName: '', customerEmail: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClear = () => {
        setFormData({
            customerName: '',
            customerEmail: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
          onSubmit(formData);
        } catch (err) {
          throw err;
        } finally {
          handleClear();
        }

        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={() => {handleClear(); onClose();}}>
            <h2 className="text-lg font-bold">Submit Your Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm">Customer Name</label>
                    <input
                        className="w-full px-3 py-2
                                   border rounded-lg"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm">Customer Email</label>
                    <input
                        className="w-full px-3
                                   py-2 border rounded-lg"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500
                               text-white rounded-lg"
                >
                    Submit
                </button>
            </form>
        </Modal>
    );
};

const AddSaleModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({ customerName: '', customerEmail: '', createdDate: '', contractStartDate: '', contractEndDate: '', status: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClear = () => {
        setFormData({
            customerName: '',
            customerEmail: '',
            createdDate: '',
            contractStartDate: '',
            contractEndDate: '',
            status: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
          onSubmit(formData);
        } catch (err) {
          throw err;
        } finally {
          handleClear();
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={() => {handleClear(); onClose();}}>
            <h2 className="text-lg font-bold">Submit Your Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm">Customer Name</label>
                    <input
                        className="w-full px-3 py-2
                                   border rounded-lg"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm">Customer Email</label>
                    <input
                        className="w-full px-3
                                   py-2 border rounded-lg"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm">Creation Date</label>
                    <input
                        className="w-full px-3
                                   py-2 border rounded-lg"
                        name="createdDate"
                        value={formData.createdDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm">Contract Start Date</label>
                    <input
                        className="w-full px-3
                                   py-2 border rounded-lg"
                        name="contractStartDate"
                        value={formData.contractStartDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm">Contract End Date</label>
                    <input
                        className="w-full px-3
                                   py-2 border rounded-lg"
                        name="contractEndDate"
                        value={formData.contractEndDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm">Status</label>
                    <input
                        className="w-full px-3
                                   py-2 border rounded-lg"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500
                               text-white rounded-lg"
                >
                    Submit
                </button>
            </form>
        </Modal>
    );
};

const EditSaleModal = ({ isOpen, onClose, onSubmit, sale }) => {
    const [formData, setFormData] = useState({
        saleId: sale.sale_id,
        customerName: sale.name,
        customerEmail: sale.email,
        createdDate: sale.created_date,
        contractStartDate: sale.contract_start_date,
        contractEndDate: sale.contract_end_date,
        status: sale.status
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-bold">Submit Your Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm">Customer Name</label>
                    <input
                        className="w-full px-3 py-2
                                   border rounded-lg"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm">Customer Email</label>
                    <input
                        className="w-full px-3
                                   py-2 border rounded-lg"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm">Creation Date</label>
                    <input
                        className="w-full px-3
                                   py-2 border rounded-lg"
                        name="createdDate"
                        value={formData.createdDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm">Contract Start Date</label>
                    <input
                        className="w-full px-3
                                   py-2 border rounded-lg"
                        name="contractStartDate"
                        value={formData.contractStartDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm">Contract End Date</label>
                    <input
                        className="w-full px-3
                                   py-2 border rounded-lg"
                        name="contractEndDate"
                        value={formData.contractEndDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm">Status</label>
                    <input
                        className="w-full px-3
                                   py-2 border rounded-lg"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500
                               text-white rounded-lg"
                >
                    Submit
                </button>
            </form>
        </Modal>
    );
};


const Home = () => {
  const [error, setError] = useState(null);
  const [sales, setSales] = useState([]);
  const [showCustModal, setShowCustModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSale, setEditSale] = useState(null);

  const getSales = async () => {
    try {
      setError(null);
      const res = await axios.get("http://localhost:8080/sales");

      if (res.status === 200) {
        setSales(res.data);
      } else {
        throw new Error(res.body);
      }
    } catch (err) {
      console.error(err.message);
      setError(`Failed to fetch sales. Please try again.\n${err.message}`);
    }
  };

  const deleteSale = async (id) => {
    try {
      setError(null);
      const res = await axios.delete(`http://localhost:8080/sales/${id}`);

      if (res.status === 200) {
        setSales(sales.filter((sale) => sale.sale_id !== id));
      } else {
        throw new Error(res.body);
      }
    } catch (err) {
      console.error(err.message);
      setError(`Failed to delete sale. Please try again.\n${err.message}`);
    }
  };

  const addSale = async (data) => {
    try {
      setError(null);

      if (!validator.isEmail(data.customerEmail)) {
        throw new Error("Please enter a valid email address");
      }
      if (!validator.isLength(data.customerName, { min: 2, max: 80 })) {
        throw new Error("Customer name must be between 2 and 80 characters long");
      }
      if (!validator.isDate(data.createdDate, { format: "MM/DD/YYYY" })) {
        throw new Error("Please enter a valid created date in the format MM/DD/YYYY");
      }
      if (!validator.isDate(data.contractStartDate, { format: "MM/DD/YYYY" })) {
        throw new Error("Please enter a valid contract start date in the format MM/DD/YYYY");
      }
      if (!validator.isDate(data.contractEndDate, { format: "MM/DD/YYYY" })) {
        throw new Error("Please enter a valid contract end date in the format MM/DD/YYYY");
      }
      if (!validator.isLength(data.status, { max: 80 })) {
        throw new Error("Status must be less than 80 characters long");
      }

      const res = await axios.post(`http://localhost:8080/sales`, {
        "customerName": data.customerName,
        "customerEmail": data.customerEmail,
        "createdDate": data.createdDate,
        "contractStartDate": data.contractStartDate,
        "contractEndDate": data.contractEndDate,
        "status": data.status
      });

      if (res.status === 200) {
        getSales();
      } else {
        throw new Error(res.body);
      }
    } catch (err) {
      console.error(err.message);
      setError(`Failed to add sale. Please try again.\n${err.message}`);
    }
  };

  const editSaleHandler = async (data) => {
    try {
      setError(null);

      if (!validator.isEmail(data.customerEmail)) {
        throw new Error("Please enter a valid email address");
      }
      if (!validator.isLength(data.customerName, { min: 2, max: 80 })) {
        throw new Error("Customer name must be between 2 and 80 characters long");
      }
      if (!validator.isDate(data.createdDate, { format: "MM/DD/YYYY" })) {
        throw new Error("Please enter a valid created date in the format MM/DD/YYYY");
      }
      if (!validator.isDate(data.contractStartDate, { format: "MM/DD/YYYY" })) {
        throw new Error("Please enter a valid contract start date in the format MM/DD/YYYY");
      }
      if (!validator.isDate(data.contractEndDate, { format: "MM/DD/YYYY" })) {
        throw new Error("Please enter a valid contract end date in the format MM/DD/YYYY");
      }
      if (!validator.isLength(data.status, { max: 80 })) {
        throw new Error("Status must be less than 80 characters long");
      }

      const res = await axios.patch(`http://localhost:8080/sales/${data.saleId}`, {
        "customerName": data.customerName,
        "customerEmail": data.customerEmail,
        "createdDate": data.createdDate,
        "contractStartDate": data.contractStartDate,
        "contractEndDate": data.contractEndDate,
        "status": data.status
      });

      if (res.status === 200) {
        getSales();
      } else {
        throw new Error(res.body);
      }
    } catch (err) {
      console.error(err.message);
      setError(`Failed to edit sale. Please try again.\n${err.message}`);
    }
  };

  const addCustomer = async (data) => {
    try {
      setError(null);

      if (!validator.isEmail(data.customerEmail)) {
        throw new Error("Please enter a valid email address");
      }
      if (!validator.isLength(data.customerName, { min: 2, max: 80 })) {
        throw new Error("Customer name must be between 2 and 80 characters long");
      }

      const res = await axios.post(`http://localhost:8080/customers`, {
        "name": data.customerName,
        "email": data.customerEmail
      });

      if (res.status !== 200) {
        throw new Error(res.body);
      }
    } catch (err) {
      console.error(err.message);
      setError("Failed to add customer. Please try again.");
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div>
      <Banner />
      <div className="min-h-screen bg-white flex-grow justify-center items-center p-4">
        {error && <ErrorAlert error={error} />}
        {sales.length === 0 ? (
          <p>No sales available.</p>
        ) : (
          <ul role="list" className="divide-y divide-gray-100 w-full p-10">
            {sales.map((sale) => {
              sale.created_date = new Date(sale.created_date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'});
              sale.contract_start_date = new Date(sale.contract_start_date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'});
              sale.contract_end_date = new Date(sale.contract_end_date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'});

              return <li key={sale.sale_id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">{sale.name}</p>
                    <div className="flex justify-between gap-x-6 py-5">
                      <p className="mt-1 truncate text-xs/5 text-gray-500">Contact: {sale.email}</p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">Created: {sale.created_date}</p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">Start date: {sale.contract_start_date}</p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">End date: {sale.contract_end_date}</p>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm/6 text-gray-900">
                    <button
                      onClick={() => 
                        {
                          setEditSale(sale);
                          setShowEditModal(true);
                        }
                      }
                      className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200"
                    >
                      <MdModeEditOutline />
                    </button>
                    {editSale && (
                      <EditSaleModal
                          isOpen={showEditModal}
                          onClose={() => 
                            {
                              setShowEditModal(false);
                            }
                          }
                          onSubmit={(data) => {
                            editSaleHandler(data);
                            setEditSale(null);
                          }}
                          sale={editSale}
                      />
                    )}
                    <button
                      onClick={() => deleteSale(sale.sale_id)}
                      className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200"
                    >
                      <FaTrash />
                    </button>
                  </p>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="size-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs/5 text-gray-500">{sale.status}</p>
                  </div>
                </div>
              </li>
            })}
          </ul>
        )}
        <button onClick={() => setShowNewModal(true)} className="ml-10 p-10 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-small cursor-pointer">
          Add Sale
        </button>
        <AddSaleModal
                isOpen={showNewModal}
                onClose={() => setShowNewModal(false)}
                onSubmit={addSale}
            />
        <button onClick={() => setShowCustModal(true)} className="ml-10 p-10 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-small cursor-pointer">
          Add Customer
        </button>
        <AddCustomerModal
                isOpen={showCustModal}
                onClose={() => setShowCustModal(false)}
                onSubmit={addCustomer}
            />
      </div>
    </div>
  )
}

export default Home;