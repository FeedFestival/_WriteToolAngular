import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UndoService {

    // undoManager: UndoManager = new UndoManager();
    states: any[] = [];
    undoStateChange: EventEmitter<any> = new EventEmitter<any>();

    dataCurrentArray: Array<any> = [];
    dataUndoArray: Array<any> = [];
    dataRedoArray: Array<any> = [];

    undoLimit: number = 5;

    canUndo: boolean = false;
    canRedo: boolean = false;

    constructor(
    ) {

    }

    emitUndoStateEvent(guid) {
        const oldState = this.states.find(s => s.guid === guid);
        // console.log("TCL: UndoService -> emitUndoStateEvent -> oldState", oldState);
        this.undoStateChange.emit(oldState);
    }

    getUndoStateEmitter(): EventEmitter<any> {
        return this.undoStateChange;
    }

    addState(state) {
        // console.log("TCL: UndoService -> addState -> stateCopy", stateCopy)
        this.states.push(state);
    }

    setState(guid): void {

        this.dataRedoArray = [];
        this.canRedo = false;
        if (this.dataCurrentArray.length === 0) {
            this.dataCurrentArray.push(guid);
        } else {
            if (this.dataUndoArray.length == this.undoLimit) {
                this.dataUndoArray.reverse().pop();
                this.dataUndoArray.reverse();
            }
            this.dataUndoArray.push(this.dataCurrentArray.pop());
            this.dataCurrentArray.push(guid);
            this.canUndo = true;
        }

        // console.log('------------------------------------------------------------------');
        // console.log("TCL: UndoService -> this.dataUndoArray", JSON.parse(JSON.stringify(this.dataUndoArray)))
        // console.warn("TCL: UndoService -> this.dataCurrentArray", JSON.parse(JSON.stringify(this.dataCurrentArray)))
    }

    clearAll(): any {
        this.dataCurrentArray = [];
        this.dataUndoArray = [];
        this.dataRedoArray = [];
        this.canUndo = false;
        this.canRedo = false;
    }

    undo(): any {

        this.canRedo = true;
        if (this.dataUndoArray.length != 0) {
            this.dataRedoArray.push(this.dataCurrentArray.pop());
            this.dataCurrentArray.push(this.dataUndoArray.pop());
            if (this.dataUndoArray.length == 0) {
                this.canUndo = false;
            }
        }

        // console.log('------------------------------------------------------------------');
        // console.log("TCL: UndoService -> this.dataUndoArray", JSON.parse(JSON.stringify(this.dataUndoArray)))
        // console.warn("TCL: UndoService -> this.dataCurrentArray", JSON.parse(JSON.stringify(this.dataCurrentArray)))
        // // console.log("TCL: UndoService -> this.dataRedoArray", this.dataRedoArray)

        this.emitUndoStateEvent(this.dataCurrentArray[0]);
    }

    redo(): any {

        if (this.dataRedoArray.length != 0) {
            this.dataUndoArray.push(this.dataCurrentArray.pop());
            this.dataCurrentArray.push(this.dataRedoArray.pop());
            if (this.dataRedoArray.length == 0) {
                this.canRedo = false;
            }
        }

        if (this.dataUndoArray.length > 0) {
            this.canUndo = true;
        } else {
            this.canUndo = false;
        }

        this.emitUndoStateEvent(this.dataCurrentArray[0]);
    }
}
