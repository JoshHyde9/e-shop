/**
 * @param {string} param
 */
export const fixURLParam = (param) => {
  let fixedURLParam;

  fixedURLParam = param.toLowerCase();

  if (fixedURLParam.includes(".")) {
    fixedURLParam = fixedURLParam.replace(".", "");
  }

  if (/\s/g.test(fixedURLParam)) {
    fixedURLParam = fixedURLParam.replace(/\s/g, "-");
  }

  return fixedURLParam;
};

/**
 * @param {string} param
 */
export const undoFixURLParam = (param) => {
  let undoParam = param;

  if (/[-]/g.test(undoParam)) {
    undoParam = undoParam.replace(/[-]/g, " ");
  }

  let undoParamArray = undoParam.split(" ");

  undoParamArray = undoParamArray.map((text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });

  undoParam = undoParamArray.join(" ");

  if (undoParam.includes("Transition")) {
    undoParam = undoParam + ".";
  }

  return undoParam;
};
