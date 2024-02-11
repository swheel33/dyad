interface NoteNumberDataColumnModel {
  text: string;
  value: string;
  highlighted: boolean;
}

export interface NoteNumberDataModel {
  left: NoteNumberDataColumnModel[];
  right: NoteNumberDataColumnModel[];
}
