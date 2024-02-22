import React, { useEffect, useState } from "react";
import AccountTabs from "../Account/AccountTabs";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import useGetApi from "../../customHooks/UseGetApi";
import { baseUrl } from "../../utilities/baseUrl";

function EditAddress() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [address, addressLoaded , , , setAddress] = useGetApi(`${baseUrl}addresses/${id}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    city: Yup.string().required("name is required"),
    phone: Yup.string()
      .matches(/^(002)?01[0125][0-9]{8}$/, "Invalid phone")
      .required("phone is required"),
    details: Yup.string().required("details is required"),
  });

  const formik = useFormik({
    initialValues: {
        name: address?.data.name ? address.data.name : "loading...",
        phone: address?.data.phone ? address.data.phone : "loading...",
        city: address?.data.city ? address.data.city : "loading...",
        details: address?.data.details ? address.data.details : "loading...",
    },
    validationSchema,
    enableReinitialize:true,
    validateOnBlur:true,
    validateOnChange:true,

    onSubmit: () => {
      console.log(id);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/addresses");
      }, 1000);
    },
  });

  useEffect(() => {
    if (addressLoaded && address) {
      // const { name, phone, city, details } = address.data;
      // formik.setValues({ name, phone, city, details });
      // formik.setTouched({});
      
    }
  }, [ addressLoaded, address]);

  

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
                  <h1 className="wrapper-title">edit address</h1>
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
                    disabled={!(formik.isValid && formik.dirty)}
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

export default EditAddress;
