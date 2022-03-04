import Photo from "../img/upload-photo.svg";
import Avatar from "../img/tmp_avatar.png";
import Star from "../img/star.svg";
import Pen from "../img/edit-pen.svg";
import Eye from "../img/eye-no-lash.svg";
import Check from "../img/black-check.svg";
import X from "../img/white-x.svg";
import Calendar from "../img/calendar.svg";
import { updateProfileData, updateStudentID } from "../../../axios";
import { useContext } from "react";
import { ParamContext } from "../../../ContextReducer";

import "./introTop.css";

const IntroTop = ({ profile, page, changePage, setHidden }) => {
  const { surname, name, count, star } = profile;
  const context = useContext(ParamContext)
  const handleClickEdit = () => {
    changePage("intro-edit");
  };
  const handleClickCancel = () => {
    changePage("intro-main");
  };
  const handleClickConfirm = () => {
    changePage("intro-main");
  };
  const handleClickQuit = () => {
    changePage("intro-main");
  };
  const handleClickEye = () => {
    changePage("intro-view");
  };
  const topButton = {
    main: [
      {
        text: "學生角度檢視",
        src: Eye,
        key: "eye",
        onClick: () => handleClickEye(),
      },
      {
        text: "編輯個人檔案",
        src: Pen,
        key: "pen",
        onClick: () => handleClickEdit(),
      },
    ],
    edit: [
      {
        text: "取消",
        src: X,
        key: "cancel",
        onClick: () => handleClickCancel(),
      },
      /*
      {
        text: "確認",
        src: Check,
        key: "confirm",
        onClick: () => handleClickConfirm(),
      },
      */
    ],
    view: [
      {
        text: "退出檢視",
        src: Eye,
        key: "quit",
        onClick: () => handleClickQuit(),
      },
    ],
  };
  const showButton = (buttons) => {
    return (
      <div class="introTop">
        {buttons.map((e) => (
          <button class={"introTop-".concat(e.key)} onClick={e.onClick}>
            <img src={e.src} alt={e.key} />
            {e.text}
          </button>
        ))}
      </div>
    );
  };
  const showButtonByPage = (page) => {
    console.log(page);
    if (page === "intro-main") return showButton(topButton.main);
    else if (page === "intro-edit") return showButton(topButton.edit);
    else if (page === "intro-view") return showButton(topButton.view);
    else return;
  };
  return (
    <>
      <div class="introTop">
        <div class="introTop">
          <img class="introTop-avatar" src={context.Info.profile.photo} alt="my avatar" />
          <img class="introTop-photo" src={Photo} alt="camera" onClick={()=>setHidden(false)} />
        </div>
        <div class="introTop">
          <span class="introTop-name">{surname}{name}</span>
          <div>
            <span class="introTop-already">已諮詢</span>
            <span class="introTop-times">{count}次</span>
          </div>
          {page !== "account" && (
            <div hidden={(star<=3 || star===undefined)? true:false}>
              <span>
                <img class="introTop-star" src={Star} alt="star" />
              </span>
              <span class="introTop-point">{star}</span>
            </div>
          )}
        </div>

        {showButtonByPage(page)}
      </div>
    </>
  );
};

export default IntroTop;
