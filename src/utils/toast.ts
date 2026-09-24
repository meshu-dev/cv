let toastTimeout: number;

export const showToast = (message: string) => {
  const toast: HTMLElement | null = document.getElementById("toast")

  if (toast) {
    clearTimeout(toastTimeout)

    toast.textContent = message
    toast.classList.add("show")

    toastTimeout = setTimeout(
      () => {
        toast.classList.remove("show")
      },
      3000
    )
  }
}
