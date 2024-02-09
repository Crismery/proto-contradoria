import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, Input, OnInit, Type, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpProviderService } from '../_services/http-provider.service';
import { AddComponent } from './add.component';
import { TestService } from '../_services/test.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from 'file-saver';
import * as docx from "docx";
import * as fs from 'fs';
import * as path from 'path';
import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-asigning',
  templateUrl: './asigning.component.html',
  styleUrl: './asigning.component.css'
})
export class AsigningComponent implements OnInit {

  date = new Date();
  pipe = new DatePipe('en-US');

  buildp = () => {
    let paragraphsB = [];
    for (var i = 0; i < this.selectedD.length; i++) {
      paragraphsB.push(new docx.Paragraph({ children: [new docx.TextRun({ text: `Asignaciones: Dispositivo: ${this.selectedD[i].Dispositivo},Serial: ${this.selectedD[i].Serial},Placa: ${this.selectedD[i].Placa}, Bienes Nacionales: ${this.selectedD[i].BN}` })] }))
    }
    return paragraphsB;
  }
  buildt = () => {
    let rowb = [];
    for (var i = 0; i < this.selectedD.length; i++) {
      rowb.push(new docx.TableRow({
        children: [new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: `${this.selectedD[i].Dispositivo}`, size: 24 })], alignment: 'center' })], verticalAlign: docx.VerticalAlign.CENTER }),
        new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: `${this.selectedD[i].Serial}`, size: 24 })], alignment: 'center' })], verticalAlign: docx.VerticalAlign.CENTER }),
        new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: `${this.selectedD[i].Placa}`, size: 24 })], alignment: 'center' })], verticalAlign: docx.VerticalAlign.CENTER }),
        new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: `${this.selectedD[i].BN}`, size: 24 })], alignment: 'center' })], verticalAlign: docx.VerticalAlign.CENTER }),]
      }))
    }
    return rowb;
  }

  buildb = () => {

  }

  selectedD: any[] = [];

  displayedColumns: string[] = [
    'Check',
    'Dispositivo',
    'Modelo',
    'Serial',
    'Placa',
    'BN',
    'Departamento',
    'Accion',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private testsService: HttpProviderService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getList();
    let data3 = this.data;
    console.log(data3.ID_Usuario);
    console.log(this.data);

  }

  word() {
    const imageBase64Data = `
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`;


    let dateString = this.pipe.transform(this.date, 'dd');
    let dateMonthY = this.pipe.transform(this.date, 'MM, YYYY')
    let i = 0;
    let data4 = this.data;
    let data5 = this.selectedD;
    let len = this.selectedD.length;
    let wordC = new docx.Document({
      numbering: {
        config: [
          {
            reference: "my-unique-bullet-points",
            levels: [
              {
                level: 0,
                format: docx.LevelFormat.BULLET,
                text: "\u1F60",
                alignment: docx.AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: { left: docx.convertInchesToTwip(0.5), hanging: docx.convertInchesToTwip(0.25) },
                  },
                },
              },
              {
                level: 1,
                format: docx.LevelFormat.BULLET,
                text: "\u2022",
                alignment: docx.AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: { left: docx.convertInchesToTwip(1), hanging: docx.convertInchesToTwip(0.25) },
                  },
                },
              },
              {
                level: 2,
                format: docx.LevelFormat.BULLET,
                text: "\u273F",
                alignment: docx.AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: { left: 2160, hanging: docx.convertInchesToTwip(0.25) },
                  },
                },
              },
              {
                level: 3,
                format: docx.LevelFormat.BULLET,
                text: "\u267A",
                alignment: docx.AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: { left: 2880, hanging: docx.convertInchesToTwip(0.25) },
                  },
                },
              },
              {
                level: 4,
                format: docx.LevelFormat.BULLET,
                text: "\u2603",
                alignment: docx.AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: { left: 3600, hanging: docx.convertInchesToTwip(0.25) },
                  },
                },
              },
            ],
          },
        ],
      },
      styles: {
        paragraphStyles: [
          {
            id: "Heading1",
            name: "Heading 1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 18,
              bold: true,
              italics: true,
              color: "#000000",
            },
            paragraph: {
              spacing: {
                after: 120,
              },
            },
          },
          {
            id: "Heading2",
            name: "Heading 2",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 26,
              bold: true,
              underline: {
                type: docx.UnderlineType.DOUBLE,
                color: "FF0000",
              },
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 120,
              },
            },
          },
          {
            id: "aside",
            name: "Aside",
            basedOn: "Normal",
            next: "Normal",
            run: {
              color: "999999",
              italics: true,
            },
            paragraph: {
              indent: {
                left: 720,
              },
              spacing: {
                line: 276,
              },
            },
          },
          {
            id: "wellSpaced",
            name: "Well Spaced",
            basedOn: "Normal",
            quickFormat: true,
            paragraph: {
              spacing: { line: 276, before: 20 * 72 * 0.1, after: 20 * 72 * 0.05 },
            },
          },
          {
            id: "ListParagraph",
            name: "List Paragraph",
            basedOn: "Normal",
            quickFormat: true,
          },
        ],
      },
      sections: [
        {
          properties: {},
          children: [
            new docx.Paragraph({

              children: [
                new docx.ImageRun({
                  data: Uint8Array.from(atob(imageBase64Data), (c) =>
                    c.charCodeAt(0)
                  ),
                  transformation: {
                    width: 100,
                    height: 100,
                  }

                }),
              ],
              alignment: 'center',
            }),
            new docx.Paragraph({
              spacing: {
                after: 500,
              },
              children: [
                new docx.TextRun({ text: `Contraloría General de la Republica` }),

              ],
              heading: docx.HeadingLevel.HEADING_1,
              alignment: 'center',
            }),
            new docx.Paragraph({
              alignment: docx.AlignmentType.JUSTIFIED,
              spacing: {
                after: 500,
              },
              children: [
                new docx.TextRun({ text: `\t Se le asignó el dispositivo ${data5[0].Dispositivo} modelo ${data5[0].Modelo} al usuario ${data4.Usuario} perteneciente al departamento ${data4.Departamento}, para su uso personal. Poniendo la responsabilidad del mismo en el susodicho. Esto fue efectuado por parte del equipo de tecnología, y se entrega el presente como documento que asegura la entrega y puesta en custodia del dispositivo en manos del usuario. A continuación, son dados los datos generales del equipo:`, size: 24 }),
              ],

            }),
            new docx.Table({

              width: {
                size: 9070,
                type: docx.WidthType.DXA
              },
              rows: [
                new docx.TableRow({
                  children: [
                    new docx.TableCell({
                      children: [new docx.Paragraph({ children: [new docx.TextRun({ text: `Dispositivo`, bold: true, size: 26 })], alignment: 'center' })],
                    }),
                    new docx.TableCell({
                      children: [new docx.Paragraph({ children: [new docx.TextRun({ text: `Serial`, bold: true, size: 26 })], alignment: 'center' })],
                    }),
                    new docx.TableCell({
                      children: [new docx.Paragraph({ children: [new docx.TextRun({ text: `Placa`, bold: true, size: 26 })], alignment: 'center' })],
                    }),
                    new docx.TableCell({
                      children: [new docx.Paragraph({ children: [new docx.TextRun({ text: `Bienes Nacionales`, bold: true, size: 26 })], alignment: 'center' })],
                    })
                  ]
                }),
                ...this.buildt(),
                // change for...this.buildb() if method created honestly...
              ]
            }),
            new docx.Paragraph({
              spacing: {
                before: 400,
                after: 150,
              },
              children: [new docx.TextRun({ text: "\t\t También se le asigno:", size: 24, bold: true })],


            }),
            new docx.Paragraph({
              numbering: {
                reference: 'my-unique-bullet-points',
                level: 1
              },
              children: [new docx.TextRun({ text: " Bulto.", size: 24 })],


            }),
            new docx.Paragraph({
              children: [new docx.TextRun({ text: " Fuente.", size: 24 })],
              numbering: {
                reference: 'my-unique-bullet-points',
                level: 1
              }
            }),
            new docx.Paragraph({
              children: [new docx.TextRun({ text: ` Procesador: ${data5[0].CPU}`, size: 24 })],
              numbering: {
                reference: 'my-unique-bullet-points',
                level: 1
              },
              spacing: {
                after: 300,
              }
            }),
            new docx.Paragraph({
              alignment: docx.AlignmentType.JUSTIFIED,
              spacing: {
                after: 150,
              },
              children: [new docx.TextRun({ text: `\t La entrega ha sido realizada a la fecha ${dateString}, del ${dateMonthY} por el departamento y se supone que con la firma al final del documento se da consentimiento en caso de que suceda cualquier situación con el dispositivo.`, size: 24 })],


            }),
          ],

        },
      ],
    });
    Packer.toBlob(wordC).then(blob => {
      console.log(blob);
      saveAs(blob, "Test");
      console.log("It's alive.")
    })
  };



  selectedDis(row: any, ob: MatCheckboxChange) {
    let i = this.selectedD.length;
    if (ob.checked) {
      this.selectedD.push(row);
    } else {
      var index = this.selectedD.indexOf(row);
      if (index !== -1)
        this.selectedD.splice(index, 1);
    }
    console.log(this.selectedD);

  }



  assignD() {
    let data2 = this.data;


    let i = 0;
    let confirm = window.confirm("Estas seguro que deseas asignar estos dispositivos")
    if (confirm) {
      while (i < this.selectedD.length) {
        this.testsService.updateUser(data2.ID_Usuario, this.selectedD[i].Serial, "").subscribe({
          next: (res) => {
            alert("Se ha asignado un usuario");
            this.testsService.updateBySerial(this.selectedD[i].Serial, "");
            this.getList();

          },
          error: (err) => {
            console.log(err);
          },
        });
        i++;
      }
    }



  }




  getList() {
    this.testsService.getAllWhereU().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteR(Serial: string) {
    let confirm = window.confirm("Estas seguro que deseas borrar este registro")
    if (confirm) {
      this.testsService.delete(Serial).subscribe({
        next: (res) => {
          alert("Se elimino el registro");
          this.getList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }


  openEdit(data: any) {
    const dialogRef = this.dialog.open(AddComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getList();
        }
      }
    });
  }



}
