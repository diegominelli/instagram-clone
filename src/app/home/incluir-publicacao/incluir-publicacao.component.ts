import { Progresso } from './../../progresso.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { Subject, interval, takeUntil } from 'rxjs';

import { Bd } from 'src/app/bd.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.scss'],
})
export class IncluirPublicacaoComponent implements OnInit {
  @Output() public atualizarTimeLine: EventEmitter<any> =
    new EventEmitter<any>();

  public email?: string;
  public imagem: any;

  public progressoPublicacao: string = 'pendente';
  public porcentagemUpload?: number;

  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null),
  });

  constructor(private bd: Bd, private progresso: Progresso) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user?.email!;
    });
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0],
    });

    let acompanhamentoUpload = interval(1500);

    let continua = new Subject();
    continua.next(true);

    acompanhamentoUpload.pipe(takeUntil(continua)).subscribe(() => {
      // console.log(this.progresso.status);
      // console.log(this.progresso.estado);

      this.progressoPublicacao = 'andamento';
      this.porcentagemUpload = Math.round(
        (this.progresso.estado.bytesTransferred /
          this.progresso.estado.totalBytes) *
          100
      );

      if (this.progresso.status === 'concluido') {
        this.progressoPublicacao = 'concluido';
        this.atualizarTimeLine.emit();
        continua.next(false);
      }
    });
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }
}
