import { format } from "date-fns";
import { nanoid } from "nanoid";
import { IEventType } from "./interfaces/EventTypes/eventTypes";

const modal = document.querySelector("[data-modal]") as HTMLDivElement;

const modalModalBody = document.querySelector(
  "[data-modal-body]"
) as HTMLDivElement;

const modalModalOverlay = document.querySelector(
  "[data-modal-overlay]"
) as HTMLDivElement;

const eventModalTemplate = document.querySelector(
  "#event-form-template"
) as HTMLTemplateElement;

export function openAddModalEvent(date: Date | number) {
  openModal(
    getEventFormModalBody({ date }, (event) => {
      console.log(event);
    })
  );
}
export function openEditModalEvent(event: IEventType) {
  openModal(getEventFormModalBody(event));
}

function getEventFormModalBody(
  event: IEventType,
  saveCallBack?: (event: IEventType) => void,
  deleteCallBack?: (event: IEventType) => void
) {
  const formModalBody = eventModalTemplate.content.cloneNode(
    true
  ) as HTMLDivElement;

  const isNewEvent = event.id == null;

  formModalBody.querySelector("[data-title]")!.textContent = isNewEvent
    ? "Add event"
    : "Edit event";
  formModalBody.querySelector("[data-date]")!.textContent = format(
    event.date,
    "d/M/yyyy"
  );

  const form = formModalBody.querySelector("[data-form]") as HTMLFormElement;

  form.querySelector("[data-save-btn]")!.textContent = isNewEvent
    ? "Add"
    : "Update";

  const deleteBtn = form.querySelector("[data-delete-btn]");

  if (isNewEvent) {
    deleteBtn?.remove();
  } else {
    deleteBtn?.addEventListener("click", () => {
      deleteCallBack && deleteCallBack(event);
      closeModal();
    });
  }

  const nameInput = form.querySelector("[data-name]") as HTMLInputElement;
  nameInput.value = event.name || "";

  const startTimeInput = form.querySelector(
    "[data-start-time]"
  ) as HTMLInputElement;
  const endTimeInput = form.querySelector(
    "[data-end-time]"
  ) as HTMLInputElement;

  startTimeInput.value = event.startTime as string;
  endTimeInput.value = event.endTime as string;

  const allDayCheckBoxInput = form.querySelector(
    "[data-all-day]"
  ) as HTMLInputElement;

  allDayCheckBoxInput.checked = event.isAllDay || false;

  startTimeInput.disabled = allDayCheckBoxInput.checked;
  endTimeInput.disabled = allDayCheckBoxInput.checked;

  allDayCheckBoxInput.addEventListener("change", () => {
    startTimeInput.disabled = allDayCheckBoxInput.checked;
    endTimeInput.disabled = allDayCheckBoxInput.checked;
  });

  startTimeInput.addEventListener("change", () => {
    endTimeInput.min = startTimeInput.value;
  });

  const colorRadioInput = form.querySelector(
    `[data-color][value="${event.color}"]`
  ) as HTMLInputElement;

  if (colorRadioInput) colorRadioInput.checked = true;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isAllDay = allDayCheckBoxInput.checked;
    const colorRadioInput = form.querySelector(
      `[data-color]:checked`
    ) as HTMLInputElement;

    saveCallBack &&
      saveCallBack({
        id: event.id || nanoid(),
        name: nameInput.value,
        date: event.date,
        isAllDay,
        startTime: isAllDay ? undefined : startTimeInput.value,
        endTime: isAllDay ? undefined : endTimeInput.value,
        color: colorRadioInput.value,
      });

    closeModal();
  });

  return formModalBody;
}

function openModal(bodyContents: any) {
  modalModalBody.innerText = "";
  modalModalBody.append(bodyContents);
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

modalModalOverlay.addEventListener("click", () => {
  closeModal();
});
