export function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  container.appendChild(toast);

  // 3秒後自動移除 DOM 元素
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
