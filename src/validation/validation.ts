import Validator from "validator";
import { _Order } from "../types/order";

import { isEmpty } from "./isEmpty";
export const ValidateRegisterInput = (data: any) => {
  let errors = {
    itemId: "",
    quantity: "",
    cardNo: "",
    expiryDate: "",
    cvc: "",
  };
  var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  data.itemId = !isEmpty(data.itemId) ? data.itemId : "";
  if (!Validator.isLength(data.itemId, { min: 1, max: 1000 })) {
    errors.itemId = "itemId must be at least 1 characters";
  }
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";
  if (!Validator.isLength(data.quantity, { min: 1, max: 1000 })) {
    errors.quantity = "quantity must be at least 1";
  }
  data.cardNo = !isEmpty(data.cardNo) ? data.cardNo : "";
  if (!Validator.isLength(data.cardNo, { min: 1, max: 1000 })) {
    errors.cardNo = "cardNo must be at least 1";
  }
  data.cardNo = !isEmpty(data.expiryDate) ? data.expiryDate : "";
  if (!Validator.isLength(data.expiryDate, { min: 1, max: 1000 })) {
    errors.expiryDate = "expiryDate must be at least 1";
  }
  data.cardNo = !isEmpty(data.CVC) ? data.CVC : "";
  if (!Validator.isLength(data.CVC, { min: 3, max: 4 })) {
    errors.cvc = "expiryDate must be at least 3";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
