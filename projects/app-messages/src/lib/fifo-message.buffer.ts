import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, Subscription } from 'rxjs';


export type MsgType = 'info' | 'warning' | 'alert';

export interface MsgData {
  /**
   * Duração máxima da exibição da mensagem, 
   * se chegar outra mensagem não será aguardado este tempo
   */
  duration?: any;
  /**
   * Uma classe de formatação, sobrepõe a classe padrão para o tipo escolhido.
   */
  class?: string;
  /**
   * tipo de mensagem
   *
   * - Alert
   * - Info
   */
  type?: MsgType;
  /**
   * Texto a ser exibido na mensagem
   */
  message: string;
}

export type Message = string | MsgData | Error;

/**
 * O Serviço interno evida referencia ciclica entre o componente
 * e o serviço externo.
 */
@Injectable()
export class FIFOMessagesBuffer {

  /**
   * FIFO de mensagens do tipo Info
   */
  private messageSubject: Subject<Message> = new BehaviorSubject<Message>('');
  private $messageObservable: Observable<Message> = this.messageSubject.asObservable();

  constructor() { }

  protected get $message(): Observable<Message> {
    return this.$messageObservable;
  }

  public subscribeMsgInfo(observerFn: (msg: Message) => void): Subscription {
    return this.$message.subscribe(observerFn);
  }

  public addMessage(msg: Message) {
    this.messageSubject.next(msg);
  }

}
