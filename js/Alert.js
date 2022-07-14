export default class Alert {
  static show(message, type = "success") {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert", `alert_${type}`);
    alertDiv.textContent = message;
    const alertContainer = document.querySelector(".alert-container");
    alertContainer.append(alertDiv);
    setTimeout(() => {
      alertDiv.remove();
    }, 1000 * 3);
  }
}
