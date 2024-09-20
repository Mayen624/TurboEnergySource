// Cargar 'simple-notify' dinámicamente solo en el cliente
async function loadNotify() {
    if (typeof window !== 'undefined') {
      const { default: Notify } = await import('simple-notify');
      return Notify;
    }
    return null;
  }
  
  export async function infoToast(title: string, text: string, time: number = 4000, showIcon: boolean = true, autoclose: boolean = true, showCloseButton: boolean = true) {
    const Notify = await loadNotify();
    if (Notify) {
      new Notify({
        status: 'info',
        title: title,
        text: text,
        effect: 'fade',
        speed: 300,
        customClass: '',
        customIcon: '',
        showIcon: showIcon,
        showCloseButton: showCloseButton,
        autoclose: autoclose,
        autotimeout: time,
        type: 'outline',
        position: 'right top',
        customWrapper: '',
      });
    }
  }
  
  export async function successToast(title: string, text: string, time: number = 4000, showIcon: boolean = true, autoclose: boolean = true, showCloseButton: boolean = true) {
    const Notify = await loadNotify();
    if (Notify) {
      new Notify({
        status: 'success',
        title: title,
        text: text,
        effect: 'fade',
        speed: 300,
        customClass: '',
        customIcon: '',
        showIcon: showIcon,
        showCloseButton: showCloseButton,
        autoclose: autoclose,
        autotimeout: time,
        type: 'outline',
        position: 'right top',
        customWrapper: '',
      });
    }
  }
  
  export async function warningToast(title: string, text: string, time: number = 4000, showIcon: boolean = true, autoclose: boolean = true, showCloseButton: boolean = true) {
    const Notify = await loadNotify();
    if (Notify) {
      new Notify({
        status: 'warning',
        title: title,
        text: text,
        effect: 'fade',
        speed: 300,
        customClass: '',
        customIcon: '',
        showIcon: showIcon,
        showCloseButton: showCloseButton,
        autoclose: autoclose,
        autotimeout: time,
        type: 'outline',
        position: 'right top',
        customWrapper: '',
      });
    }
  }
  
  export async function errorToast(title: string, text: string, time: number = 4000, showIcon: boolean = true, autoclose: boolean = true, showCloseButton: boolean = true) {
    const Notify = await loadNotify();
    if (Notify) {
      new Notify({
        status: 'error',
        title: title,
        text: text,
        effect: 'fade',
        speed: 300,
        customClass: '',
        customIcon: '',
        showIcon: showIcon,
        showCloseButton: showCloseButton,
        autoclose: autoclose,
        autotimeout: time,
        type: 'outline',
        position: 'right top',
        customWrapper: '',
      });
    }
  }
  