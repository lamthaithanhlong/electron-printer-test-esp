const {remote} = require('electron');
const PDFWindow = require('electron-pdf-window');
const {BrowserWindow, dialog, shell} = remote;
const fs = require('fs');

let print_win;

function getPDFPrintSettings() {
  var option = {
    landscape: false,
    marginsType: 0,
    printBackground: false,
    printSelectionOnly: false,
    pageSize: 'A4',
  };

  var layoutSetting = document.getElementById("layout-settings");
  option.landscape =
    layoutSetting.options[layoutSetting.selectedIndex].value == 'Landscape';
  var pageSizeSetting = document.getElementById("page-size-settings");
  option.pageSize =
    pageSizeSetting.options[pageSizeSetting.selectedIndex].text;
  var marginsSetting = document.getElementById("margin-settings");
  option.marginsType =
    parseInt(marginsSetting.options[marginsSetting.selectedIndex].value);

  option.printBackground = document.getElementById("print-background").checked;
  option.printSelectionOnly = document.getElementById(
    "print-selection").checked;
  return option;
}

function print() {
  if (print_win)
    print_win.webContents.print({
      silent : true
    });
}



document.addEventListener('DOMContentLoaded', function() {
  print_win = new BrowserWindow({'auto-hide-menu-bar':true});
  PDFWindow.addSupport(print_win)
  print_win.loadURL('file://' + __dirname + '/1.pdf');
  print_win.show();

  print_win.webContents.on('did-finish-load', function() {
    document.getElementById('print_button').addEventListener('click', print);
  
  });
  print_win.on('closed', function() {
    print_win = null;
  });
});
