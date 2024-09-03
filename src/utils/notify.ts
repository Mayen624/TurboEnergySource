import Notify from 'simple-notify';

function infoToast(title: string, text: string, time: number = 4000, showIcon: boolean = true, autoclose: boolean = true, showCloseButton: boolean = true) {
    new Notify ({
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
};

function successToast(title: string, text: string, time: number = 4000, showIcon: boolean = true, autoclose: boolean = true, showCloseButton: boolean = true) {
    new Notify ({
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
};

function warningToast(title: string, text: string, time: number = 4000, showIcon: boolean = true, autoclose: boolean = true, showCloseButton: boolean = true) {
    new Notify ({
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
};

function errorToast(title: string, text: string, time: number = 4000, showIcon: boolean = true, autoclose: boolean = true, showCloseButton: boolean = true) {
    new Notify ({
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
};


export {infoToast, successToast, warningToast, errorToast}