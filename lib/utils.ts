// * change to "token=value" => {token : value}
export const cookieStringToObject = (cookieString: string | undefined) => {
  const cookies: { [key: string]: string } = {};
  if (cookieString) {
    // * "token=value"
    const itemString = cookieString?.split(/\s*;\s*/);
    itemString.forEach((pairs) => {
      // * ["token", "value"]
      const pair = pairs.split(/\s*=\s*/);
      cookies[pair[0]] = pair.splice(1).join("=");
    });
  }

  return cookies;
};

// * string에서 number만 return하는 함수
export const getNumber = (string: string) => {
  const numbers = string.match(/\d/g)?.join("");
  if (numbers) {
    return Number(numbers);
  }
  return null;
};

// * 금액 변경시
export const makeMoneyString = (input: string) => {
  const amountString = input.replace(/[^0-9]/g, "");
  if (amountString) {
    return parseInt(amountString, 10).toLocaleString();
  }
  return "";
};

// * query string 만들기
export const makeQueryString = (
  baseUrl: string,
  queriesObject: Object & { [key: string]: string | string[] | undefined }
) => {
  const keys = Object.keys(queriesObject);
  const values = Object.values(queriesObject);
  if (keys.length === 0) {
    return baseUrl;
  }
  let queryString = `${baseUrl}?`;
  keys.forEach((key, index) => {
    if (queriesObject[key]) {
      queryString += `${keys[index]}=${values[index]}&`;
    }
  });
  // * queryString의 마지막 & 제거
  return queryString.slice(0, -1);
};
