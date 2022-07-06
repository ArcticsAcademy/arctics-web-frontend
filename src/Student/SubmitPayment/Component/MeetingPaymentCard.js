// Stylesheet
import "../std_submit-payment.css";

// Icons
import Clock from "../img/blue-clock.svg";
import Account from "../img/blue-credit-card.svg";
import Consultant from "../img/blue-bear.svg";
import Money from "../img/blue-money.svg";
import Coupon from "../img/blue-coupon.svg";
import { ReactComponent as Upload } from "../img/white-upload.svg"

import { ParamContext } from "../../../ContextReducer";
import { useContext } from "react";

// Placeholder Variable
const DefaultData = {
  time: "XX/XX/XX（X）XX:XX~XX:XX",
  accountNo: "700-00-000000-0",
  consultantName: "OOO",
  consultantSchool: "OOOO大學",
  consultantMajor: "OO系",
  price: 200,
};


// Component
const MeetingPaymentCard = ({ demo, data=DefaultData, handleUpload, handleSubmit }) => {
  const Context = useContext(ParamContext)

  const Data = {
    time: "2021/08/20（五）19:00~19:30",
    accountNo: "700-00-000000-0",
    consultantName: "梁",
    consultantSchool: "國立台灣大學",
    consultantMajor: "外國語文學系",
    price: "700",
    actualPrice: "350",
    discount: "LNCH1"
  }

  return (
    <div className="std_meeting-payment-container">
      <div className="std_meeting-payment-card-container">
        <div className="std_meeting-payment">
          <div className="std_meeting-payment-line">
            <div className="std_meeting-payment-left">
              <img className="std_meeting-payment-icon" src={Clock} alt="" />
              <p className="std_meeting-payment-title">時間</p>
              <p className="std_meeting-payment-content">{Data.time}</p>
            </div>
            <div className="std_meeting-payment-right">
              <img className="std_meeting-payment-icon" src={Account} alt="" />
              <p className="std_meeting-payment-title">Arctics帳號</p>
              <p className="std_meeting-payment-content">{Data.accountNo}</p>
            </div>
          </div>
          <div className="std_meeting-payment-line">
            <div className="std_meeting-payment-left">
              <img className="std_meeting-payment-icon" src={Consultant} alt="" />
              <p className="std_meeting-payment-title">顧問</p>
              <p className="std_meeting-payment-content">{Data.consultantName}同學<br />{Data.consultantSchool+' '+Data.consultantMajor}
              </p>
            </div>
            <div className="std_meeting-payment-right">
              <img className="std_meeting-payment-icon" src={Coupon} alt="" />
              <p className="std_meeting-payment-title std_meeting-payment-title-discount">優惠代碼</p>
              <p className="std_meeting-payment-content">無</p>
            </div>
          </div>
          <div className="std_meeting-payment-line">
            <div className="std_meeting-payment-left">
              <img className="std_meeting-payment-icon" src={Money} alt="" />
              <p className="std_meeting-payment-title">計價</p>
              <p className="std_meeting-payment-content">{Data.price}/半小時</p>
            </div>
          </div>
        </div>

        <p className="std_meeting-payment-bottom-line "></p>

        <div className="std_meeting-payment-bottom-container">
          <p className="std_meeting-payment-bottom-content">總金額<span className="std_meeting-payment-bottom-content-span">{Data.price}</span>元</p>
        </div>

        <div className="std_meeting-payment-bottom-form-container">
          <div className="std_meeting-payment-bottom-form-line">
            <p className="std_meeting-payment-bottom-form-title">匯款人姓名</p>
            <input className="std_meeting-payment-bottom-form-input" onBlur={handleUpload} type="text" data-form-label="paymentName"></input>
          </div>
          <div className="std_meeting-payment-bottom-form-line">
            <p className="std_meeting-payment-bottom-form-title">匯款日期</p>
            <input className="std_meeting-payment-bottom-form-input" onBlur={handleUpload} type="text" data-form-label="paymentDate"></input>
          </div>
          <div className="std_meeting-payment-bottom-form-line">
            <p className="std_meeting-payment-bottom-form-title">匯款收據上傳</p>
            <button className="std_meeting-payment-bottom-form-button">
              <Upload /> 
              <span>確認預約</span>
              <input onChange={handleUpload} data-form-label="file" type="file"></input>
            </button>
          </div>
        </div>

        <div className="std_meeting-payment-bottom-container">
          <button className="std_meeting-payment-buttom-button" onClick={handleSubmit}>確認預約</button>
        </div>
      </div>
    </div>
  );
};

export default MeetingPaymentCard;
