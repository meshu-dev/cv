import type { ToastType } from "@/enums"

let toastTimeout: number;

export const showToast = (type: ToastType, message: string) => {
  const toast: HTMLElement | null = document.getElementById("toast")

  if (toast) {
    clearTimeout(toastTimeout)

    toast.textContent = message

    toast.classList.remove('success', 'error')
    toast.classList.add('show', type)

    toastTimeout = setTimeout(
      () => {
        toast.classList.remove('show')
      },
      3000
    )
  }
}

export const closeDialog = (id: string) => {
  const dialog: HTMLDialogElement | null = document.querySelector(id)
  dialog?.close()
}
