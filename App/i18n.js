'use-strict'


let LocalizedStrings  = require ('react-native-localization');

var i18n = new LocalizedStrings({
  en:{
    home:"Home",
    map:"Map",
    setting:"Setting",
    camera:"Camera",
    approvalList:"Approval List",
    task:"Task",
    taskList:"Task List",
    taskDetail:"Task Detail",
    taskEdit:"Edit Task",
    login:"Login",
    logout:"Logout",
  },
  id: {
    home:"Beranda",
    map:"Peta",
    setting:"Pengaturan",
    camera:"Kamera",
    approvalList:"Daftar Persetujuan",
    task:"Tugas",
    taskList:"Daftar Tugas",
    taskDetail:"Rincian Tugas",
    taskEdit:"Ubah Tugas",
    login:"Masuk",
    logout:"Keluar",
  }
});

module.exports = i18n;
