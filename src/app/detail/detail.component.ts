import { Component, OnInit } from '@angular/core';
import {DxfViewer} from "dxf-viewer";
import * as three from "three";
//import DxfViewerWorker from "worker-loader!./DxfViewerWorker";
import DxfParser from "dxf-parser";

const fs = window.require('fs');
const {shell} = window.require('electron');

const parser = new DxfParser();
const dxfFile = shell.openPath('X:\\On Hold\\Walk in - Carlock Farms\\sign_deer.dxf');

const tryParser = () => {
  try {
    const dxf = parser.parseSync(dxfFile);
    console.log(dxf);
  } catch(err: any) {
    return console.error(err.stack); 
  }
}

tryParser();

//DxfViewer.SetupWorker()


// Open a local file in the default app

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor() { }

  dxfInput = (inputFile: any) => {
    console.log(inputFile.target.files);
    const outputElement: HTMLElement = document.getElementById('output') as HTMLElement;
      //document.getElementById("file-field").onchange = function() {
        const reader = new FileReader();
        reader.readAsText(inputFile.target.files[0]);
        reader.onload = function(e: any) {
          const fileText = e.target.result;
          const parser = new DxfParser();
          let dxf = null;
          try {
            dxf = parser.parseSync(fileText);
          } catch(err: any) {
            return console.error(err.stack);
          }
          console.log('Success!');
          outputElement.innerHTML = JSON.stringify(dxf, null, 4);
        };
      //};
  }

  ngOnInit(): void {
    console.log('DetailComponent INIT');
    console.log(fs);
   }

}
