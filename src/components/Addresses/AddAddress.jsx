import React, { useState } from "react";
import AccountTabs from "../Account/AccountTabs";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "../../utilities/baseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import actAddAddresses from "../../store/addresses/act/actAddAddresses";
import { useDispatch } from "react-redux";

function AddAddress() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  async function addAddress(values) {
    setLoading(true);
    dispatch(actAddAddresses(values)).unwrap()
    .then((data)=>{
      setLoading(false);
      toast.success(data.message);
      navigate("/addresses");
    })
    .catch(data=>{
      setLoading(false);
      toast.error(data);
    });
  }

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    city: Yup.string().required(),
    phone: Yup.string()
      .matches(/^(002)?01[0125][0-9]{8}$/, )
      .required(),
    details: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      city: "",
      details: "",
    },
    // validationSchema,
    onSubmit: (values)=>{
      addAddress(values);
    },
  });
  return (
    <>
      <Helmet>
        <title>FreshCart | Addresses</title>
      </Helmet>
      <section className="section-style account-section">
        <div className="container">
          <div className="row gx-lg-5">
            <div className="col-lg-3">
              <AccountTabs active={"addresses"} />
            </div>
            <div className="col-lg-9">
              <div className="addresses-wrapper">
                <div className="wrapper-head">
                  <h1 className="wrapper-title">add address</h1>
                </div>

                <form className="address-form" onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="">
                      name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.errors.name && formik.touched.name && (
                      <div className="mt-2 text-danger">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                      phone
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.errors.phone && formik.touched.phone && (
                      <div className="mt-2 text-danger">
                        {formik.errors.phone}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="city">
                      city
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.errors.city && formik.touched.city && (
                      <div className="mt-2 text-danger">
                        {formik.errors.city}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="details">
                      details
                    </label>
                    <textarea
                      className="form-control"
                      name="details"
                      rows={4}
                      value={formik.values.details}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    ></textarea>
                    {formik.errors.details && formik.touched.details && (
                      <div className="mt-2 text-danger">
                        {formik.errors.details}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`btn bg-main text-white px-4 loading-btn ${
                      loading ? "loading-overlay" : ""
                    }`}
                  >
                    Confirm
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddAddress;
