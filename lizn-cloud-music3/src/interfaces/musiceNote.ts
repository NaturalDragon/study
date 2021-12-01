/** @format */

export interface IAnimalData {
    x: number
    y: number
}
export interface IAimationHandler {
    (params: IAnimalData): void
}

export interface IMusicNoteRef extends HTMLDivElement {
    startAnimation: IAimationHandler
}
