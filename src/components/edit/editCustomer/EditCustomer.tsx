import React from "react";
import Card from "../../UI/card/Card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classes from "./EditCustomer.module.scss";
import { IcustomersTable } from "../../../interfaces/Itable";
import { Icon } from "@iconify/react";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";

const EditCustomer: React.FC<{ customer?: IcustomersTable }> = (props) => {
  const { t } = useTranslation();
  return (
   <>
   </>
  );
};

export default EditCustomer;
