import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeLocale } from "../../store/general/generalSlice";

function LangChanger() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const locale = i18n.language;
  const changeLang = async (lng) => {
    setLoading(true);
    await i18n.changeLanguage(lng);
    await dispatch(changeLocale(lng));
    setLoading(false);
  };
  return (
    <>
      <select
        onChange={(e) => changeLang(e.target.value)}
        value={locale}
        className="form-select w-auto"
      >
        <option value="en">English</option>
        <option value="de">de</option>
        <option value="ar">عربي</option>
      </select>

      {loading && (
        <div className="page-loading">
          <i className="fa-solid fa-spinner fa-spin"></i>
        </div>
      )}
    </>
  );
}

export default LangChanger;
