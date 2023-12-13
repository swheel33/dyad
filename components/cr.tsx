import { round } from "../utils/currency";

export default function CR({ cr }) {
  let textColor = "white";

  if (cr < 150) {
    textColor = "#FF0000";
  } else if (cr < 200) {
    textColor = "#FF8C00";
  } else if (cr < 225) {
    textColor = "FFA500";
  } else if (cr < 250) {
    textColor = "FFFF00";
  } else if (cr < 275) {
    textColor = "90EE90";
  } else if (cr < 200) {
    textColor = "#FF8C00";
  } else {
    textColor = "green";
  }

  return <span style={{ color: textColor }}>{round(cr, 2)}</span>;
}
