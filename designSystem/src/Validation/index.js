import moment from "moment";
import { Green, Orange, Red } from "../Colors";
import translator from "../lang/translator";
const lang = translator("fr");
export const isEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
export const hasUperCase = (str) => {
  return /[A-Z]/.test(str);
};
export const hasLowerCase = (str) => {
  return /[a-z]/.test(str);
};
export const hasSpecialCaracter = (str) => {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str);
};
export const notHasSpecialCaracter = (str) => {
  return !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str);
};
export const hasNumber = (str) => {
  return /[0-9]/.test(str);
};
export const isEmpty = (str = "") => {
  return str.toString().trim().length === 0;
};
export const isNotEmpty = (str = "") => {
  return str.toString().trim().length !== 0;
};
export const isNumber = (str) => {
  return /^\d*$/.test(str);
};
export const isLength8 = (str) => {
  return str.length >= 8;
};
export const isDate = (str) => {
  return /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(
    str
  );
};
export const isUrl = (uri) => {
  const expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regex = new RegExp(expression);
  return uri.match(regex);
};

export const youtubeLinkEmbed = (url) => {
  return url.replace("/watch?v=", "/embed/");
};
export const isYoutubeLink = (url) => {
  return /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]{10}).\b/.test(
    url
  );
};
export const isVimeoLink = (url) => {
  return /^(http\:\/\/|https\:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)$/.test(url);
}
export const vimeoLinkEmbed = (url) => {
  const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
  const parsed = url.match(vimeoRegex);
  return "https://player.vimeo.com/video/" + parsed[1];
};

export const caracterNotAutorized = (str) => {
  return !str.includes('"');
}
export const antiSlashNotAutorized = (str) => {
  return !str.includes('\\');
}
const listValidation = {
  isEmpty: isEmpty,
  isNotEmpty: isNotEmpty,
  isEmail: isEmail,
  isNumber: isNumber,
  hasUperCase: hasUperCase,
  hasNumber: hasNumber,
  hasLowerCase: hasLowerCase,
  hasSpecialCaracter: hasSpecialCaracter,
  notHasSpecialCaracter: notHasSpecialCaracter,
  isLength8: isLength8,
  caracterNotAutorized: caracterNotAutorized,
  antiSlashNotAutorized: antiSlashNotAutorized
}
export const formValidation = (list, state) => {
  let res = {};
  let verif = true;
  for (let index = 0; index < list.length; index++) {
    for (let i = 0; i < list[index].validation.length; i++) {
      if (
        !listValidation[list[index].validation[i].type](
          state[list[index].value].value
        )
      ) {
        res[list[index].value] = {
          value: state[list[index].value].value,
          isValid: false,
          isInValid: true,
          errorMessage:
            list[index].validation[i].error && list[index].validation[i].error,
        };
        verif = false;
        break;
      } else {
        res[list[index].value] = {
          value: state[list[index].value].value,
          isValid: true,
          isInValid: false,
          errorMessage: null,
        };
      }
    }
  }
  return { res, verif };
};
export const getDate = (date, lang) => {
  let format = "DD/MM/YYYY";
  switch (lang.toLowerCase()) {
    case "fr":
      format = "DD/MM/YYYY";
      break;
    default:
      break;
  }
  return moment(date).format(format);
};
export const shrinkString = (originStr, maxChars, trailingCharCount) => {
  let shrinkedStr = originStr;
  const shrinkedLength = maxChars - trailingCharCount - 3;
  if (originStr.length > maxChars) {
    const front = originStr.substr(0, shrinkedLength);
    const mid = "...";
    const end = originStr.substr(-trailingCharCount);
    shrinkedStr = front + mid + end;
  }

  return shrinkedStr;
};
export const verifPasswordStrength = (password) => {
  let strength = {
    color: "",
    percent: "",
    label: "",
  };
  if (password.length) {
    if (password.length < 3) {
      strength = {
        color: Red,
        percent: 10,
        label: lang.veryWeek,
      };
    }
    if (password.length > 2) {
      strength = {
        color: Red,
        percent: 25,
        label: lang.week,
      };
    }
    if (
      password.length > 4 &&
      hasLowerCase(password) &&
      hasUperCase(password)
    ) {
      strength = {
        color: Red,
        percent: 40,
        label: lang.normal,
      };
    }
    if (
      password.length < 8 &&
      password.length > 5 &&
      hasLowerCase(password) &&
      hasUperCase(password) &&
      hasSpecialCaracter(password)
    ) {
      strength = {
        color: Orange,
        percent: 55,
        label: lang.medium,
      };
    }
    if (
      password.length > 7 &&
      password.length < 11 &&
      hasLowerCase(password) &&
      hasUperCase(password) &&
      hasSpecialCaracter(password)
    ) {
      strength = {
        color: Orange,
        percent: 80,
        label: lang.strong,
      };
    }
    if (
      password.length > 10 &&
      hasLowerCase(password) &&
      hasUperCase(password) &&
      hasSpecialCaracter(password)
    ) {
      strength = {
        color: Green,
        percent: 100,
        label: lang.veryStrong,
      };
    }
  }
  return strength;
};
