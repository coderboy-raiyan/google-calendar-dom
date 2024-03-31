import { addMonths } from "date-fns";
import renderMonth from "./renderMonths";
import "./style.css";

let selectedMonth: number | Date = Date.now();

const prevMonthBtn = document.querySelector("[data-prev-month-btn]");
const nextMonthBtn = document.querySelector("[data-next-month-btn]");
const todayBtn = document.querySelector("[data-today-btn]");

prevMonthBtn?.addEventListener("click", () => {
  selectedMonth = addMonths(selectedMonth, -1);
  renderMonth(selectedMonth);
});
nextMonthBtn?.addEventListener("click", () => {
  selectedMonth = addMonths(selectedMonth, 1);
  renderMonth(selectedMonth);
});
todayBtn?.addEventListener("click", () => {
  selectedMonth = new Date();
  renderMonth(selectedMonth);
});

renderMonth(new Date());
